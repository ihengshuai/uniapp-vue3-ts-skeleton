import { InterceptorType } from "@/constants/http";
import type { Interceptor, IResponseData } from "@/typings/common/http";

export class BeautifyResInterceptor implements Interceptor {
  private static _ins?: BeautifyResInterceptor;
  type = InterceptorType.RESPONSE;

  async interceptor(res: IResponseData) {
    return new Promise((resolve, reject) => {
      const data = res.data;
      const config = res.config;

      debugger;

      if (data.statusCode >= 200) {
        if (config.captureError !== false) {
          uni.showToast({
            title: "全局提示错误...",
          });
        }
        const error = new Error("业务状态码出错");
        // TODO: 补充业务逻辑
        return reject(error);
      }
      resolve(res);
    });
  }

  static get instance() {
    if (!this._ins) {
      this._ins = new BeautifyResInterceptor();
    }
    return this._ins;
  }
}

/** 日志 */
export class LogResInterceptor implements Interceptor {
  private static _ins?: LogResInterceptor;
  type = InterceptorType.RESPONSE;

  async interceptor(res: any) {
    console.log("res", res);
    return res;
  }

  static get instance() {
    if (!this._ins) {
      this._ins = new LogResInterceptor();
    }
    return this._ins;
  }
}

/** 修剪最终的数据格式返回调用处 */
export class PruneResponse implements Interceptor {
  private static _ins?: LogResInterceptor;
  type = InterceptorType.RESPONSE;

  async interceptor(res: IResponseData): Promise<any> {
    return res.data;
  }

  static get instance() {
    if (!this._ins) {
      this._ins = new PruneResponse();
    }
    return this._ins;
  }
}
