import { createSSRApp, createApp as createClientApp, type App as VueApp } from "vue";
import App from "./App.vue";
import { setStore } from "@/store";
import uviewPlus from "uview-plus";

export function createApp() {
  let app: VueApp;

  // #ifdef H5
  // h5尽量不要使用ssr模式
  app = createClientApp(App);
  // #endif

  // #ifdef MP-WEIXIN
  app = createSSRApp(App);
  // #endif

  app.config.warnHandler = (msg, vm, trace) => {
    if (msg.startsWith("Unhandled error during execution of native event handler")) return;
    console.warn(msg, vm, trace);
  };

  app.use(uviewPlus);

  uni.$u.setConfig({
    config: {
      unit: "rpx",
    },
  });

  setStore(app);

  return {
    app,
  };
}
