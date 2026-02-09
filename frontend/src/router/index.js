import { createRouter, createWebHistory } from 'vue-router'

// 1. 引入我们的两个页面
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 根路径 (http://localhost:5173/)
      // 现在默认显示 Welcome (门户首页)
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      // 登录路径 (http://localhost:5173/login)
      // 用户点了“登录”按钮才会跳到这里
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router