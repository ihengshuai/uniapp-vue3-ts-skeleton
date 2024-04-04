import { InterceptorType, WRONG_MESSAGE } from "@/constants/http";
import type { IHttpError, Interceptor } from "@/typings/common/http";

/** 错误处理拦截器 */
export class NecessaryErrorInterceptor implements Interceptor {
  static _ins: NecessaryErrorInterceptor;

  type: InterceptorType = InterceptorType.ERROR;

  async interceptor(err: IHttpError): Promise<any> {
    const config = err.config;
    if (!err.isBusinessError) {
      let message = "请求失败";
      if (err.message === WRONG_MESSAGE.FAIL) {
        message = "请求失败";
      } else if (err.message === WRONG_MESSAGE.TIMEOUT) {
        message = "请求超时";
      }
      if (config?.captureError !== false) {
        uni.showToast({
          title: message,
          icon: "none",
        });
      }
    }

    console.log(
      `%c 错误日志: %c${config?.label ? `【${config.label}】` : ""}`,
      "background:red;padding:2px 4px;color:#fff;font-weight:600",
      null,
      err.code,
      err.message,
      err
    );

    return Promise.reject(err);
  }

  static get instance() {
    if (!this._ins) {
      this._ins = new NecessaryErrorInterceptor();
    }
    return this._ins;
  }
}
