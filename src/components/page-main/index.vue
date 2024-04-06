<template>
  <view
    :class="pageCls"
    :style="customBarVars"
  >
    <CustomNavigation
      v-if="!noHeader && customHeader"
      :custom-header-css-style="customHeaderCssStyle"
      :custom-bar-style-vars="customBarStyleVars"
      :fixed="fixedHeader"
      :title="title"
    />
    <template v-else>
      <slot name="customHeader" />
    </template>

    <view class="page-main__body">
      <slot name="default" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import CustomNavigation from "@/components/custom-navigation/index.vue";
import { CUSTOM_NAVIGATION_VARS_KAY } from "@/constants/vue-provider-keys";
import { Logger } from "@/utils";
import { computed, inject, type PropType, type Ref } from "vue";

const props = defineProps({
  customBarStyleVars: {
    type: Object as PropType<Record<string, string>>,
    default: null,
  },
  customHeaderCssStyle: {
    type: String,
    default: "",
  },
  /**
   * 是否固定头部
   * 需要设置 navigationStyle 为 custom
   */
  fixedHeader: {
    type: Boolean,
    default: false,
  },
  /**
   * 使用自定义头部
   * 需要设置 navigationStyle 为 custom
   */
  customHeader: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否隐藏头部，或者在页面中自定义头部
   * 需要设置 navigationStyle 为 custom
   */
  noHeader: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "我是标题",
  },
  class: {
    type: String,
    default: "",
  },
});

const customBarVars = inject<Ref<Record<string, string>> | null>(CUSTOM_NAVIGATION_VARS_KAY, null);

if (props.customHeader && !customBarVars?.value) {
  Logger.warn(
    "【Page-Main-Component】: required provide CUSTOM_NAVIGATION_VARS_KAY, please use NavigationBounding hooks with provider!"
  );
}

const pageCls = computed(() => ({
  "page-main": true,
  "page-main--fixed-header": props.fixedHeader && props.customHeader && !props.noHeader,
  [props.class]: true,
}));
</script>

<style lang="scss" scoped>
.page-main {
  box-sizing: border-box;

  &--fixed-header {
    padding-top: var(--custom-bar-height);
  }
}

// 内容区
.page-main__body {
  padding: 16rpx;
}
</style>
