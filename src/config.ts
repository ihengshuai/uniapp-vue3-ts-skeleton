import type { IConfig } from "@/typings/common/config";

/**
 * 获取项目配置
 */
export function useConfig(): IConfig {
  return {
    API_DOMAIN: import.meta.env.VITE_API_DOMAIN || "/",
    PUBLIC_PATH: import.meta.env.VITE_BASE_URL || "/",
    ENV: import.meta.env.MODE as any,
    __isDev__: import.meta.env.DEV,
    __isProd__: import.meta.env.PROD,
    TIMEOUT: parseInt(import.meta.env.VITE_TIMEOUT) || 1000 * 60 * 6,
    USE_MOCK: import.meta.env.VITE_USE_MOCK === "true",
    MOCK_API: import.meta.env.VITE_MOCK_API || null,
    COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN || "localhost",
  };
}
