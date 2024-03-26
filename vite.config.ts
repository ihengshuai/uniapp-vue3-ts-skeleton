import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), vueJsx()],
});
