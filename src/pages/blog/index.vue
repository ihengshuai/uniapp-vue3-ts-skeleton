<template>
  <web-view
    :src="websiteURL"
    @load="onWebviewLoaded"
  ></web-view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const websiteURL = ref("https://blog.usword.cn");

function onWebviewLoaded() {
  console.log("onWebviewLoaded...");
}
</script>
