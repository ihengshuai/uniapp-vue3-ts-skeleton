import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const store = reactive({
    id: -1,
    name: "",
  });

  function setAppName(name: string) {
    store.name = name;
    console.log(name);
  }

  return {
    store,
    setAppName,
  };
});
