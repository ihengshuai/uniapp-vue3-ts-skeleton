import { createSSRApp } from "vue";
import App from "./App.vue";
import { setStore } from "@/store";

export function createApp() {
  const app = createSSRApp(App);
  setStore(app);

  return {
    app,
  };
}
