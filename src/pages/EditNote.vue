<script lang="ts" setup>
import { useRouter } from "vue-router";
import { noteData } from "@/store";
import { ref, computed } from "vue";
import { objType } from "@/type";
const store = noteData();
const { classifyArr, addData } = store;
const router = useRouter();
const Arrs = computed(() => {
  const Arr = [
    ...classifyArr.filter((item) => item.uid === localStorage.getItem("uid")),
  ];
  noteitem.value.classify = Arr[0].text;
  return Arr;
});
const noteitem = ref<objType>({
  classify: "",
  note: "",
  title: "",
});

function onClickLeft() {
  router.go(-1);
}

function saveNote() {
  const da = new Date();
  noteitem.value["uid"] = "" + localStorage.getItem("uid");
  noteitem.value["time"] = "" + da.getMonth() + 1 + "-" + da.getDate();
  addData(noteitem.value);
}
</script>

<template>
  <div>
    <van-nav-bar
      title="增加"
      left-text="返回"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="saveNote"
    />
    <div class="mx-3 my-3 flex">
      标题：<input class="w-2/5 mr-3" v-model="noteitem['title']" type="text" />
      分类：
      <select class="ml-1" v-model="noteitem['classify']">
        <option v-for="(item, i) in Arrs" :value="item.text" :key="i">
          {{ item.text }}
        </option>
      </select>
    </div>
    <div class="w-auto mx-2">
      <textarea
        class="w-full h-full"
        v-model="noteitem['note']"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>
  </div>
</template>

<style scoped></style>
