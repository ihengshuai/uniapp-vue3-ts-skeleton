<template>
  <PageMain
    class="content"
    :loading="loading"
    loading-text="大爷请稍等..."
    fixed-header
  >
    <image
      class="logo"
      src="/static/logo.png"
    />
    <view class="text-area">
      <text class="title">{{ title }} {{ appName }}</text>
    </view>
    <text>\n</text>

    <!-- #ifndef H5 -->
    <view style="font-weight: 500">当前appId: {{ appConfig.APP_ID }}</view>
    <text>\n</text>
    <!-- #endif -->

    <view v-if="userInfo.name && userInfo.age && userInfo.sex">
      来自App全局请求的数据：
      <text>\n姓名：{{ userInfo.name }}</text>
      <text>\n年龄：{{ userInfo.age }}</text>
      <text>\n性别：{{ userInfo.sex }}\n\n</text>
    </view>
    <view>
      globalData:
      <view>{{ globalAppData.appTitle }}</view>
      <view v-if="globalAppData.author?.name">{{ globalAppData.author.name }}</view>
      <view v-if="globalAppData.author?.age">{{ globalAppData.author.age }}</view>
    </view>
    <u-button
      style="width: 200px"
      type="primary"
      shape="circle"
      @click="changeGlobalData"
    >
      修改globalData
    </u-button>
    <text>\n</text>

    <view
      v-if="serverData"
      style="color: #999; font-size: 28rpx"
    >
      {{ serverData }}
    </view>
    <text>\n</text>
    <u-button
      :loading="loading"
      :disabled="loading"
      style="width: 200rpx"
      text="成功请求"
      type="success"
      shape="circle"
      @click="requestUserMockData"
    />
    <text>\n</text>
    <button @click="requestBusinessErrorData">业务状态码错误(疯狂点击取消重复请求)</button>
    <text>\n</text>
    <button @click="requestCustomBusinessErrorHookData">自定义业务错误钩子</button>
    <text>\n</text>
    <button
      :loading="loading2"
      :disabled="loading2"
      @click="requestServerErrorData"
    >
      服务器出错(自动重试)
    </button>
    <text>\n</text>
    <button @click="() => requestDiffCaptureError()">全局拦截错误</button>
    <text>\n</text>
    <button @click="() => requestDiffCaptureError(false)">自定义错误(非全局拦截)</button>
    <text>\n</text>
    <button @click="goSubPage">去子包首页</button>
    <text>\n</text>
    <button @click="goCustomNavigationPage">自定义导航栏页面</button>
    <text>\n</text>
    <u-button
      type="primary"
      class="u-btn"
      @click="goWebviewPage"
    >
      打开webview
    </u-button>
    <text>\n</text>
  </PageMain>
</template>

<script lang="ts" setup>
import { onHide, onLoad, onShow } from "@dcloudio/uni-app";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import PageMain from "@/components/page-main/index.vue";
import { useConfig } from "@/config";
import { useGlobalAppData } from "@/hooks/common";
import {
  fetchUserMockData,
  fetchBusinessError,
  fetchServerError,
  fetchCustomBusinessErrorHook,
} from "@/service/modules/user.service";
import { useAppStore } from "@/store";

const title = ref("Hello");
const appStore = useAppStore();
const { appName, userInfo } = storeToRefs(appStore);
const loading2 = ref(false);
const loading = ref(false);
const serverData = ref();
const appConfig = useConfig();

onLoad(() => {
  console.log("onLaunch page...", appName.value);
});
onShow(() => {
  console.log("onShow page...");
});
onHide(() => {
  console.log("onHide page...");
});
const { globalAppData, setGlobaApplData } = useGlobalAppData();

function changeGlobalData() {
  setGlobaApplData({
    author: {
      age: Math.floor(Math.random() * 9 + 20),
    },
  });
  console.log("changeGlobalData", globalAppData.value);
}

function goSubPage() {
  uni.navigateTo({
    url: "/pages-h5/pages/home/index?id=2&name=xiaoming",
  });
}

function goCustomNavigationPage() {
  uni.navigateTo({
    url: "/pages-h5/pages/custom-navigation/index",
  });
}

function goWebviewPage() {
  uni.navigateTo({
    url: "/pages-blog/index",
  });
}

function requestUserMockData() {
  serverData.value = null;
  loading.value = true;
  fetchUserMockData(+new Date())
    .then(res => {
      serverData.value = res;
    })
    // eslint-disable-next-line no-unused-vars
    .catch(err => {
      // console.log("出错了...", err.message);
      // uni.showToast({
      //   title: err.message || "出错了...",
      //   icon: "none",
      // });
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

async function requestDiffCaptureError(captureError = true) {
  try {
    await fetchServerError({
      captureError,
      retryCount: 0,
    });
  } catch (err) {
    if (!captureError) {
      uni.showToast({
        title: "请求出错了(自定义错误)...",
        icon: "none",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
$color: salmon;

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 100rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.content {
  text-align: center;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.u-btn {
  width: 220rpx;
}
</style>
