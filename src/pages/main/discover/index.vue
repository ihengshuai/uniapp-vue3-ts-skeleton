<template>
  <PageMain>
    <text>发现</text>
    <u-calendar
      :show="show"
      @close="toggleShow"
      @confirm="toggleShow"
    />
    <u-button @click="toggleShow">打开日历</u-button>
  </PageMain>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PageMain from "@/components/page-main/index.vue";

const show = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};
</script>
