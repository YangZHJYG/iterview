<template>
    <div class="every-content">
        <div class="content">
            <DeepCopy />
        </div>
        <div class="content">
            <AntiShakeAndThrottle />
        </div>
    </div>
</template>

<script setup lang="ts">
import DeepCopy from '@/components/deepCopy.vue'
import AntiShakeAndThrottle from '@/components/AntiShakeAndThrottle.vue'

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