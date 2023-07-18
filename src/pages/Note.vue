<script lang="ts" setup>
import { ref, watch,computed, onMounted } from "vue";
import NoteBox from "@/components/note/NoteBox.vue";
const searchValue = ref("");
import { noteData } from "@/store";
import router from "@/router/index";
const { data, history } = noteData();
const operatData = ref([
  {
    id: "search",
    icon: "search",
    name: "搜索",
  },
  {
    id: "/view",
    icon: "exchange",
    name: "视图切换",
  },
]);
const renderData = computed(()=>{
  
  return [...data.filter((item:any)=> item.uid===localStorage.getItem('uid'))]
})
function changeRouter(str: string) {
  router.push({ path: str });
}
</script>

<template>
  <div class="bg-blue-300 text-center text-xl py-2">个人笔记</div>
  <div class="my-2 grid grid-cols-2">
    <div
      @click="changeRouter(item.id)"
      class="bg-blue-500 rounded-3xl text-center text-[2.5rem]"
      v-for="(item, i) in operatData"
      :key="i"
    >
      <van-icon class="" :name="item.icon" />
    </div>
  </div>
  <div class="overflow-y-scroll h-[528px]">
    <div class="container py-1">
      <NoteBox v-for="(item, i) in renderData" :dataitem="item" :key="i">
      </NoteBox>
    </div>
  </div>

  <!-- 增加按钮 -->
  <div
    @click="changeRouter('editnote')"
    class="rounded-full bg-blue-400 text-white py-4 px-6 top-[80%] left-[80%] text-2xl absolute"
  >
    +
  </div>
</template>

<style scoped>
.container {
  columns: 2;
  column-gap: .0625rem;
}
</style>
