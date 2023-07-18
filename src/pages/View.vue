<script lang="ts" setup>
import { ref, computed } from "vue";
import { noteData } from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();

const { data } = noteData();
const Arrs = computed(() => {
  return [...data.filter((item) => item.uid === localStorage.getItem("uid"))];
})

function onClickLeft() {
  router.push({ path: "/home/note" })
}
</script>

<template>
  <van-nav-bar
    title="视图"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="overflow-y-auto h-[89vh] py-3">
    <div
      class="my-2 border-solid border-1 shadow-md border-gray-200 rounded-2xl py-3"
      v-for="(item, i) in Arrs"
      :key="i"
    >
      <div class="text-center text-lg font-bold">{{ item.title }}</div>
      <div class="text-center text-gray-400">
        <span>时间：{{ item.time }}</span>
        <span class="ml-2">分类：{{ item.classify }}</span>
      </div>
      <div class="w-auto mx-4 whitespace-pre-wrap">
        &nbsp;&nbsp;&nbsp;
        {{ item.note }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
