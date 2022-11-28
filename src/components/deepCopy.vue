<template>
    <button @click="deepCopy4">深拷贝</button>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity"

interface personData {
    name?: string,
    age?: number,
    charact?: object,
    school?: Array<string>,
    run?:Function
}

const copyData:personData = reactive({
    name: 'xm',
    age: 18
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
    // 针对多层对象: 1、基本数据直接返回。 2、引用类型，创建新对象遍历需要克隆的对象。
    // 问题：1、没考虑循环引用，当循环引用会直接死循环，导致栈内存溢出
    const deepCopy2 = () => {
        copyData.charact = {
            person: {
                height: 181
            }
        }
        copyData.school = ['1', '2']
        console.log('没copy之前', copyData);
        let copyData1 = cloneCopyEvent1(copyData)
        console.log('copy之后', copyData1);
    }
    const cloneCopyEvent1 = (copyData: personData) => {
        if(typeof(copyData) === 'object'){
            // 考虑对象和数组
            let cloneCopy:object =  Array.isArray(copyData) ? reactive([]) :  reactive({})
            for(let key in copyData){
                (cloneCopy as any)[key] = cloneCopyEvent1((copyData as any)[key])
            }
            return cloneCopy
        }else{
            return copyData
        }
    }

    // 考虑循环引用
    // 额外开辟存储空间
    const deepCopy3 = () => {
        copyData.charact = {
            copyData: copyData
        }
        console.log('没copy之前', copyData);
        let copyData1 = cloneCopyEvent2(copyData)
        console.log('copy之后', copyData1);
    }
    // 因为健名是对象，并且用强引用，只有用obj = null才能内存回收，所以用弱引用。（这点最好查一下资料，深入了解）
    const cloneCopyEvent2 = (copyData: personData, map = new WeakMap()) => {
        if(typeof(copyData) === 'object'){
            let cloneCopy:object =  Array.isArray(copyData) ? reactive([]) :  reactive({})
            // 判断当前对象中是否含有循环引用对象
            if(map.get(copyData)){
                return map.get(copyData)
            }
            map.set(copyData, cloneCopy)
            for(let key in copyData){
                (cloneCopy as any)[key] = cloneCopyEvent2((copyData as any)[key], map)
            }
            return cloneCopy
        }else{
            return copyData
        }
    }

    // 其他数据类型
    // 上面只考虑了object和array两种引用类型，没有考虑其它引用类型，也没有考虑可遍历和不可遍历类型
        // 列出所有数据类型
        // (1)可继续遍历的数据类型
            const mapTag = '[object Map]';
            const setTag = '[object Set]';
            const arrayTag = '[object Array]';
            const objectTag = '[object Object]';
            const argsTag = '[object Arguments]'

        // (2)不可继续遍历的数据类型
            const boolTag = '[object Boolean]';
            const dateTag = '[object Date]';
            const errorTag = '[object Error]';
            const numberTag = '[object Number]';
            const regexpTag = '[object RegExp]';
            const stringTag = '[object String]';
            const symbolTag = '[object Symbol]';
        // 可继续遍历的所有数据类型
        const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

    const deepCopy4 = () => {
        copyData.run = () => {
            console.log('跑步')
        }
        console.log('没copy之前', copyData);
        cloneCopyEvent3(copyData)
        let copyData1 = cloneCopyEvent3(copyData)
        console.log('copy之后', copyData1);
    }

    const cloneCopyEvent3 = (copyData: any, map = new WeakMap()) => {
        // 首先判断数据类型是否引用类型
        if(!isObject(copyData)){
            // 基本类型直接返回
            return copyData
        }

        // 获取细致数据类型
        const type = getType(copyData)

        // 根据不同数据类型进行初始化为空
        let cloneTarget: any
        if(deepTag.includes(type)){
            // 初始化可继续遍历的类型，但是要继承父类的方法
            cloneTarget = getInit(copyData)
        }else{
            return cloneOtherType(copyData, type)
        }

        // 处理循环引用
        if(map.get(copyData)){
            return map.get(copyData)
        }
        map.set(copyData, cloneTarget)

        // 处理map和set
        if(type === setTag){
            copyData.forEach((element: any) => {
                cloneTarget.add(cloneCopyEvent3(element))
            });
            return cloneTarget
        }
        if(type === mapTag){
            copyData.forEach((element: any, key: number) => {
                cloneTarget.set(key, cloneCopyEvent3(element))
            });
            return cloneTarget
        }
        
        // 处理对象和数组
        const keys:any = type === arrayTag ? undefined : Object.keys(copyData)
        forEach(keys | copyData, (value: any, key: any) => {
            if(keys){
                key = value
            }
            cloneTarget[key] = cloneCopyEvent3(copyData[key], map)
        })
        return cloneTarget
    }

    // 判断数据类型是否引用类型
    const isObject = (target: any) => {
        const type = typeof target
        return target !== null && (type === 'object' || type === 'function')
    }

    // 获取细致数据类型
    //（toString是Object原型上的某个方法，检测对象类型，所有的引用类型都有这个函数，只是在引用类型中某些数据类型对其进行了污染）
    const getType = (target: any) => {
        return Object.prototype.toString.call(target)
    }

    // 初始化可继续遍历的类型，但是要继承Object.prototype原型链上的属性或者方法
    const getInit = (target: any) => {
        return Object.create(target.__proto__)
    }

    // 初始化不可继续遍历的类型
    const cloneOtherType = (target: any, type:string) => {
        // 获取类
        const Ctor = target.constructor
        switch(type){
            case boolTag:
            case numberTag:
            case stringTag:
            case errorTag:
            case dateTag:
                return new Ctor(target);
            case regexpTag:
                return cloneReg(target);
            case symbolTag:
                return cloneSymbol(target);
            default:
                return null;
        }
    }

    // 初始化symbol类型
    const cloneSymbol = (target: any) => {
        return Object(Symbol.prototype.valueOf.call(target));
    }
    // 初始化正则类型
    const cloneReg = (target: any) => {
        const reFlags = /\w*$/;
        const result = new target.constructor(target.source, reFlags.exec(target));
        result.lastIndex = target.lastIndex;
        return result;
    }

    // 循环遍历对象或数组
    const forEach = (array: any, iteratee: any) => {
        let index:number = -1;
        const length:number = array.length;
        while ( ++index < length ) {
            iteratee(array[index], index);
        }
        return array;
    }

</script>

<style scoped lang="less">
button {
    width: 150px;
    height: 50px;
}
</style>