<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { noteData } from "@/store";
const route = useRoute();
const router = useRouter();
const { data, classifyArr, editData } = noteData();
const edit = ref(false);
const renderData = computed(() => {
  const Arr = data.filter(item => item.title === route.query.str);
  return Arr[0];
});

function onClickLeft() {
  router.go(-1);
}
function editCheck() {
  edit.value = !edit.value;
}
function saveNote() {
  const da = new Date();
  renderData.value["time"] = da.getMonth() + 1 + "-" + da.getDate();
  editData(renderData.value);
  edit.value = false;
}
</script>

<template>
  <div v-if="renderData !=={}">
    <van-nav-bar
      title="视图"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <span @click="editCheck">{{ !edit ? "编辑" : "取消" }}</span>
      </template>
    </van-nav-bar>
    <div v-if="!edit" class="w-auto mx-2">
      <div class="w-full text-center text-xl font-bold">
        {{ renderData.title }}
      </div>
      <div class="text-center text-gray-400">
        分类：<span class="mr-3">{{ renderData.classify }}</span> 时间：<span>{{
          renderData.time
        }}</span>
      </div>
      <div class="whitespace-pre-wrap">
        {{ renderData.note }}
      </div>
    </div>
    <div v-else>
      <div class="mx-3 my-3 flex">
        标题：<input
          class="w-2/5 mr-3"
          v-model="renderData['title']"
          type="text"
        />
        分类：
        <select class="ml-1" v-model="renderData['classify']">
          <option v-for="(item, i) in classifyArr" :value="item.text" :key="i">
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="w-auto mx-3">
        <textarea
          class="w-full h-full"
          v-model="renderData['note']"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div
        @click="saveNote"
        class="absolute rounded-full bg-blue-400 px-1 py-2 text-white text-xl top-[85%] left-[80%]"
      >
        保存
      </div>
    </div>
  </div>
</template>

<style scoped></style>
