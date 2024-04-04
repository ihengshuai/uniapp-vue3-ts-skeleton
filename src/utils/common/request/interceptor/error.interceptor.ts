import { InterceptorType, WRONG_MESSAGE } from "@/constants/http";
import type { IHttpError, Interceptor } from "@/typings/common/http";

/** 错误处理拦截器 */
export class ErrorResInterceptor implements Interceptor {
  private static _ins?: ErrorResInterceptor;

  type: InterceptorType = InterceptorType.ERROR;

  async interceptor(err: IHttpError): Promise<any> {
    if (!err.isBusinessError) {
      const config = err.config;
      if (config?.captureError !== false) {
        uni.showToast({
          title: err.message === WRONG_MESSAGE.FAIL ? "请求失败" : err.message || "请求失败",
          icon: "none",
        });
      }
    }

    return Promise.reject(err);
  }

  static get instance() {
    if (!this._ins) {
      this._ins = new ErrorResInterceptor();
    }
    return this._ins;
  }
}
