/**
 * 构建异步分包
 * 由于uniapp对异步分包的支持有问题，顾自定义脚本来打包
 */

const { build } = require("esbuild");
const fs = require("fs");
const { cwd } = require("process");
const path = require("path");

const resolvePath = p => path.resolve(cwd(), p);
const __isDev__ = process.env.NODE_ENV === "development";
const platform = process.env.UNI_PLATFORM;

async function buildPackage(packageName) {
  await build({
    entryPoints: [`src/${packageName}/index.ts`],
    bundle: true,
    outfile: `dist/${__isDev__ ? "dev" : "build"}/${platform}/${packageName}/index.js`,
    format: "cjs",
    minify: !__isDev__,
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
    const pageJSON = await fs.readFileSync(resolvePath("src/pages.json"), "utf-8");
    const appPagesConfig = JSON.parse(pageJSON);
    const purePackages = appPagesConfig.subPackages.filter(l => !l.pages.length);
    await bundleQueue(purePackages, 0);
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
