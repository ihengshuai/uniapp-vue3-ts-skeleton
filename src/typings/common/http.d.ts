import { HTTP_DATA_TYPE } from "@/constants/http";
import { AxiosRequestConfig } from "axios";

export abstract class Interceptor {
  static _ins: Interceptor;
  abstract type: InterceptorType;
  abstract interceptor(res: IResponseData | unknown): Promise<any>;
  static instance: Interceptor;
}

export interface IResponseData {
  data: any;
  config: IHttpRequestConfig;
}

// https://zh.uniapp.dcloud.io/api/request/request.html#request
/** 小程序uni请求参数 */
export interface IMiniProgramRequestConfig {
  /**
   * 验证 ssl 证书
   */
  sslVerify?: boolean;
  /**
   * DNS解析时优先使用 ipv4
   */
  firstIpv4?: boolean;
  /**
   * 开启 http2
   */
  enableHttp2?: boolean;
  /**
   * 开启 quic
   */
  enableQuic?: boolean;
  /**
   * 开启 cache
   */
  enableCache?: boolean;
  /**
   * 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
   */
  enableHttpDNS?: boolean;
  /**
   * HttpDNS 服务商 Id。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
   */
  httpDNSServiceId?: boolean;
  /**
   * 开启 transfer-encoding chunked
   */
  enableChunked?: boolean;
  /**
   * wifi下使用移动网络发送请求
   */
  forceCellularNetwork?: boolean;
  /**
   * 默认 false，开启后可在headers中编辑cookie（支付宝小程序10.2.33版本开始支持）
   */
  enableCookie?: boolean;
  /**
   * 是否开启云加速（详见[云加速服务](https://smartprogram.baidu.com/docs/develop/extended/component-codeless/cloud-speed/introduction/)）
   */
  cloudCache?: object | boolean;
  /**
   * 控制当前请求是否延时至首屏内容渲染后发送
   */
  defer?: boolean;
}

interface IUploadFileOptionFiles {
  /**
   * multipart 提交时，表单的项目名，默认为 file，如果 name 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。
   */
  name?: string;
  /**
   * 要上传的文件对象
   */
  file?: File;
  /**
   * 要上传文件资源的路径
   */
  uri?: string;
}

export interface IHttpUploadRequestConfig {
  /**
   * 开发者服务器 url
   */
  url: string;
  /**
   * 文件类型，image/video/audio，仅支付宝小程序，且必填。
   * - image: 图像
   * - video: 视频
   * - audio: 音频
   */
  fileType?: "image" | "video" | "audio";
  /**
   * 要上传的文件对象
   */
  file?: File;
  /**
   * 要上传文件资源的路径
   */
  filePath?: string;
  /**
   * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
   */
  name?: string;
  /**
   * 需要上传的文件列表。
   */
  files?: IUploadFileOptionFiles[];
}

export interface IHttpRequestConfig extends AxiosRequestConfig, IMiniProgramRequestConfig, IHttpUploadRequestConfig {
  /** 以叉桩形式拼接地址 */
  urlPath?: Record<string, string | number | boolean | undefined | null>;
  /** 数据类型 */
  serializeType?: HTTP_DATA_TYPE;
  /**
   * 重试次数
   * @default 0
   */
  retryCount?: number;
  /**
   * 重试间隔
   * @default 1000
   */
  retryInterval?: number;
  /**
   * 开启全局错误捕获
   * @default true
   */
  captureError?: boolean;
  /**
   * 忽略取消请求
   * @default false
   */
  ignoreCancelToken?: boolean;
  /**
   * 是否开启时间戳(get缓存问题)
   * @default false
   * @method get
   */
  timeStamp?: boolean;
  /**
   * 是否转换相应数据为驼峰
   * @default true
   */
  transferToCamel?: boolean;
  /**
   * 绑定当前请求参数配置（仅内部使用）
   */
  $request?: IHttpRequestConfig;
  signal?: UniApp.RequestTask;
}

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
  interface AxiosRequestConfig {
    $request?: IHttpRequestConfig;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
  interface AxiosResponse {
    /**
     * 配置
     */
    config: IHttpRequestConfig;
    /**
     * 后端返回的真实载体
     */
    payload?: {
      /**
       * 后端状态码
       */
      code: number;
      /**
       * 有效数据
       */
      data: any;
      /**
       * 消息信息
       */
      message?: string;
      /**
       * 错误信息
       */
      error?: string;
    };
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface, no-unused-vars
  interface InternalAxiosRequestConfig extends IHttpRequestConfig {}
}
