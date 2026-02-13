<template>
  <nav class="floating-dock">
    <div class="dock-item" @click="router.push('/home')" :class="{ active: currentRoute === '/home' }">
      <span class="dock-icon">🏠</span>
    </div>

    <div v-if="isCoupled || isWelcomePage" class="dock-item" @click="router.push('/timeline')" :class="{ active: currentRoute === '/timeline' }">
      <span class="dock-icon">📅</span>
    </div>

    <!-- welcome 页面显示登录按钮，其他页面显示发布按钮 -->
    <div v-if="isWelcomePage" class="dock-item dock-add dock-login" @click="router.push('/login')">
      <span class="dock-icon-text">登录</span>
    </div>
    <div v-else class="dock-item dock-add" @click="openPublish">
      <span class="dock-icon-plus">+</span>
    </div>

    <div class="dock-item" @click="router.push('/album?feature=album')" :class="{ active: currentRoute === '/album' }">
      <span class="dock-icon">📷</span>
    </div>

    <div class="dock-item" @click="router.push('/profile')" :class="{ active: currentRoute === '/profile' }">
      <span class="dock-icon">⚙️</span>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userApi } from '@/api' // 假设你需要查是否绑定

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.path)
const isCoupled = ref(false)
const isWelcomePage = computed(() => route.path === '/')

const openPublish = () => {
  // 这里以后可以触发全局事件总线，或者简单的 console
  console.log('Open Publish Modal')
}

// 简单的检查是否绑定，决定是否显示时间轴
onMounted(async () => {
  // 在欢迎页不调用 API，避免 401 自动跳转到登录页
  const route = useRoute()
  if (route.path === '/') {
    return
  }

  try {
    // 这里为了性能，也可以直接读取 localStorage 里的缓存，如果存了的话
    // 或者简单判断一下是否有 token
    const res = await userApi.getCurrentUser()
    if (res.code === '200' && res.data.coupleId) {
      isCoupled.value = true
    }
  } catch (e) {
    // ignore
  }
})
</script>

<style scoped>
.floating-dock {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1000; /* 确保层级最高 */
}

.dock-item {
  width: 45px; height: 45px; border-radius: 50%;
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dock-item:hover {
  background: #fff; transform: translateY(-10px) scale(1.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* 激活状态 */
.dock-item.active {
  background: #fff; color: #FF8FAB;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.dock-add {
  background: #FF8FAB; color: #fff;
  width: 55px; height: 55px;
  box-shadow: 0 5px 20px rgba(255, 143, 171, 0.4);
}

.dock-login {
  width: 55px;
  height: 55px;
}

.dock-add:hover {
  background: #FF7096; transform: translateY(-10px) scale(1.1);
}

.dock-icon-plus { font-size: 30px; font-weight: 300; line-height: 1; margin-top: -3px; }

.dock-icon-text {
  font-size: 14px;
  font-weight: 600;
}
</style>