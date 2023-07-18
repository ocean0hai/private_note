<script lang="ts" setup>
import { objType } from '@/type';
import { ref } from 'vue';

const props=defineProps<{
  data:Array<any>,
  class?:string
}>()
const inputObj=ref<objType>({})
function deleteValue(){
  inputObj.value={}
}
defineExpose({
  inputObj,
  deleteValue
})

</script>

<template>
  <div :class="props.class" class="flex" v-for="item in props.data" >
    <div v-if="item.label !== undefined" class="pl-4 whitespace-nowrap leading-10">{{ item.label }}</div>
    <div v-else class="text-xl pl-5 leading-10">
      <van-icon   :name="item.icon" />
    </div>
    <div v-if="item.type === undefined" class="ml-1 w-auto mr-5">
      <input
        class="border-none leading-10 w-full"
        v-model="inputObj[item.name]"
        :placeholder="item.text" />
    </div>
    <div class="w-auto leading-10 ml-3" v-else>
      {{ item.text }}
    </div>
  </div>
  <slot name="btn" :inputObj="inputObj">
    
  </slot>
</template>

<style scoped >

</style>