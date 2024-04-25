<template>
  <PageMain :loading="loading">
    <text>我的页面...</text>
    <view>ID: {{ userInfo?.id }}</view>
    <view>姓名: {{ userInfo?.name }}</view>
    <view>日期: {{ userInfo?.time }}</view>
  </PageMain>
</template>

<script lang="ts" setup>
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { ref } from "vue";

import PageMain from "@/components/page-main/index.vue";
import { fetchUserInfo } from "@/service/modules/user.service";

const userInfo = ref<{ name: string; id: number; time: string }>();
const loading = ref(false);

onLoad(() => {
  requestUserInfo();
});

onPullDownRefresh(() => {
  requestUserInfo();
});

async function requestUserInfo() {
  try {
    loading.value = true;
    const res = await fetchUserInfo(+new Date());
    userInfo.value = res;
  } finally {
    loading.value = false;
    uni.stopPullDownRefresh();
  }
}
</script>
