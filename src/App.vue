<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

import { useGlobalAppData } from "@/hooks/common";
import { fetchHomeData } from "@/service/modules/app.service";
import { useAppStore } from "@/store";

import { useConfig } from "./config";

const appConfig = useConfig();
const { setAppName, setUserConfig } = useAppStore();
const { setGlobaApplData } = useGlobalAppData();

onLaunch(async () => {
  // 设置全局数据
  setTimeout(() => {
    setGlobaApplData({
      appTitle: "uniapp skeleton",
    });
  }, 800);

  console.log(
    `App Launch, 当前环境: ${appConfig.__isH5__ ? "h5" : "非h5"},${appConfig.__isDev__ ? "开发" : "生产"}环境`
  );
  setAppName("uni-app");

  fetchHomeData().then(res => {
    setUserConfig(res);
  });
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import "uview-plus/index.scss";
</style>
