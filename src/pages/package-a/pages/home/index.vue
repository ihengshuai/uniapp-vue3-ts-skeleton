<template>
  <view>
    <view class="navigation">
      <view
        class="navigation__bar"
        :style="`height: ${systemStatusBarHeight}rpx`"
      ></view>
      <view
        class="navigation__body"
        :style="`height: ${miniBarHeight}rpx`"
      >
        自定义标题
      </view>
    </view>
    <CustomNavigation :custom-bar-style-vars="customBarStyleVars" />
    <view>package-a 页面...</view>
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
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useNavigationBounding } from "@/hooks/common";
import CustomNavigation from "@/components/common/custom-navigation.vue";

const tabActiveIdx = ref(0);
const clickTabItem = (idx: number) => {
  tabActiveIdx.value = idx;
};

const { systemStatusBarHeight, miniBarHeight, customBarStyleVars } = useNavigationBounding();

onLoad(query => {
  console.log("package-a onLoad", query);
});
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
