<script lang="ts" setup>
import router from "@/router/index.js";
import { objType } from "@/type";
const { dataitem } = defineProps<{
  dataitem: objType;
}>();
function goView() {
  router.push({ path: "/noteview", query:{str:dataitem.title}});
}
</script>

<template>
  <div @click="goView" class="w-full box">
    <div class="bg-white rounded-2xl shadow mx-1 w-auto py-2 px-4">
      <div class="font-bold my-1 text-lg w-full">{{ dataitem.title }}</div>
      <div class="text-ellipsis textbox">
        {{ dataitem.note }}
      </div>
      <div class="mt-4 text-sm text-gray-400">
        {{ dataitem.time }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  break-inside: avoid;
  margin-bottom: 10px;
}
.textbox {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
