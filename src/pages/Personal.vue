<script lang="ts" setup>
import Input from "@/components/common/Input.vue";
import { ref } from "vue";
import { loginData } from "@/store";
import { useRouter } from "vue-router";
const { ModifyInfor } = loginData();
const router = useRouter();
const children: any = ref(null);
const inputArr = ref([
  {
    label: "账号",
    name: "username",
    text: "请输入修改账号",
  },
  {
    label: "原密码",
    name: "oldpasswd",
    text: "原密码认证",
  },
  {
    label: "新密码",
    name: "newpasswd",
    text: "请输入新密码",
  },
]);
function changeMes() {
  ModifyInfor(children.value.inputObj);
  children.value.deleteValue();
}
</script>

<template>
  <div>
    <div  class="text-center text-2xl font-bold pt-14 pb-4">修改</div>
    <div class="w-2/3 mx-auto">
      <Input
        ref="children"
        class="mt-3 border-solid border-2 border-gray-300 rounded-3xl w-auto mx-3"
        :data="inputArr"
      ></Input>
    </div>
    <div @click="changeMes" class="w-auto mx-28 my-10">
      <van-button class="w-full" round type="primary">修改</van-button>
    </div>
    <div
      
      class="w-full"
    >
      <span
      class="float-right mr-4 text-blue-300"
       @click="
        () => {
          router.push({ path: '/login' });
        }
      ">退出应用</span>
    </div>
  </div>
</template>

<style scoped></style>
