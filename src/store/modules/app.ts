import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const appName = ref();
  const userInfo = reactive({
    name: null,
    age: null,
    sex: null,
  });

  function setAppName(name: string) {
    appName.value = name;
  }

  // 可以定义用户信息接口类型，这里省略
  function setUserConfig(config: any) {
    userInfo.name = config.name;
    userInfo.age = config.age;
    userInfo.sex = config.sex;
  }

  return {
    userInfo,
    appName,
    setAppName,
    setUserConfig,
  };
});
