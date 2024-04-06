<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useAppStore } from "@/store";
import { fetchHomeData } from "./service/modules/app.service";
const { setAppName, setUserConfig } = useAppStore();

onLaunch(async () => {
  console.log("App Launch");
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
