/**
    * mini ci配置模板，请根据实际需求修改
    * 更多配置详情请参考：https://github.com/ihengshuai/mini-ci
    */

   const { defineConfig } = require("@hengshuai/mini-core");
   const { Platform, IProjectActionMode } = require("@hengshuai/mini-type");

   const config = defineConfig({
     ci: {
       // ci配置
     },
     // 不同平台配置
     platforms: {
       // 微信平台
       [Platform.Wechat]: {
         // 平台专有配置
         platformSpecific: {
           // 项目路径
           projectPath: "./dist",
           // 上传代码私钥(请从平台后台上获取)
           privateKeyPath: ".mini-ci/keys/wechat-upload-code.key",
         },
         subs: [
           {
             appId: "your app id",
             admin: "https://mp.weixin.qq.com",
             version: "0.0.1",
             // 执行模式
             mode: IProjectActionMode.REVIEW,
             // 是否跳过上传
             skipUpload: true,
             // 不同项目的私钥可能不用
             // projectPath: "xxx",
             // privateKeyPath: "xxx",
             description: "测试ci  " + +new Date,
             compiler: {
               es6: false,
               es7: true,
               minifyJS: true,
             },
           },
         ],
       },
       // 其他平台...
     },
   });

   module.exports = config;
   