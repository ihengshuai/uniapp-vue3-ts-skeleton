import { Plugin } from "vite";
import { envConfig } from "../env";
import { Platform } from "../type";

function getPlatformConfigKey() {
  switch (envConfig.PLATFORM) {
    case Platform.alipay:
      return "mini.project.json";
    case Platform.weixin:
    default:
      return "project.config.json";
  }
}

export function buildProjectConfigPlugin(): Plugin {
  return {
    name: "build-project-config",

    generateBundle(code, chunk) {
      const configFileName = getPlatformConfigKey();
      if (!chunk[configFileName]) return;

      const projectConfig = JSON.parse(
        // @ts-ignore
        chunk[configFileName]?.source || null
      );
      projectConfig.appid = envConfig.appId;
      // @ts-ignore
      chunk[configFileName].source = JSON.stringify(projectConfig);
    },
  };
}
