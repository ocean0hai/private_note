<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import {  ref } from "vue";
import { noteData } from "@/store";
const route = useRoute();
const router = useRouter();
const { data, classifyArr, editData } = noteData();
const edit = ref(false);

const obj=ref({...data.filter(item => item.title === route.query.str)[0]})
function onClickLeft() {
  router.go(-1);
}
function editCheck() {
  edit.value = !edit.value;
}
function saveNote() {
  editData(obj.value)
  edit.value = false;
}
</script>

<template>
  <div v-if="JSON.stringify(obj)">
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
        {{ obj.title }}
      </div>
      <div class="text-center text-gray-400">
        分类：<span class="mr-3">{{ obj.classify }}</span> 时间：<span>{{
          obj.time
        }}</span>
      </div>
      <div class="whitespace-pre-wrap">
        {{ obj.note }}
      </div>
    </div>
    <div v-else>
      <div class="mx-3 my-3 flex">
        标题：<input
          class="w-2/5 mr-3"
          v-model="obj['title']"
          type="text"
        />
        分类：
        <select class="ml-1" v-model="obj['classify']">
          <option v-for="(item, i) in classifyArr" :value="item.text" :key="i">
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="w-auto mx-3">
        <textarea
          class="w-full h-full"
          v-model="obj['note']"
          name=""
          id=""
          cols=""
          rows="30"
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
