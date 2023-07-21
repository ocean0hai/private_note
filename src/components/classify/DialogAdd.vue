<script setup lang="ts" >
import { ref } from "vue";
import { noteData } from "@/store";
import { objType } from "@/type";
import { showToast } from "vant";
const { addClassObj } = noteData();
const show = ref(false);

const colorArr = ref([
  {
    bg: "red",
    text: "红色",
  },
  {
    bg: "blue",
    text: "蓝色",
  },
  {
    bg: "yellow",
    text: "黄色",
  },
  {
    bg: "pink",
    text: "粉色",
  },
  {
    bg: "green",
    text: "绿色",
  },
  {
    bg: "black",
    text: "黑色",
  },
]);
const classObj = ref<objType>({
  text: "",
  class: "blue",
});
function addClass() {
  let add = false;
  Object.keys(classObj.value).map((item) => {
    if (classObj.value[item] === "") {
      add = true;
      showToast("输入不能为空！！");
    }
  });
  if(!add){
    if( addClassObj(classObj.value) ){
      show.value=false
    }
  }

}
</script>

<template>
  <div>
    <div
      @click="show = true"
      class="rounded-full bg-blue-400 text-white py-4 px-6 top-[80%] left-[80%] text-2xl absolute"
    >
      +
    </div>
    <van-dialog v-model:show="show" :showConfirmButton="false">
      <van-nav-bar title="增加分类">
        <template #right>
          <van-icon @click="show = false" name="cross" size="18" />
        </template>
      </van-nav-bar>
      <!-- 可以使用 CellGroup 作为容器 -->
      <div>
        <span class="px-7 mr-8">分类</span>
        <input
          type="text"
          v-model="classObj['text']"
          class="border-none"
          placeholder="请输入分类名称"
        />
      </div>
      <div class="my-4">
        <span class="px-4 mr-8">选择颜色</span>
        <select name="" v-model="classObj['class']" id="">
          <option v-for="(item, i) in colorArr" :key="i" :value="item.bg">
            {{ item.text }}
          </option>
        </select>
      </div>
      <div @click="addClass" class="w-auto mx-20 mt-5 my-3">
        <van-button class="w-full" type="primary" round>确定</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<style scoped></style>
