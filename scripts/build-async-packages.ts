/**
 * 构建异步分包
 * 由于uniapp对异步分包的支持有问题，顾自定义脚本来打包
 */

import fs from "fs";
import path from "path";
import { cwd } from "process";

import chokidar from "chokidar";
import { build } from "esbuild";

const resolvePath = (p: string) => path.resolve(cwd(), p);
const __isDev__ = process.env.NODE_ENV === "development";
const platform = process.env.UNI_PLATFORM || "mp-weixin";

const PLATFORMS = {
  WEIXIN: "mp-weixin",
  ALIPAY: "mp-alipay",
  BAIDU: "mp-baidu",
  TOUTIAO: "mp-toutiao",
  QQ: "mp-qq",
};

async function buildPackage(packageName: string) {
  await build({
    entryPoints: [`src/packages/${packageName}/index.ts`],
    bundle: true,
    outfile: `dist/${__isDev__ ? "dev" : "build"}/${platform}/package-${packageName}/index.js`,
    format: "cjs",
    treeShaking: true,
    drop: !__isDev__ ? ["console", "debugger"] : [],
    // minify: !__isDev__,
  });
}

async function bundleQueue(purePackages, buildIdx = 0) {
  if (buildIdx >= purePackages.length) {
    return;
  }
  console.log("异步包构建进度：" + `${buildIdx + 1}/${purePackages.length}`);
  await buildPackage(purePackages[buildIdx]);
  bundleQueue(purePackages, buildIdx + 1);
}

async function bootstrap() {
  try {
    console.log("\n正在处理异步分包...");
    const userDefinedPackagesPath = resolvePath("src/packages");
    const bundlePageConfigPath = `dist/${__isDev__ ? "dev" : "build"}/${platform}/app.json`;

    // 拿到用户定义的异步包
    const userDefinedPackages = (fs.readdirSync(userDefinedPackagesPath) || []).filter(name =>
      fs.existsSync(`${userDefinedPackagesPath}/${name}/index.ts`)
    );

    console.log(`扫描到【${userDefinedPackages.length}】个异步分包.`);

    // 构建异步包
    await bundleQueue(userDefinedPackages, 0);

    // 拿到打包后的page.json
    const bundlePageConfigStr = await fs.readFileSync(resolvePath(bundlePageConfigPath), "utf-8");
    const bundlePageConfig = JSON.parse(bundlePageConfigStr);

    // 补充subPackages定义
    bundlePageConfig.subPackages = bundlePageConfig.subPackages || [];
    const subPackageNames = bundlePageConfig.subPackages.map(l => l.root);
    const beautifyAsyncPackages = userDefinedPackages
      .map(p => ({ root: `package-${p}`, pages: [] }))
      .filter(l => !subPackageNames.includes(l.root));
    bundlePageConfig.subPackages.unshift(...beautifyAsyncPackages);

    /* === resolveAlias处理 === */
    // 微信平台
    if (platform === PLATFORMS.WEIXIN) {
      const asyncPackageObj = beautifyAsyncPackages.reduce((p, c) => {
        p[`~${c.root}/*`] = `/${c.root}/*`;
        return p;
      }, {});
      bundlePageConfig["resolveAlias"] = {
        ...bundlePageConfig["resolveAlias"],
        ...asyncPackageObj,
      };
    }
    // 支付宝平台
    // https://opendocs.alipay.com/mini/03dbc3
    else if (platform === PLATFORMS.ALIPAY) {
      const miniProjectConfigPath = resolvePath(`dist/${__isDev__ ? "dev" : "build"}/${platform}/mini.project.json`);
      const buildProjectConfigJSON = await fs.readFileSync(miniProjectConfigPath, "utf-8");
      const buildProjectConfig = JSON.parse(buildProjectConfigJSON);
      buildProjectConfig["compileOptions"] = buildProjectConfig["compileOptions"] || {};

      const asyncPackageObj = beautifyAsyncPackages.reduce((p, c) => {
        p[`~${c.root}/*`] = `./${c.root}/*`;
        return p;
      }, {});
      // uniapp打包后的配置是1.x版本配置，需升级到2.x
      buildProjectConfig["compileOptions"]["component2"] = true;
      buildProjectConfig.enableAppxNg && delete buildProjectConfig["enableAppxNg"];
      buildProjectConfig.component2 && delete buildProjectConfig["component2"];
      buildProjectConfig["developOptions"] = buildProjectConfig["developOptions"] || {};
      buildProjectConfig["developOptions"]["lazyCompile"] = true;
      buildProjectConfig["developOptions"]["sourcemap"] = false;
      buildProjectConfig["compileOptions"]["resolveAlias"] = {
        ...buildProjectConfig["compileOptions"]["resolveAlias"],
        ...asyncPackageObj, // 不能以 / 开头
      };
      buildProjectConfig["format"] = 2; // 需要2才支持

      fs.writeFileSync(miniProjectConfigPath, JSON.stringify(buildProjectConfig));
    }

    // 按需编译
    bundlePageConfig["useDynamicPlugins"] = true;
    bundlePageConfig["lazyCodeLoading"] = "requiredComponents";

    fs.writeFileSync(
      resolvePath(`dist/${__isDev__ ? "dev" : "build"}/${platform}/app.json`),
      JSON.stringify(bundlePageConfig)
    );

    console.log("done.\n");
  } catch (error) {
    throw error;
  }
}

try {
  bootstrap();

  if (__isDev__) {
    const watch = chokidar.watch("src/packages/**/*.ts", { persistent: true /**ignored: /?=ts$/i */ });
    watch.on("change", async () => {
      await bootstrap();
    });
  }
} catch (err) {
  console.error(err);
  process.exit(0);
}
