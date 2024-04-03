<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useAppStore } from "@/store";
const { setAppName } = useAppStore();

onLaunch(async () => {
  console.log("App Launch");
  setAppName("uni-app");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
