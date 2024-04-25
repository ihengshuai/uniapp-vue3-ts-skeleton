<template>
  <view
    :class="navigationCls"
    :style="navigationStyle"
  >
    <!-- #ifndef H5 -->
    <view class="layout__navigation__bar"></view>
    <!-- #endif -->
    <view class="layout__navigation__body">
      <view class="layout__navigation__left">
        <view
          v-if="showHeaderLeftMenu && !!homeUrl"
          class="layout__navigation__back"
        >
          <u-icon
            :name="isTopStackPage ? 'home' : 'arrow-left'"
            class="layout__navigation__back__menu"
            @click="() => clickNavigationLeftMenu()"
          />
        </view>
      </view>
      <view class="layout__navigation__title">
        <text>{{ title }}</text>
      </view>
      <view class="layout__navigation__right" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Ref, PropType } from "vue";
import { inject } from "vue";
import { computed } from "vue";
import { ref } from "vue";

import { useConfig } from "@/config";
import { CUSTOM_NAVIGATION_VARS_KAY } from "@/constants/vue-provider-keys";
const { __isH5__ } = useConfig();

const props = defineProps({
  customBarStyleVars: {
    type: Object as PropType<Record<string, string>>,
    default: null,
  },
  customHeaderCssStyle: {
    type: String,
    default: "",
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "标题",
  },
  homeUrl: {
    type: String,
    default: null,
  },
  showHeaderLeftMenu: {
    type: Boolean,
    default: true,
  },
});

const isTopStackPage = ref(getCurrentPages().length === 1);
const navigationCls = computed(() => {
  return {
    // eslint-disable-next-line camelcase
    layout__navigation: true,
    "layout__navigation--fixed": props.fixed,
    h5: __isH5__,
  };
});
const customBarVars = inject<Ref<Record<string, string>> | null>(CUSTOM_NAVIGATION_VARS_KAY, null);

const navigationStyle = computed(() => {
  const joinVars2Str = Object.keys(props.customBarStyleVars || customBarVars?.value).reduce((acc, key) => {
    acc += `${key}: ${props.customBarStyleVars?.[key] || customBarVars?.value[key]};`;
    return acc;
  }, `${props.customHeaderCssStyle};`);
  return joinVars2Str;
});

function clickNavigationLeftMenu() {
  if (isTopStackPage.value) {
    props.homeUrl &&
      uni.reLaunch({
        url: props.homeUrl,
      });
  } else {
    uni.navigateBack();
  }
}
</script>

<style lang="scss" scoped>
// 最外部容器
.layout__navigation {
  background: #fff;
  box-sizing: border-box;
  padding: 0 20rpx;
  // border-bottom: 1px solid #efefef;

  // 导航固定
  &--fixed {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  // 顶部左侧菜单
  &__back {
    font-size: 32rpx;

    &__menu {
      // width: 40rpx;
      font-size: 38rpx;
      cursor: pointer;
    }
  }

  // h5平台
  &.h5 {
    padding: 12rpx 20rpx;
  }
}
// 状态栏
.layout__navigation__bar {
  width: 100%;
  height: var(--system-status-bar-height, 40rpx);
}
// 导航栏
.layout__navigation__body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--mini-bar-height, 40rpx);
}
.layout__navigation__title {
  padding: 0 16rpx;
  flex: 1;
  text-align: center;
}
.layout__navigation__left {
  width: 150rpx;
}
.layout__navigation__right {
  width: 150rpx;
}
</style>
