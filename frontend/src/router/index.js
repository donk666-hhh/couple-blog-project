import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'

// 1. 引入我们的页面
import Login from '../views/Login.vue'
import Welcome from '../views/welcome.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import TimelineView from '../views/TimelineView.vue'
import NoteWallView from '../views/NoteWallView.vue'
import Roadmap from '../views/Roadmap.vue'
import Developing from '../views/Developing.vue'
import AlbumView from '../views/AlbumView.vue'
import WishlistView from '../views/WishlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }  // 标记为游客页面
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimelineView,
      meta: { requiresAuth: true }
    },
    {
      path: '/notes',
      name: 'notes',
      component: NoteWallView,
      meta: { requiresAuth: true }
    },
    {
      path: '/album',
      name: 'album',
      component: AlbumView,
      meta: { requiresAuth: true }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
      meta: { requiresAuth: true }
    },
    {
      path: '/developing',
      name: 'developing',
      component: Developing
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: Roadmap
    }
  ]
})

// 路由守卫：更宽松的认证检查
router.beforeEach((to, from, next) => {
  const token = getToken()
  const requiresAuth = to.meta?.requiresAuth
  const isGuestPage = to.meta?.guest

  // 已登录用户访问登录页，重定向到首页
  if (isGuestPage && token) {
    return next('/home')
  }

  // 需要认证但没有token - 允许访问，让组件自己处理认证错误
  // 这样可以提供更好的用户体验，不会一报错就踢用户出去
  if (requiresAuth && !token) {
    console.warn(`访问 ${to.path} 需要登录，但未检测到token`)
    // 不自动跳转，让用户继续访问
    // 如果API调用失败，会在组件层面提示用户
  }

  next()
})

export default router
