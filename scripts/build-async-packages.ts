/**
 * 构建异步分包
 * 由于uniapp对异步分包的支持有问题，顾自定义脚本来打包
 */

import { build } from "esbuild";
import fs from "fs";
import { cwd } from "process";
import path from "path";

const resolvePath = (p: string) => path.resolve(cwd(), p);
const __isDev__ = process.env.NODE_ENV === "development";
const platform = process.env.UNI_PLATFORM;

async function buildPackage(packageName: string) {
  await build({
    entryPoints: [`src/${packageName}/index.ts`],
    bundle: true,
    outfile: `dist/${__isDev__ ? "dev" : "build"}/${platform}/${packageName}/index.js`,
    format: "cjs",
    treeShaking: true,
    minify: !__isDev__,
    drop: !__isDev__ ? ["console", "debugger"] : [],
  });
}

async function bundleQueue(purePackages, buildIdx = 0) {
  if (buildIdx >= purePackages.length) {
    return;
  }
  await buildPackage(purePackages[buildIdx].root);
  bundleQueue(purePackages, buildIdx + 1);
}

async function bootstrap() {
  try {
    const pageJSON = fs.readFileSync(resolvePath("src/pages.json"), "utf-8");
    const appPagesConfig = JSON.parse(pageJSON);
    const purePackages = appPagesConfig.subPackages.filter((l: { pages: string[] }) => !l.pages.length);
    await bundleQueue(purePackages, 0);

    // 修复uniapp对resolveAlias的问题
    const buildPageJSON = fs.readFileSync(
      resolvePath(`dist/${__isDev__ ? "dev" : "build"}/${platform}/app.json`),
      "utf-8"
    );
    const buildPageConfig = JSON.parse(buildPageJSON);
    buildPageConfig["resolveAlias"] = {
      ...buildPageConfig["resolveAlias"],
      "~/*": "/*",
    };
    fs.writeFileSync(
      resolvePath(`dist/${__isDev__ ? "dev" : "build"}/${platform}/app.json`),
      JSON.stringify(buildPageConfig)
    );
  } catch (error) {
    throw error;
  }
}

try {
  bootstrap();
} catch (err) {
  console.error(err);
  process.exit(0);
}
