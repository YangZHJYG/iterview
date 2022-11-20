import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    // 配置路径别名
    resolve: {
        alias: {
            "@": resolve(__dirname, './src')
        }
    }
})
