<template>
  <PageMain
    fixed-header
    custom-header
    title="自定义头部"
    custom-header-css-style="background-color: salmon;"
    :loading="loading"
  >
    <button>我是按钮</button>
    <view
      v-for="(item, index) in 100"
      :key="index"
    >
      测试自定义头部
    </view>
  </PageMain>
</template>

<script lang="ts" setup>
import { onReachBottom } from "@dcloudio/uni-app";
import { ref } from "vue";

import PageMain from "@/components/page-main/index.vue";
import { useNavigationBounding } from "@/hooks/common";
import { sleep } from "@/utils";

const loading = ref(false);

useNavigationBounding({ provider: true });

onReachBottom(async () => {
  if (loading.value) return;
  loading.value = true;
  await sleep(1000);
  loading.value = false;
});
</script>
