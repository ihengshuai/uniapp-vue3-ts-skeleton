import { HTTP_METHOD, InterceptorType } from "@/constants/http";
import type { IHttpRequestConfig, Interceptor } from "@/typings/common/http";

export class CommonReqInterceptor implements Interceptor {
  private static _ins?: CommonReqInterceptor;
  type: InterceptorType = InterceptorType.REQUEST;

  async interceptor(config: IHttpRequestConfig): Promise<IHttpRequestConfig> {
    config.headers = config.headers || {};
    config.params = config.params || {};

    // TODO: 根据业务拦截请求参数
    config.headers["X-Locale"] = "zh";

    if (config.timeStamp && config.method === HTTP_METHOD.GET) {
      config.params._t = Date.now();
    }
    return config;
  }

  static get instance() {
    if (!this._ins) {
      this._ins = new CommonReqInterceptor();
    }
    return this._ins;
  }
}
