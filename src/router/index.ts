import { createRouter, createWebHistory } from "vue-router";

let routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/HelloWorld.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router