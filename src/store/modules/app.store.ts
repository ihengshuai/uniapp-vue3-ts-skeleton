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
    // 这里服务器返回的是`user_name`key，请求库会根据配置自动转为`userName`小驼峰
    userInfo.name = config.userName;
    userInfo.age = config.userAge;
    userInfo.sex = config.userSex;
  }

  return {
    userInfo,
    appName,
    setAppName,
    setUserConfig,
  };
});
