import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import uni from "@dcloudio/vite-plugin-uni";
import compression from "vite-plugin-compression";
import { buildProjectConfigPlugin } from "./scripts/vite/plugin";
import { envConfig } from "./scripts/env";
import { resolvePath } from "./scripts/util";
import { visualizer } from "rollup-plugin-visualizer";

const { __isDev__, __isH5__, BUNDLE_ANALYZER } = envConfig;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolvePath("src"),
      "~": resolvePath("."),
    },
  },
  // 全局常量
  define: {
    // __isDev__,
    "import.meta.env.VITE_COOKIE_DOMAIN": JSON.stringify(envConfig.COOKIE_DOMAIN),
    "import.meta.env.VITE_APPID": JSON.stringify(envConfig.appId),
    "import.meta.env.VITE_APP_IDS": JSON.stringify(envConfig.appIds || ""),
    "import.meta.env.VITE_IS_H5": JSON.stringify(__isH5__),
  },

  build: __isDev__
    ? {}
    : {
        minify: "terser",
        terserOptions: {
          compress: {
            // eslint-disable-next-line camelcase
            drop_console: envConfig.DROP_CONSOLE !== "false",
          },
        },
      },

  plugins: [
    uni(),
    vueJsx(),
    buildProjectConfigPlugin(),
    !__isDev__ && __isH5__
      ? compression({
          algorithm: "gzip",
        })
      : null,
    !__isDev__ && BUNDLE_ANALYZER && visualizer({ open: true, filename: "dist/stats.html" }),
  ],
});
