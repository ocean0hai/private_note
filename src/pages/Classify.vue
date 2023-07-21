<script lang="ts" setup>
import DialogAdd from "@/components/classify/DialogAdd.vue";
import { noteData } from "@/store";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
const router = useRouter();
const { classifyArr, deleteClassify } = noteData();
const manage = ref(false);
const Arr = computed(() => {
  return [
    ...classifyArr.filter((item) => item.uid === localStorage.getItem("uid")),
  ];
});
function filterData(str: string) {
  if (manage.value) return;
  router.push({ path: "managenote", query: { str } });
}
</script>

<template>
  <div class="">
    <van-nav-bar title="分类">
      <template #right>
        <span @click="manage = !manage">{{
          manage ? "取消" : "标签管理"
        }}</span>
      </template>
    </van-nav-bar>
    <div class="grid grid-cols-3">
      <div
        class="text-center border-solid text-white border-2 border-blue-200 text-lg mx-1 mt-2 py-2"
        v-for="(item, i) in Arr"
        :key="i"
        :style="{ background: item.class }"
        @click="filterData(item.text)"
      >
        <!-- :style="{fontSize:`${bindCss['textsize']}px`,color:`${arrBg[bindCss['textcolor']]}`}"  -->
        <span>{{ item.text }}</span>
        <span class="ml-3" v-if="manage">
          <van-icon @click="deleteClassify(item.id)" name="delete-o" />
        </span>
      </div>
    </div>
  </div>
  <DialogAdd></DialogAdd>
</template>
<style scoped></style>
