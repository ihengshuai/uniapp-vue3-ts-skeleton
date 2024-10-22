/**
 * https://cn.vitejs.dev/guide/env-and-mode#intellisense
 */

/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMetaEnv {
  /**
   * 公共路径
   */
  VITE_BASE_URL: string;
  /**
   * 环境
   */
  VITE_ENV: string;
  /**
   * 请求超时时间
   */
  VITE_TIMEOUT: string;
  /**
   * 接口地址
   */
  VITE_API_DOMAIN: string;

  /**
   * Cookie Domain
   */
  VITE_COOKIE_DOMAIN: string;

  /**
   * Language Cookie Key
   */
  VITE_COOKIE_LANG_KEY: string;

  /**
   * appId：当前小程序id
   */
  VITE_APP_ID: string;

  /**
   * appIds: sass系统中所有小程序id
   */
  VITE_APP_IDS: string;

  /** 是否h5环境 */
  VITE_IS_H5: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
