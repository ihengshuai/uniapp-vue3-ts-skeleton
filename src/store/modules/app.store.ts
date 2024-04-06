import type { IUserInfo } from "@/typings/business/user.interceface";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const appName = ref();
  const userInfo = reactive({
    name: "",
    age: -1,
    sex: "",
  });

  function setAppName(name: string) {
    appName.value = name;
  }

  function setUserConfig(config: IUserInfo) {
    userInfo.name = config.userName!;
    userInfo.age = config.userAge!;
    userInfo.sex = config.userSex!;
  }

  return {
    userInfo,
    appName,
    setAppName,
    setUserConfig,
  };
});
