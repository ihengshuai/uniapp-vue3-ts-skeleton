import { Plugin } from "vite";
import { envConfig } from "../env";
import { Platform } from "../type";
import { exec } from "child_process";

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

    generateBundle(_code, chunk) {
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

    writeBundle() {
      if (!envConfig.PLATFORM.startsWith("mp-")) return;
      console.log("%c 正在处理异步包...", "color:red");
      exec("esno scripts/build-async-packages.ts");
    },
  };
}
