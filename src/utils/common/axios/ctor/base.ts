import { HTTP_DATA_TYPE } from "@/constants/http";
import type { IHttpRequestConfig } from "@/typings/common/http";
import type { IDict } from "@/typings/common/type";
import { type Method } from "axios";
import qs from "qs";

function formatRequestURL(url: string, urlPath: IDict<any>) {
  Object.keys(urlPath).forEach(k => {
    const v = urlPath[k];
    if (v !== undefined) {
      url = url.replace(new RegExp(`({${k}})`, "g"), v);
    }
  });
  return url;
}

export class HttpClient {
  private static _instance: HttpClient;
  protected _requestConfig!: IHttpRequestConfig;
  protected _userConfig?: IHttpRequestConfig;

  constructor() {
    this.initRequestConfig();
  }

  static get instance(): HttpClient {
    if (!this._instance) {
      this._instance = new HttpClient();
    }
    return this._instance;
  }

  static get createInstance() {
    return new HttpClient();
  }

  protected getRequestConfig(method: Method, request: IHttpRequestConfig): IHttpRequestConfig {
    const baseURL = this._userConfig?.baseURL || request.baseURL;
    request.data = request.data || {};
    const config: IHttpRequestConfig = { ...this._requestConfig, ...this._userConfig, ...request, method };

    config.url = request.urlPath ? formatRequestURL(request.url!, request.urlPath) : request.url;
    config.url = baseURL ? baseURL + config.url : config.url;
    config.headers = config.headers || {};

    if (request.headers?.["Content-Type"]) {
      if (method === "get") {
        config.params = Object.assign(request.data, request.params);
      } else {
        config.data = request.data;
      }
    } else {
      const serializeType = config.serializeType;
      if (serializeType === HTTP_DATA_TYPE.FORM) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        config.data = qs.stringify(request.data, { arrayFormat: "indices" });
      } else if (serializeType === HTTP_DATA_TYPE.FORMDATA) {
        config.headers["Content-Type"] = "multipart/form-data";
        const formData = new FormData();
        const requestData = Object.assign(request.data);
        for (const name in requestData) {
          if (requestData[name]) {
            formData.append(name, request.data[name]);
          }
        }
        const requestFiles = request.files;
        for (const name in requestFiles) {
          if (requestFiles[name]) {
            formData.append(name, requestFiles[name]);
          }
        }
        config.data = formData;
      } else {
        config.headers["Content-Type"] = "application/json";
        if (method === "get") {
          config.params = Object.assign(request.data, config.params);
          config.paramsSerializer = p => qs.stringify(p, { arrayFormat: "repeat" });
        } else {
          config.data = request.data;
        }
      }
    }
    config.$request = { ...config };
    return config;
  }

  setUserConfig(config: IHttpRequestConfig) {
    this._userConfig = config;
  }

  private initRequestConfig() {
    this._requestConfig = {
      retryCount: 0,
      retryInterval: 1000,
      // timeout: config.TIMEOUT || 1000 * 60,
      timeout: 1000 * 60,
      captureError: true,
      serializeType: HTTP_DATA_TYPE.JSON,
      withCredentials: true,
    };
  }
}