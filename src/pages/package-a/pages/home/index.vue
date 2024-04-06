<template>
  <PageMain
    fixed-header
    custom-header
    custom-header-css-style="background:#f40"
  >
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
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useNavigationBounding } from "@/hooks/common";
import PageMain from "@/components/page-main/index.vue";

// variables
const tabActiveIdx = ref(0);
const clickTabItem = (idx: number) => {
  tabActiveIdx.value = idx;
};

// hooks
useNavigationBounding({ provider: true });
onLoad(query => {
  console.log("package-a onLoad", query);
});

// functions
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
