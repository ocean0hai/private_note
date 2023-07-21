<script lang="ts" setup>
import { noteData } from "@/store";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const manage = ref(true);
const { str } = route.query;
const { data, deleteData } = noteData();
console.log(data);

const renderData = computed(() => {
  const Arr = data.filter(
    (item: any) =>
      item.classify === str && item.uid === localStorage.getItem("uid")
  );
  return Arr;
});
function goView(str: string) {
  console.log("----", manage);
  if (manage.value) return;
  router.push({ path: "/noteview", query: { str } });
}
</script>

<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
      title="管理"
    >
      <template #right>
        <span @click="manage = !manage">{{
          manage ? "取消" : "日记管理"
        }}</span>
      </template>
    </van-nav-bar>
    <div>
      <div
        class="mt-2 drop-shadow-xl"
        @click="goView(item.title)"
        v-for="(item, i) in renderData"
        :key="i"
      >
        <div class="">
          <span class="text-xl font-bold ml-6">{{ item.title }}</span>
          <span class="ml-16 text-gray-300">{{ item.time }}</span>
          <span
            @click="deleteData(item.title)"
            v-if="manage"
            class="float-right pr-4 text-2xl"
            ><van-icon name="delete-o"
          /></span>
          <div class="truncate w-auto mt-3 mx-2">{{ item.note }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
