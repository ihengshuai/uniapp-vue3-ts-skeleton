// eslint-disable-next-line @typescript-eslint/naming-convention
export interface EnvConfig {
  __isDev__: boolean;
  __isH5__: boolean;
  VITE_BASE_URL: string;
  VITE_API_DOMAIN: string;
  VITE_TIMEOUT: string;
  VITE_USE_MOCK: string;
  VITE_MOCK_API: string;
  COOKIE_DOMAIN: string;
  NODE_ENV: "development" | "production";
  DROP_CONSOLE: string;
  PORT: string;
  BUNDLE_ANALYZER?: boolean;
  SSL_CERTIFICATE_KEY?: string;
  SSL_CERTIFICATE?: string;
  appIds: string[];
  appId: string;
  PLATFORM: "mp-weixin" | "mp-alipay" | "h5";
}

export enum Platform {
  weixin = "mp-weixin",
  alipay = "mp-alipay",
  h5 = "h5",
}
