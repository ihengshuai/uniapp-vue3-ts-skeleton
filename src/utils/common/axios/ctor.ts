import { HTTP_DATA_TYPE } from "@/constants/http";
import type { IHttpRequestConfig } from "@/typings/common/http";
import type { IDict } from "@/typings/common/type";
import Axios, { type AxiosInstance, type AxiosRequestConfig, type Method } from "axios";
import * as qs from "qs";

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
  private static _axiosInstance: AxiosInstance;
  protected _axiosOpts!: IHttpRequestConfig;
  protected _userConfig?: IHttpRequestConfig;

  constructor() {
    this.initAxiosOpts();
  }

  static get axiosInstance(): AxiosInstance {
    if (!this._axiosInstance) {
      this._axiosInstance = Axios.create();
    }
    return this._axiosInstance;
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

  setUserConfig(config: IHttpRequestConfig) {
    this._userConfig = config;
  }

  async get<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>("get", { url, ...request });
  }

  async post<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>("post", { url, ...request });
  }

  async delete<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>("delete", { url, ...request });
  }

  async put<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>("put", { url, ...request });
  }

  async head<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>("head", { url, ...request });
  }

  async patch<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>("patch", { url, ...request });
  }

  public async request<T>(method: Method, request: IHttpRequestConfig): Promise<T> {
    request = request || {};
    return this.send(this.getAxiosRequest(method, request));
  }

  private getAxiosRequest(method: Method, request: IHttpRequestConfig): AxiosRequestConfig {
    const baseURL = this._userConfig?.baseURL || request.baseURL;
    request.data = request.data || {};
    const config: IHttpRequestConfig = { ...this._axiosOpts, ...this._userConfig, ...request, method };

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

  private async send<T>(axiosRequest: IHttpRequestConfig): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      console.log(axiosRequest);
      // uni.request({
      //   ...(axiosRequest as any),
      //   success(result: any) {
      //     console.log(result);
      //   },
      // });
      HttpClient.axiosInstance(axiosRequest)
        .then(resolve)
        .catch(err => {
          const request = axiosRequest.$request!;
          if (request?.retryCount && request.retryCount > 0) {
            setTimeout(() => {
              request.retryCount && request.retryCount--;
              this.send(axiosRequest).then(resolve).catch(reject);
            }, request.retryInterval);
          } else {
            reject(err);
          }
        });
    });
  }

  private initAxiosOpts() {
    this._axiosOpts = {
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

// export class HttpClient {
//   private _axiosInstance: AxiosInstance;
//   protected _userConfig?: IHttpRequestConfig;
//   protected _requestConfig!: IHttpRequestConfig;

//   constructor(config?: IHttpRequestConfig) {
//     this._userConfig = config || {};
//     this.initRequestConfig();
//     this._axiosInstance = Axios.create();
//   }

//   static get createInstance() {
//     return new HttpClient();
//   }

//   async get<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
//     return this.request<T>("get", { url, ...request });
//   }

//   async post<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
//     return this.request<T>("post", { url, ...request });
//   }

//   async delete<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
//     return this.request<T>("delete", { url, ...request });
//   }

//   async put<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
//     return this.request<T>("put", { url, ...request });
//   }

//   async head<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
//     return this.request<T>("head", { url, ...request });
//   }

//   async patch<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
//     return this.request<T>("patch", { url, ...request });
//   }

//   public async request<T>(method: Method, request: IHttpRequestConfig): Promise<T> {
//     request = request || {};
//     return this.send(this.getAxiosRequest(method, request));
//   }

//   private getAxiosRequest(method: Method, request: IHttpRequestConfig): AxiosRequestConfig {
//     request.data = request.data || {};
//     const config: IHttpRequestConfig = { ...this._requestConfig, ...request, method };

//     config.url = request.urlPath ? formatRequestURL(request.url!, request.urlPath) : request.url;
//     config.headers = config.headers || {};

//     if (request.headers?.["Content-Type"]) {
//       if (method === "get") {
//         config.params = Object.assign(request.data, request.params);
//       } else {
//         config.data = request.data;
//       }
//     } else {
//       const serializeType = config.serializeType;

//       if (serializeType === HTTP_DATA_TYPE.FORM) {
//         config.headers["Content-Type"] = "application/x-www-form-urlencoded";
//         config.data = qs.stringify(request.data, { arrayFormat: "indices" });
//       } else if (serializeType === HTTP_DATA_TYPE.FORMDATA) {
//         config.headers["Content-Type"] = "multipart/form-data";
//         const formData = new FormData();
//         const requestData = Object.assign(request.data);
//         for (const name in requestData) {
//           if (requestData[name]) {
//             formData.append(name, request.data[name]);
//           }
//         }
//         const requestFiles = request.files;

//         for (const name in requestFiles) {
//           if (requestFiles[name]) {
//             formData.append(name, requestFiles[name]);
//           }
//         }

//         config.data = formData;
//       } else {
//         config.headers["Content-Type"] = "application/json";
//         if (method === "get") {
//           config.params = Object.assign(request.data, config.params);
//           config.paramsSerializer = p => qs.stringify(p, { arrayFormat: "repeat" });
//         } else {
//           config.data = request.data;
//         }
//       }
//     }

//     config.$request = { ...config };

//     return config;
//   }

//   private async send<T>(axiosRequest: IHttpRequestConfig): Promise<T> {
//     return new Promise<any>((resolve, reject) => {
//       this._axiosInstance(axiosRequest)
//         .then(resolve)
//         .catch(err => {
//           const request = axiosRequest.$request!;
//           if (request?.retryCount && request.retryCount > 0) {
//             setTimeout(() => {
//               request.retryCount && request.retryCount--;
//               this.send(axiosRequest).then(resolve).catch(reject);
//             }, request.retryInterval);
//           } else {
//             reject(err);
//           }
//         });
//     });
//   }

//   private initRequestConfig() {
//     this._requestConfig = {
//       retryCount: 0,
//       retryInterval: 1000,
//       // timeout: config.TIMEOUT || 1000 * 60,
//       timeout: 1000 * 60,
//       captureError: true,
//       serializeType: HTTP_DATA_TYPE.JSON,
//       withCredentials: true,
//       ...this._userConfig,
//     };
//   }
// }
