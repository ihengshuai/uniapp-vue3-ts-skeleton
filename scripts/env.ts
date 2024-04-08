import dotenv from "dotenv";
import { resolvePath } from "./util";
import { EnvConfig, Platform } from "./type";

const __isDev__ = process.env.NODE_ENV === "development";
const __isH5__ = process.env.PLATFORM === Platform.h5;

const parsedConfig =
  dotenv.config({
    path: __isDev__ ? resolvePath(".env") : resolvePath(".env.production"),
    override: true,
  })?.parsed || ({} as any);

export const envConfig: EnvConfig = {
  ...parsedConfig,
  __isDev__,
  __isH5__,
  BUNDLE_ANALYZER: parsedConfig.BUNDLE_ANALYZER === "true",
  appIds: parsedConfig.appIds?.split(","),
  PLATFORM: process.env.UNI_PLATFORM
};
