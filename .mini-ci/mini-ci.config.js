/**
 * mini ci配置模板，请根据实际需求修改
 * 更多配置详情请参考：https://github.com/ihengshuai/mini-ci
 */

const { defineConfig } = require("@hengshuai/mini-core");
const { definePlatformConfig } = require("@hengshuai/mini-helper");
const { resolvePath, logger } = require("@hengshuai/mini-helper");
const { Platform, IProjectActionMode } = require("@hengshuai/mini-type");
const dotenv = require("dotenv");

const parsedConfig = dotenv.config({
  path: resolvePath(".env.production"),
  override: true,
})?.parsed;
const hasEnvConfig = !!Object.keys(parsedConfig).length;

if (!hasEnvConfig) {
  logger.error("需要提供 .env.production 配置文件");
  process.exit(0);
}
// ci需要执行的appid,有时候可能只需要发布部分appid,当空时默认全部appid都要发布
const ciAppIds = parsedConfig.ciAppIds?.split(",") || null;

const platformConfig = definePlatformConfig({
  // 微信平台
  [Platform.Wechat]: {
    // 平台专有配置
    platformSpecific: {
      // 项目路径
      projectPath: "./dist/build/mp-weixin",
      // 上传代码私钥(请从平台后台上获取)
      privateKeyPath: ".mini-ci/keys/wechat-upload-code.key",
    },
    subs: [
      {
        appId: "wx3434242234",
        admin: "https://mp.weixin.qq.com",
        version: "0.0.1",
        // 执行模式
        mode: IProjectActionMode.UPLOAD_CODE,
        // 是否跳过上传
        skipUpload: true,
        // 不同项目的私钥可能不用
        // projectPath: "xxx",
        // privateKeyPath: "xxx",
        description: "测试ci  " + +new Date(),
        compiler: {
          es6: false,
          es7: true,
          minifyJS: true,
        },
      },
      {
        appId: "wx334dddb4aa820817",
        admin: "https://mp.weixin.qq.com",
        version: "0.0.1",
        // 执行模式
        mode: IProjectActionMode.UPLOAD_CODE,
        // 是否跳过上传
        skipUpload: true,
        description: "测试ci  " + +new Date(),
        compiler: {
          es6: false,
          es7: true,
          minifyJS: true,
        },
      },
    ],
  },
  // 其他平台...
})

const config = defineConfig({
  ci: {
    // ci配置
    visual: false,
    appids: ciAppIds
  },
  // 不同平台配置
  platforms: {
    ...platformConfig
  },
});

module.exports = config;
