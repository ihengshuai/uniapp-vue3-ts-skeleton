/**
 * 项目配置文件
 */
export interface IConfig {
  /**
   * 公共路径
   */
  PUBLIC_PATH: string;
  /**
   * 环境
   */
  ENV: "development" | "production";
  /**
   * 开发环境
   */
  __isDev__: boolean;
  /**
   * 生产环境
   */
  __isProd__: boolean;
  /**
   * 请求超时时间
   */
  TIMEOUT: number;
  /**
   * 接口地址
   */
  API_DOMAIN: string;

  /**
   * 是否使用mock请求
   */
  USE_MOCK: boolean;

  /**
   * mock地址
   */
  MOCK_API: string;

  /**
   * Cookie Domain
   */
  COOKIE_DOMAIN: string;
}