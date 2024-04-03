import type { IHttpRequestConfig, Interceptor } from "@/typings/common/http";
import type { Method } from "axios";
import { HttpClient } from "./base";
import { CancelToken } from "../cancel-token";
import { HTTP_METHOD, InterceptorType, WRONG_MESSAGE } from "@/constants/http";
import { BeautifyResInterceptor, LogResInterceptor, PruneResponse } from "../interceptor/response.interceptor";
import { runInterceptors } from "../interceptor/helper";
import { CommonReqInterceptor } from "../interceptor/request.interceptor";

export class HttpClientFrequently extends HttpClient {
  private static _interceptors: Interceptor[] = [];

  private static _requestInstance: Uni["request"];

  static get createInstance() {
    return new HttpClientFrequently();
  }

  static get requestInstance() {
    if (!this._requestInstance) {
      this._requestInstance = uni.request;
    }
    return this._requestInstance;
  }

  static setInterceptors(...interceptors: Interceptor[]) {
    HttpClientFrequently._interceptors.push(...interceptors);
  }

  private static get responseInterceptors() {
    return HttpClientFrequently._interceptors.filter(interceptor => interceptor.type === InterceptorType.RESPONSE);
  }

  private static get requestInterceptors() {
    return HttpClientFrequently._interceptors.filter(interceptor => interceptor.type === InterceptorType.REQUEST);
  }

  private static get errorInterceptors() {
    return HttpClientFrequently._interceptors.filter(interceptor => interceptor.type === InterceptorType.ERROR);
  }

  async get<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>(HTTP_METHOD.GET, { url, ...request });
  }

  async post<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>(HTTP_METHOD.POST, { url, ...request });
  }

  async delete<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>(HTTP_METHOD.DELETE, { url, ...request });
  }

  async put<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>(HTTP_METHOD.PUT, { url, ...request });
  }

  async head<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>(HTTP_METHOD.HEAD, { url, ...request });
  }
  async patch<T = any>(url: string, request?: IHttpRequestConfig): Promise<T> {
    return this.request<T>(HTTP_METHOD.PATCH, { url, ...request });
  }

  public async request<T>(method: Method, request: IHttpRequestConfig): Promise<T> {
    request = request || {};
    request.method = method;
    request = await runInterceptors<IHttpRequestConfig>(HttpClientFrequently.requestInterceptors, request);
    return this.send(this.getRequestConfig(method, request));
  }

  private async send<T>(requestConfig: IHttpRequestConfig): Promise<T> {
    if (requestConfig.ignoreCancelToken !== true) {
      CancelToken.instance.cancel(requestConfig);
    }
    return new Promise<any>((resolve, reject) => {
      const requestPayload = {
        ...(requestConfig as any),
        header: requestConfig.headers,
      } as Parameters<Uni["request"]>;

      const requestTask = HttpClientFrequently.requestInstance({
        url: requestConfig.url!,
        ...requestPayload,
        success(result) {
          const responseData = {
            config: requestConfig,
            data: result,
          };
          runInterceptors(HttpClientFrequently.responseInterceptors, responseData)
            .then(resolve)
            .catch(async err => {
              const error = await runInterceptors(HttpClientFrequently.errorInterceptors, err);
              reject(error);
            });
        },
        fail: err => {
          if (err && err.errMsg === WRONG_MESSAGE.ABORT) return;

          const request = requestConfig.$request!;
          if (request?.retryCount && request.retryCount > 0) {
            setTimeout(() => {
              request.retryCount && request.retryCount--;
              this.send(requestConfig).then(resolve).catch(reject);
            }, request.retryInterval);
          } else {
            reject(err);
          }
        },
      });
      requestConfig.signal = requestTask;
      CancelToken.instance.register(requestConfig);
    });
  }
}

HttpClientFrequently.setInterceptors(CommonReqInterceptor.instance);
HttpClientFrequently.setInterceptors(BeautifyResInterceptor.instance, LogResInterceptor.instance);
HttpClientFrequently.setInterceptors(PruneResponse.instance);
