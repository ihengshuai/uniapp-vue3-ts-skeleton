# Uniapp skeleton with vue3 

本项目基于Vue3、Vite、Typescript、NestJS等技术打造的的uniapp项目模板，模板中没有过多冗余的文件和逻辑，开发者可以快速进行开发和适配。为提高开发效率，项目提供了nest本地mock服务；同时为降低项目上线成本，项目中也提供了小程序自动发包工具，可以一键上传到小程序后台，以及其它功能

## 配置
项目中使用env配置文件进行环境变量区分，默认直接拷贝`.env.example`内容到`.env`文件即可。其他环境变量配置，请熟悉变量配置逻辑后自行添加

## 快速开始

1. 安装依赖
```sh
pnpm i
```

2. 运行项目
```sh
pnpm dev:h5

pnpm dev:mp-weixin

# 其他平台参考脚本...
```

3. 打包项目
```sh
pnpm build:h5

pnpm build:mp-weixin

# 其他平台参考脚本...
```

## 功能
- 优雅封装网络请求
- 优雅封装本地存储
- 分包优化
- 优雅数据mock
- 优雅的小程序自动化ci
- 以及其他不断补充的优化点...

## mock
项目中使用了NestJS作为mock服务，开发者可以根据`.env`配置文件轻松切换api地址；NestJS有非常好的架构优势，短期可以作为mock服务使用，如若进行项目新的调整，可以将其作为强大的BFF角色，以便更友好的扩展项目

mock服务使用可以参考我的[博客](https://blog.usword.cn/frontend/nestjs/base.html)

## 自动化助手
项目提供了小程序的自动化助手，旨在帮助开发者快速进行小程序的发布，尤其是sass系统或多平台的小程序会占用开发者大量的时间，安装依赖会默认生成一份ci配置文件

以此为出发点我开发了一款小程序自动化助手，其功能包含：代码上传、提审、发版、体验版等，并且支持多平台；该助手是单独的npm库，你可以在有需要的项目中使用它

1. 安装
```sh
npm i @hengshuai/mini-ci @hengshuai/mini-core -D 
```

2. 初始化配置文件
```sh
mini-ci init
```

3. 配置文件`.mini-ci/mini-ci.config.js`
```js
// mini-ci.config.js
const { defineConfig } = require("@hengshuai/mini-core");
const { Platform, IProjectActionMode } = require("@hengshuai/mini-type");

module.exports = defineConfig({
  ci: {},
  platforms: {
    // WeChat平台
    [Platform.Wechat]: {
      platformSpecific: {
        // 包地址
        projectPath: "./dist",
        // 上传代码的私钥
        privateKeyPath: ".mini-ci/keys/wechat-upload-code.key",
      },
      subs: [
        {
          appId: "Your AppId",
          admin: "https://mp.weixin.qq.com",
          version: "1.0.0",
          mode: IProjectActionMode.REVIEW,
          description: "测试ci  " + +new Date,
          compiler: {
            // es6: false,
            // es7: true,
            // minifyJS: true,
          },
        },
      ]
    }
  }
})
```

4. 配置脚本
```package.json
"scripts": {
  "ci": "mini-ci start",
}
```

> 更多使用详情，请参考[mini-ci 文档](https://github.com/ihengshuai/mini-ci)

## 版权
本项目开源免费，请多多宣传，欢迎提意见

## 打赏
如果你觉得本项目对你有帮助，不介意的话打赏一杯咖啡，鼓励作者不断分享技术文章，在此感谢!:thumbsup:

<div>
<img src="https://ihengshuai-demo1.oss-cn-beijing.aliyuncs.com/005HV6Avgy1h72anu40usj30dw0dw40j.jpg" width=200>
<img src="https://ihengshuai-demo1.oss-cn-beijing.aliyuncs.com/005HV6Avgy1h72ap99ym1j30b40b4abq.jpg" width=200>
</div>