<template>
    <button @click="deepCopy1">深拷贝</button>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity"

interface personData {
    name: string,
    age: number,
    charact: number
}

const copyData:personData = reactive({
    name: 'zy',
    age: 26,
    charact: Infinity
})

// 第一版深拷贝
    // 问题: 1、时间对象变成字符串   
    // 2、RegExp、Error对象，会变成空对象{}
    // 3、function、undefined。会被丢失
    // 4、number类型中的NaN、Infinity、-Infinity，会变成null
    // 5、对象中循环引用也无法实现
const deepCopy1 = () => {
    console.log('没copy之前', copyData);
    let copyData1 = JSON.parse(JSON.stringify(copyData))
    console.log('copy之后', copyData1);
}

// 之后就逐渐完善的实现一个深copy
// 
const deepCopy2 = () => {
    console.log('没copy之前', copyData);
    let copyData1 = JSON.parse(JSON.stringify(copyData))
    console.log('copy之后', copyData1);
}



</script>

<style scoped lang="less">
.deepcopy_button{
    button {
        width: 150px;
        height: 50px;
    }
}
</style>