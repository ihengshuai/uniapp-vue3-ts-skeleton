<template>
  <PageMain
    fixed-header
    custom-header
    :loading="appListLoading"
    custom-header-css-style="background: url('/static/logo.png') 0 0/100rpx repeat"
    home-url="/pages/main/home/index"
    title="h5页面💚"
  >
    <text>当前时间：{{ now }}</text>
    <u-button @click="requestGameList">请求游戏列表</u-button>
    <view
      v-for="app in appList"
      :key="app.appId"
    >
      游戏名:{{ app.appName }} 版本号:{{ app.appVersion }} 上架时间:{{ app.date }}
    </view>
    <view
      v-for="item in 100"
      :key="item"
    >
      package-a 页面{{ item }}...
    </view>
    <view>
      <u-tabbar
        :value="tabActiveIdx"
        placeholder
        fixed
        safe-area-inset-bottom
      >
        <u-tabbar-item
          text="首页"
          icon="home"
          @click="clickTabItem"
        ></u-tabbar-item>
        <u-tabbar-item
          text="放映厅"
          icon="photo"
          @click="clickTabItem"
        ></u-tabbar-item>
        <u-tabbar-item
          text="直播"
          icon="play-right"
          @click="clickTabItem"
        ></u-tabbar-item>
        <u-tabbar-item
          text="我的"
          icon="account"
          @click="clickTabItem"
        ></u-tabbar-item>
      </u-tabbar>
    </view>
  </PageMain>
</template>

<script lang="ts" setup>
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { ref } from "vue";

import PageMain from "@/components/page-main/index.vue";
import { useNavigationBounding } from "@/hooks/common";
import { fetchGameListMockData } from "@/pages-h5/service/game.service";
import type { IAppInfo } from "@/typings/business/game.interface.ts";
// #ifdef H5
// eslint-disable-next-line import/order
import { formatDate } from "@/packages/moment";
// #endif

// variables
const tabActiveIdx = ref(0);
const clickTabItem = (idx: number) => {
  tabActiveIdx.value = idx;
};
const now = ref("");
// #ifndef H5
require.async<any>("~package-moment/index.js").then((res: any) => {
  console.log("moment加载成功,", res);
  now.value = res.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
});
// #endif
// #ifdef H5
now.value = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
// #endif
const appList = ref<IAppInfo[]>([]);
const appListLoading = ref(false);

// hooks
useNavigationBounding({ provider: true });
onLoad(query => {
  console.log("package-a onLoad", query);
});
onPullDownRefresh(() => {
  requestGameList();
});

// functions
async function requestGameList() {
  try {
    appListLoading.value = true;
    const { apps } = (await fetchGameListMockData(+new Date())) || {};
    appList.value = apps || [];
  } finally {
    appListLoading.value = false;
    uni.stopPullDownRefresh();
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  border-bottom: 1px solid #efefef;
}
.navigation__bar {
  // height: var(--status-bar-height);
  width: 100%;
}
.navigation__body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
