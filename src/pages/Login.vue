<script lang="ts" setup>
import { ref, computed } from "vue";
import Input from "@/components/common/Input.vue";
import { loginData } from "@/store";
import {useRuouter} from 'vue-router'
import router from "@/router";
const store = loginData();
const children = ref(null);
const login = ref(true);
const inputArr = ref([
  {
    name: "username",
    text: "请输入账号(username:123)",
    icon: "user-o",
  },
  {
    name: "password",
    text: "请输入用户名(password:123)",
    icon: "lock",
  },
]);
const registerArr = ref([
  {
    name: "username",
    text: "请输入账号",
    icon: "user-o",
  },
  {
    name: "password",
    text: "请输入用户名",
    icon: "lock",
  },
]);
const renderData = computed(() => {
  if (login) {
    return inputArr.value;
  } else return registerArr.value;
});

function changeLogin() {
  const { inputObj } = children.value;
  const {userLogin,userRegister}=store
  if (login.value) {
    userLogin(inputObj) 
  }else userRegister(inputObj)
}
</script>

<template>
  <div>
    <h1 class="text-center py-10">{{ login ? "登录" : "注册" }}</h1>
    <div class="w-11/12 mx-auto bg-white rounded-2xl -mt-3 drop-shadow-lg py-5">
      <Input
        ref="children"
        class="mt-3 border-solid border-2 border-gray-300 rounded-3xl w-auto mx-10"
        :data="renderData"
      ></Input>
      <div @click="changeLogin" class="w-auto mx-20 py-10">
        <van-button round class="w-full" type="primary">{{
          login ? "登录" : "注册"
        }}</van-button>
      </div>
      <div class="h-3">
        <span
          v-if="login"
          @click="login = false"
          class="float-right mr-3 text-blue-400"
          >注册</span
        >
        <span v-else @click="login = true" class="ml-4 text-blue-400"
          >去登录</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
