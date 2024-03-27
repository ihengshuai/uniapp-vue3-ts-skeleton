<template>
  <view class="content">
    <image
      class="logo"
      src="/static/logo.png"
    />
    <view class="text-area">
      <text class="title">{{ title }}{{ appStore.store.name }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import { onHide, onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const title = ref("Hello");
const appStore = useAppStore();

onLoad(() => {
  console.log("onLaunch page...", appStore.store.name);
});
onShow(() => {
  console.log("onShow page...");
});
onHide(() => {
  console.log("onHide page...");
});
</script>

<style lang="scss" scoped>
$color: salmon;

.box {
  color: $color;
  background: gray;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
