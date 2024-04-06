<template>
  <view
    :class="navigationCls"
    :style="navigationStyle"
  >
    <!-- #ifndef H5 -->
    <view class="navigation__bar"></view>
    <!-- #endif -->
    <view class="navigation__body">
      <view class="navigation__left">
        <view class="navigation__back">
          <u-icon
            name="arrow-left"
            @click="goPreviouPage"
          ></u-icon>
        </view>
      </view>
      <view class="navigation__title">
        <text>{{ props.title }}</text>
      </view>
      <view class="navigation__right" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Ref, PropType } from "vue";
import { inject } from "vue";
import { CUSTOM_NAVIGATION_VARS_KAY } from "@/constants/vue-provider-keys";
import { computed } from "vue";

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
});

const navigationCls = computed(() => {
  return {
    navigation: true,
    "navigation--fixed": props.fixed,
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

function goPreviouPage() {
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
// 最外部容器
.navigation {
  background: #fff;
  box-sizing: border-box;
  padding: 0 16rpx;
  border-bottom: 1px solid #efefef;

  // 导航固定
  &--fixed {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
}
// 状态栏
.navigation__bar {
  width: 100%;
  height: var(--system-status-bar-height, 40rpx);
}
// 导航栏
.navigation__body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--mini-bar-height, 40rpx);
}
.navigation__title {
  padding: 0 16rpx;
  flex: 1;
  text-align: center;
}
.navigation__left {
  width: 150rpx;
}
.navigation__right {
  width: 150rpx;
}
</style>
