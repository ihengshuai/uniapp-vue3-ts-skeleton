# Uniapp skeleton with vue3 

本项目基于Vue3、Vite、Typescript、NestJS等技术打造的的uniapp项目模板，模板中没有过多冗余的文件和逻辑，开发者可以快速进行开发和适配。为提高开发效率，项目提供了nest本地mock服务；同时为降低项目上线成本，项目中也提供了小程序自动发包工具，可以一键上传到小程序后台，以及其它功能

## 配置
项目中使用env配置文件进行环境变量区分，默认直接拷贝`.env.example`内容到`.env`文件即可。其他环境变量配置，请熟悉变量配置逻辑后自行添加

## 快速开始

1. 安装依赖
```sh
pnpm i
```

3. 配置项目

在项目根目录下创建`.env`文件，并将`.env.example`内容复制进去即可，其他订制配置请自行添加

3. 运行项目
```sh
pnpm dev:h5

pnpm dev:mp-weixin

# 其他平台参考脚本...
```

4. 打包项目
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

## 异步分包
由于uniapp对小程序的异步分包功能支持有问题，顾项目中通过自定义脚本来解决异步分包功能

异步分包主要是来解决第三方包或者某个库的体积过大导致打包体积过大的问题，让其拆出去作为一个单独的包，在业务处使用异步加载的方式引用，这样异步包不会被计算进当前包的体积大小中

使用约束：
- 每个异步包应导出单独的第三方库，尽量不要包含多个库
- 异步包应以通用的规范命名，这样在项目中也能通俗易懂
- 异步分包一定要配置uniapp的`pages.json`文件，因为小程序默认会读取打包后的`app.json`，当内容不匹配时会报错；在`subPackages`中配置`root`属性，指定分包的根目录，以及`pages: []`这个必须要写，脚本要判断
- 异步加载使用

### 示例
1. 假如考虑到moment这个库体积太大，很影响包的体积大小，那就可以采用异步分包形式将其拆分，这里以`pure-库名-lib/index.ts`命名为例：

```ts
// src/pure-moment-lib/index.ts

import moment from 'moment';
export default moment;
```

2. 在`pages.json`中配置异步包
```json
{
  "subPackages": [
    // 省略其他pages
    {
      "root": "pure-moment-lib",
      "pages": [], // 注意这里一定要为空数组
    }
  ]
}
```

3. 在项目中使用，下面会对比下使用异步分包后的使用比较：
```ts
// 使用异步分包前
import moment from 'moment';
const now = moment();

// 使用异步分包后
let now;
require
  .async("../../pure-moment-lib/index.js")
  .then(res => {
    now = res.default();
  })
```

### 使用效果
项目中在分包`pages-h5`中使用了momentjs，采用异步分包后，可以看到分包已经降到了`3kb`，这对后续业务变得复杂包体积考虑不再是问题

![](https://ihengshuai-demo1.oss-cn-beijing.aliyuncs.com/mp-bundler-analyzer.png)

## 自动化助手
项目提供了小程序的自动化助手，旨在帮助开发者快速进行小程序的发布，尤其是sass系统或多平台的小程序会占用开发者大量的时间，安装依赖会默认生成一份ci配置文件

以此为出发点我开发了一款小程序自动化助手，其功能包含：代码上传、提审、发版、体验版等，并且支持多平台；该助手是单独的npm库，你可以在有需要的项目中使用它

1. 安装
```sh
npm i @hengshuai/mini-ci @hengshuai/mini-core -D 
```

2. 初始化配置文件
```sh
npx mini-ci init
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