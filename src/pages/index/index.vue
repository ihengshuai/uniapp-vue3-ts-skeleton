<template>
  <view class="content">
    <image
      class="logo"
      src="/static/logo.png"
    />
    <view class="text-area">
      <text class="title">{{ title }} {{ appStore.store.name }}</text>
    </view>
    <br />
    <view
      v-if="serverData"
      style="color: #999; font-size: 28rpx"
    >
      {{ serverData }}
    </view>
    <button
      :loading="loading"
      :disabled="loading"
      @click="requestUserMockData"
    >
      成功请求
    </button>
    <br />
    <button @click="requestBusinessErrorData">业务状态码错误(疯狂点击取消重复请求)</button>
    <br />
    <button @click="requestCustomBusinessErrorHookData">自定义业务错误钩子</button>
    <br />
    <button
      :loading="loading2"
      :disabled="loading2"
      @click="requestServerErrorData"
    >
      服务器出错(自动重试)
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onHide, onLoad, onShow } from "@dcloudio/uni-app";
import { useAppStore } from "@/store";
import {
  fetchUserMockData,
  fetchBusinessError,
  fetchServerError,
  fetchCustomBusinessErrorHook,
} from "@/service/modules/user.service";

const title = ref("Hello");
const appStore = useAppStore();
const loading2 = ref(false);
const loading = ref(false);
const serverData = ref();

onLoad(() => {
  console.log("onLaunch page...", appStore.store.name);
});
onShow(() => {
  console.log("onShow page...");
});
onHide(() => {
  console.log("onHide page...");
});

function requestUserMockData() {
  serverData.value = null;
  loading.value = true;
  fetchUserMockData()
    .then(res => {
      serverData.value = res;
    })
    .catch(err => {
      console.log("出错了...", err.message);
      uni.showToast({
        title: err.message || "出错了...",
        icon: "none",
      });
    })
    .finally(() => {
      loading.value = false;
    });
}
function requestBusinessErrorData() {
  fetchBusinessError();
}
async function requestCustomBusinessErrorHookData() {
  try {
    const res = await fetchCustomBusinessErrorHook();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function requestServerErrorData() {
  loading2.value = true;
  try {
    const res = await fetchServerError();
    console.log(res);
  } catch (error: any) {
    console.log("请求出错了...", error.message);
  } finally {
    loading2.value = false;
  }
}
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
