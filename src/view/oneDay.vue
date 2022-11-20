<template>
    <div class="every-content">
        <div class="content">
            <DeepCopy></DeepCopy>
        </div>
        <div class="content">
            <button>深拷贝</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import DeepCopy from '@/components/deepCopy.vue'



</script>

<style scoped lang="less">
.every-content {
    display: flex;
    .content {
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        font-size: 20px;
        background-color: antiquewhite;
        margin: 0px 10px 10px 0px;
    }
}
</style>