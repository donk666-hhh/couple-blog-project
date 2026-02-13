<template>
  <div class="developing-container">
    <div class="developing-card">
      <div class="icon-wrapper">🚧</div>
      <h1>{{ featureName }}正在开发中</h1>
      <p>该功能尚未完成，敬请期待</p>
      <div class="progress-info">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: '40%' }"></div>
        </div>
        <span class="progress-text">开发进度中...</span>
      </div>
      <div class="countdown">
        <span>{{ countdown }}</span> 秒后跳转至开发计划
      </div>
      <button class="go-btn" @click="goToRoadmap">查看开发计划</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const countdown = ref(3)
let timer = null

// 根据路由获取功能名称
const featureNames = {
  '/album': '相册功能',
  '/timeline': '时光轴',
  '/wishlist': '愿望清单',
  '/publish': '发布功能',
  '/blog': '博客文章',
  '/activity': '官方活动',
  '/comments': '评论系统'
}

const featureName = ref(featureNames[route.query.feature] || '该功能')

const goToRoadmap = () => {
  router.push('/roadmap')
}

onMounted(() => {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      goToRoadmap()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.developing-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%);
  padding: 20px;
}

.developing-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon-wrapper {
  font-size: 80px;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

h1 {
  color: #333;
  font-size: 28px;
  margin: 0 0 15px 0;
}

p {
  color: #666;
  font-size: 16px;
  margin: 0 0 30px 0;
}

.progress-info {
  margin: 30px 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF8FAB 0%, #FFB088 100%);
  border-radius: 4px;
  transition: width 1s ease;
}

.progress-text {
  color: #FF8FAB;
  font-size: 14px;
}

.countdown {
  color: #999;
  font-size: 14px;
  margin: 20px 0;
}

.countdown span {
  color: #FF8FAB;
  font-weight: bold;
  font-size: 18px;
}

.go-btn {
  background: linear-gradient(135deg, #FF8FAB 0%, #FFB088 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.go-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 143, 171, 0.3);
}

@media (max-width: 768px) {
  .developing-card {
    padding: 40px 30px;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
