<template>
    <div class="AntishakeThrottle">
        <button @click="antishake">防抖</button>
        <button @click="throttle">节流</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"

// 定义防抖类(防抖是将多次执行变为最后一次执行)
class Antishake {
    public use = (
        func: Function,
        delay: number,
        immediate: boolean = false
    ):Function => {
        let timer: NodeJS.Timeout
        return (...args: any) => {
            // immediate 是否默认执行一次(第一次不延迟)
            if(immediate){
                func.apply(this, args)
                immediate = false
                return
            }
            // 第二次点击用于清除上一次的定时器
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}
let count = ref(0)
const request = (params: any) => {
    console.log('参数', params);
    console.log('count', ++count.value);
}
const debouncedUse:Function = new Antishake().use(request, 1000)
// 点击防抖
const antishake = () => {
    debouncedUse(123)
}

// 节流（多次都会执行，只是间隔一段时间再执行）





const throttle = () => {
    console.log(22222);
}

</script>

<style scoped lang="less">
.AntishakeThrottle {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    button {
        width: 150px;
        height: 50px;
    }
}
</style>