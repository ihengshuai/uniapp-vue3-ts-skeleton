import { onLoad } from "@dcloudio/uni-app";
import { computed, provide, ref } from "vue";
import { CUSTOM_NAVIGATION_VARS_KAY } from "@/constants/vue-provider-keys";

const placeholderBarHeight = 40;

interface INavigationBounding {
  provider?: boolean;
}

/**
 * 动态计算导航栏高度
 * 主要在自定义导航栏时使用
 */
export function useNavigationBounding(opts?: INavigationBounding) {
  const systemStatusBarHeight = ref(placeholderBarHeight);
  const miniBarHeight = ref(placeholderBarHeight);
  const customBarHeight = computed(() => systemStatusBarHeight.value + miniBarHeight.value);
  const customBarStyleVars = computed(() => ({
    "--system-status-bar-height": `${systemStatusBarHeight.value}rpx`,
    "--mini-bar-height": `${miniBarHeight.value}rpx`,
    "--custom-bar-height": `${customBarHeight.value}rpx`,
  }));

  // #ifndef H5
  onLoad(() => {
    uni.getSystemInfo({
      success: res => {
        const { statusBarHeight = placeholderBarHeight } = res;
        const { top, height } = uni.getMenuButtonBoundingClientRect();
        systemStatusBarHeight.value = statusBarHeight * 2;
        miniBarHeight.value = ((top - statusBarHeight) * 2 + height) * 2;
      },
    });
  });
  // #endif

  if (opts?.provider) {
    provide(CUSTOM_NAVIGATION_VARS_KAY, customBarStyleVars);
  }

  return {
    systemStatusBarHeight,
    miniBarHeight,
    customBarHeight,
    customBarStyleVars,
  };
}
