import * as Pinia from "pinia";
import type { App } from "vue";

const store = Pinia.createPinia();
export function setStore(app: App) {
  app.use(store);
}
export * from "./modules";
