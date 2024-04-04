import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
import dotenv from "dotenv";

const root = process.cwd();
const pathResolve = (dir: string) => path.resolve(root, ".", dir);

const __isDev__ = process.env.NODE_ENV === "development";

const config =
  dotenv.config({
    path: __isDev__ ? pathResolve(".env") : pathResolve(".env.production"),
    override: true,
  })?.parsed || ({} as any);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathResolve("src"),
      "~": pathResolve("."),
    },
  },
  // 全局常量
  define: {
    // __isDev__,
    "import.meta.env.VITE_COOKIE_DOMAIN": JSON.stringify(config.COOKIE_DOMAIN),
    "import.meta.env.VITE_COOKIE_LANG_KEY": JSON.stringify(config.COOKIE_LANG_KEY),
  },

  css: {
    // preprocessorOptions: {},
  },

  build: __isDev__
    ? {}
    : {
        minify: "terser",
        terserOptions: {
          compress: {
            // eslint-disable-next-line camelcase
            drop_console: config.DROP_CONSOLE !== "false",
          },
        },
      },

  plugins: [uni(), vueJsx()],
});
