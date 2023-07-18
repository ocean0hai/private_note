<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import NoteBox from "@/components/note/NoteBox.vue";
import { noteData } from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();
const { data, history, deleteHistory, addHistory } = noteData();

const searchValue = ref("");
const showHistory = ref(false);
const renderData = ref<Array<any>>([]);
const searchArr = ref([]);
const children = ref(null);
onMounted(() => {
  searchArr.value = history;
  children.value.focus();
});

watch([searchValue], () => {
  searchArr.value = history.filter((item) =>
    new RegExp(searchValue.value).test(item)
  );
});

function onFocus() {
  renderData.value = history;
  showHistory.value = true;
}
function onBlur() {
  console.log(searchValue.value);
  getRender(searchValue.value);
  if (renderData.value.length) {
    addHistory(searchValue.value);
  }
  children.value.blur();
  showHistory.value = false;
}
function clickHistory(str: string) {
  searchValue.value = str;
  getRender(str);
  showHistory.value = false;
}
function getRender(str: string) {
  renderData.value = data.filter(
    (item) =>
      new RegExp(str).test(item.title) &&
      item.uid === localStorage.getItem("uid")
  );
}
function onClickLeft() {
  router.push({ path: "note" });
}
</script>

<template>
  <div>
    <van-nav-bar
      title="搜索"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="w-auto mx-12 flex text-[15px] py-2">
      <div class="w-auto bg-gray-100 py-1 pl-2">
        <van-icon name="search" />
        <input
          v-model="searchValue"
          ref="children"
          class="border-none bg-gray-100 mx-1"
          @focus="onFocus"
          @keyup.enter="onBlur"
          placeholder="请输入搜索关键词"
        />
      </div>
      <span @click="onBlur" class="pl-2 py-1">搜索</span>
    </div>
    <!-- 历史记录 -->
    <div v-if="showHistory" class="mx-8 w-auto">
      <div class="flex">
        <div class="w-2/3 text-center">历史记录</div>
        <div @click="deleteHistory(-2)" class="text-center w-1/3">
          <van-icon name="delete-o" />全部删除
        </div>
      </div>
      <div class="flex py-1 mt-1" v-for="(item, i) in searchArr" :key="i">
        <div class="w-5/6 text-center" @click="clickHistory(item)">
          {{ item }}
        </div>
        <div class="w-1/6 text-center bg-slate-100" @click="deleteHistory(i)">
          x
        </div>
      </div>
    </div>
    <!-- 列表渲染 -->
    <div class="overflow-y-scroll h-[33rem]" v-else>
      <NoteBox v-for="(item, i) in renderData" :dataitem="item" :key="i">
      </NoteBox>
    </div>
    <!-- 显示空 -->
  </div>
</template>

<style scoped></style>
