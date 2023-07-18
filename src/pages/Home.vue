<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const menu = ref([
  {
    label: "笔记",
    icon: "notes-o",
    link: "note"
  },
  {
    label: "分类",
    icon: "apps-o",
    link: "classify"
  },
  {
    label: "我的",
    icon: "contact",
    link: "personal"
  },
])
const changeColor = ref('')
function onChange() {

}
function goTo(str: string) {
  router.push({ path: str })
}
</script>

<template>
  <div class="">
    <router-view></router-view>
    <van-tabbar v-model="changeColor" @change="onChange">
      <van-tabbar-item v-for="(item, index) in menu" :key="index" @click="goTo(item.link)" :icon="item.icon">{{ item.label
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped ></style>