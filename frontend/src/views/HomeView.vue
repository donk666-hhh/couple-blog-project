<template>
  <div class="home-container cream-theme">

    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

    <div v-if="!isCoupled" class="solo-mode-container animate-fade-in">
      <header class="solo-header">
        <h1>Welcome, <span class="highlight-text">{{ user.nickname }}</span> 👋</h1>
        <p class="subtitle">开启你们的专属空间，只差最后一步啦！</p>
      </header>

      <div class="bind-card">
        <div class="ticket-stub">
          <div class="stub-content">
            <span class="ticket-label">Your Invite Code</span>
            <h2 class="invite-code" @click="copyCode">{{ user.inviteCode }} <el-icon><CopyDocument /></el-icon></h2>
            <p class="ticket-tip">点击复制，发给 Ta 💖</p>
          </div>
        </div>

        <div class="ticket-main">
          <h3>Connect with Partner</h3>
          <div class="input-area">
            <el-input
                v-model="partnerCode"
                placeholder="输入 Ta 的邀请码"
                class="custom-input"
                prefix-icon="Lock"
            />
            <el-button class="bind-btn" round :loading="loading" @click="handleBind">
              Connect 🚀
            </el-button>
          </div>
        </div>
      </div>

      <div class="solo-grid">
        <div class="solo-card">
          <span class="icon">📝</span>
          <h4>Personal Diary</h4>
          <p>写点什么给自己看吧...</p>
        </div>
        <div class="solo-card">
          <span class="icon">📸</span>
          <h4>My Gallery</h4>
          <p>整理一下个人相册</p>
        </div>
      </div>
    </div>


    <div v-else class="couple-mode-container animate-fade-in">

      <header class="love-header">
        <div class="weather-widget">
          <span class="weather-icon">⛅️ 24°C</span>
          <span class="divider">~</span>
          <span class="weather-icon">🌧️ 18°C</span>
        </div>

        <div class="days-counter">
          <span class="label">Being in love for</span>
          <div class="count-box">
            <span class="num">{{ daysCount }}</span>
            <div class="heart-icon animate-beat">❤️</div>
          </div>
          <span class="label">Days</span>
        </div>

        <div class="user-avatar">
          <img :src="user.avatar" alt="User" />
        </div>
      </header>

      <main class="bento-container">
        <div class="bento-card photo-card" @click="router.push('/album')">
          <div class="polaroid-frame">
            <img src="https://images.unsplash.com/photo-1516589171835-cc4860af09d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Us" />
            <div class="photo-meta">
              <span class="date">Oct 24, 2025</span>
              <span class="location">📍 Disneyland</span>
            </div>
            <div class="pin">📍</div>
          </div>
          <div class="card-label">Daily Sweet 🍯</div>
        </div>

        <div class="bento-card note-card">
          <div class="tape"></div>
          <h3 class="note-title">To My Love:</h3>
          <p class="handwriting-font">
            记得按时吃饭哦！今晚想吃火锅吗？🍲 <br>
            代码写不出来就歇一歇，想你啦~
          </p>
          <div class="note-footer">
            <span>— By Alice</span>
            <el-button class="reply-btn" size="small" round>Reply ✏️</el-button>
          </div>
        </div>

        <div class="bento-card status-card">
          <div class="status-emoji">{{ currentStatus.emoji }}</div>
          <div class="status-text">
            <span class="label">Current Mood</span>
            <span class="value">{{ currentStatus.text }}</span>
          </div>
          <el-switch
              v-model="isHappy"
              class="status-switch"
              active-color="#FFB7B2"
              inactive-color="#B5EAD7"
              @change="toggleStatus"
          />
        </div>

        <div class="bento-card wish-card" @click="router.push('/wishlist')">
          <div class="jar-icon">🏺</div>
          <div class="wish-info">
            <span class="wish-title">Mac mini M5</span>
            <el-progress
                :percentage="65"
                :color="customColors"
                :stroke-width="10"
                striped
                striped-flow
            />
            <span class="wish-meta">¥3500 / ¥5000</span>
          </div>
        </div>
      </main>
    </div>

    <nav class="floating-dock">
      <div class="dock-item" @click="router.push('/home')" title="Home">
        <span class="dock-icon">🏠</span>
      </div>
      <div v-if="isCoupled" class="dock-item" @click="router.push('/timeline')" title="Timeline">
        <span class="dock-icon">📅</span>
      </div>

      <div class="dock-item dock-add" @click="openPublish" title="New">
        <span class="dock-icon-plus">+</span>
      </div>

      <div class="dock-item" @click="router.push('/album')" title="Gallery">
        <span class="dock-icon">📷</span>
      </div>
      <div class="dock-item" @click="router.push('/profile')" title="Profile">
        <span class="dock-icon">⚙️</span>
      </div>
    </nav>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CopyDocument, Lock } from '@element-plus/icons-vue'

const router = useRouter()

// --- 🌟 核心状态控制 ---
// 真实开发时，这个状态应该从 Pinia 或 localStorage 获取
const isCoupled = ref(false) // 默认为 false (单身模式) 用于演示

// 模拟用户信息
const user = reactive({
  nickname: 'CoderBoy',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  inviteCode: '5201314' // 模拟邀请码
})

// --- 绑定逻辑 (Solo Mode) ---
const partnerCode = ref('')
const loading = ref(false)

const handleBind = () => {
  if (!partnerCode.value) {
    ElMessage.warning('请输入对方的邀请码哦')
    return
  }

  loading.value = true
  // 模拟 API 请求
  setTimeout(() => {
    loading.value = false
    ElMessage.success('🎉 绑定成功！欢迎来到二人世界！')
    isCoupled.value = true // 切换界面
  }, 1500)
}

const copyCode = () => {
  navigator.clipboard.writeText(user.inviteCode)
  ElMessage.success('邀请码已复制，快发给 Ta 吧！')
}


// --- 下面是原来的逻辑 (Couple Mode) ---
const startDate = new Date('2023-05-20')
const today = new Date()
const daysCount = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))

const isHappy = ref(true)
const currentStatus = reactive({ emoji: '💻', text: 'Coding...' })
const toggleStatus = (val) => {
  currentStatus.emoji = val ? '💻' : '😴'
  currentStatus.text = val ? 'Coding...' : 'Sleeping...'
}

const customColors = [
  { color: '#B5EAD7', percentage: 20 },
  { color: '#FFDAC1', percentage: 40 },
  { color: '#FFB7B2', percentage: 80 },
  { color: '#FF9AA2', percentage: 100 },
]

const openPublish = () => {
  if (!isCoupled.value) {
    ElMessage.info('可以先写点个人日记哦 (功能开发中)')
  } else {
    console.log('Open Couple Publish Modal')
  }
}
</script>

<style scoped>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

/* === 全局变量 === */
:root {
  --bg-cream: #FFFBF5;
  --primary-pink: #FF8FAB;
  --text-main: #5D5D5D;
  --shadow-soft: 0 8px 30px rgba(0,0,0,0.04);
}

.home-container {
  min-height: 100vh;
  background-color: #FFFBF5;
  color: #5D5D5D;
  font-family: 'Nunito', sans-serif;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 渐入动画 */
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* 背景光斑 */
.bg-blob { position: fixed; border-radius: 50%; filter: blur(90px); z-index: 0; opacity: 0.5; }
.blob-1 { width: 400px; height: 400px; background: #FFB7B2; top: -100px; left: -50px; }
.blob-2 { width: 300px; height: 300px; background: #B5EAD7; bottom: 100px; right: -50px; }
.blob-3 { width: 200px; height: 200px; background: #FFDAC1; top: 40%; left: 40%; opacity: 0.3; }


/* =========================================
   🆕 单身模式样式 (Solo Mode Styles)
   ========================================= */
.solo-header {
  text-align: center; margin-top: 60px; margin-bottom: 40px; position: relative; z-index: 10;
}
.solo-header h1 { font-size: 32px; font-weight: 800; color: #333; margin-bottom: 10px; }
.highlight-text { color: var(--primary-pink); }
.subtitle { color: #999; font-size: 16px; }

/* 绑定邀请卡 (车票风格) */
.bind-card {
  max-width: 600px; margin: 0 auto 50px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  display: flex; overflow: hidden; position: relative; z-index: 10;
  transition: transform 0.3s;
}
.bind-card:hover { transform: translateY(-5px); }

/* 左侧存根 */
.ticket-stub {
  background: #FF8FAB; color: #fff;
  width: 200px; padding: 30px 20px;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  position: relative;
  border-right: 2px dashed rgba(255,255,255,0.6); /* 虚线分割 */
}
/* 票据半圆缺口 */
.ticket-stub::before, .ticket-stub::after {
  content: ''; position: absolute; right: -10px; width: 20px; height: 20px;
  background: #FFFBF5; border-radius: 50%;
}
.ticket-stub::before { top: -10px; }
.ticket-stub::after { bottom: -10px; }

.ticket-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; }
.invite-code { font-size: 32px; font-weight: 900; margin: 10px 0; cursor: pointer; display: flex; align-items: center; gap: 5px; }
.ticket-tip { font-size: 12px; opacity: 0.8; }

/* 右侧输入区 */
.ticket-main {
  flex: 1; padding: 40px; background: rgba(255,255,255,0.9);
}
.ticket-main h3 { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #333; }
.input-area { display: flex; gap: 15px; }
.bind-btn { background: #333; color: #fff; border: none; font-weight: 700; }
.bind-btn:hover { background: #000; }

/* 个人功能 Grid */
.solo-grid {
  max-width: 600px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; position: relative; z-index: 10;
}
.solo-card {
  background: rgba(255,255,255,0.6); border-radius: 20px; padding: 25px;
  text-align: center; cursor: pointer; transition: all 0.3s;
  border: 1px solid rgba(255,255,255,0.8);
}
.solo-card:hover { background: #fff; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.solo-card .icon { font-size: 30px; display: block; margin-bottom: 10px; }
.solo-card h4 { margin: 0 0 5px 0; font-weight: 700; color: #333; }
.solo-card p { margin: 0; font-size: 12px; color: #999; }


/* =========================================
   💏 情侣模式样式 (Couple Mode - 复用之前的)
   ========================================= */
.love-header {
  position: relative; z-index: 10;
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 20px; margin-bottom: 30px;
}
.weather-widget { font-size: 14px; font-weight: 700; color: #9A9A9A; background: rgba(255,255,255,0.5); padding: 8px 16px; border-radius: 20px; }
.divider { margin: 0 8px; color: #FFB7B2; }
.days-counter { text-align: center; display: flex; flex-direction: column; align-items: center; }
.label { font-size: 12px; letter-spacing: 1px; color: #9A9A9A; text-transform: uppercase; }
.count-box { display: flex; align-items: center; gap: 5px; }
.num { font-size: 48px; font-weight: 900; background: linear-gradient(45deg, #FF9AA2, #FFB7B2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
.heart-icon { font-size: 24px; margin-top: 10px; }
.animate-beat { animation: heartbeatJelly 1.6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite; }
@keyframes heartbeatJelly { 0% { transform: scale(1); } 15% { transform: scale(1.25); } 30% { transform: scale(0.95); } 45% { transform: scale(1.1); } 60% { transform: scale(1); } 100% { transform: scale(1); } }
.user-avatar img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid #fff; box-shadow: var(--shadow-soft); }

.bento-container { position: relative; z-index: 10; max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr 1fr; grid-template-rows: 240px 180px; gap: 24px; padding-bottom: 100px; }
.bento-card { background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); overflow: hidden; position: relative; }
.bento-card:hover { transform: translateY(-5px); box-shadow: 0 15px 50px rgba(0,0,0,0.08); background: rgba(255, 255, 255, 0.85); }

.photo-card { grid-row: span 2; display: flex; flex-direction: column; align-items: center; justify-content: center; background: transparent !important; box-shadow: none !important; border: none !important; }
.polaroid-frame { background: #fff; padding: 15px 15px 50px 15px; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: rotate(-3deg); transition: transform 0.4s ease; position: relative; width: 100%; max-width: 300px; }
.photo-card:hover .polaroid-frame { transform: rotate(0deg) scale(1.02); z-index: 5; }
.polaroid-frame img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 2px; background: #eee; }
.photo-meta { position: absolute; bottom: 15px; left: 15px; right: 15px; display: flex; justify-content: space-between; font-family: 'Indie Flower', cursive; color: #555; font-size: 14px; }
.pin { position: absolute; top: -15px; left: 50%; font-size: 24px; filter: drop-shadow(2px 5px 2px rgba(0,0,0,0.2)); }
.card-label { margin-top: 20px; font-weight: 700; color: #FF8FAB; font-size: 14px; letter-spacing: 1px; }

.note-card { grid-column: span 2; background: #FFFDF0; padding: 30px; display: flex; flex-direction: column; }
.tape { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 100px; height: 25px; background: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.6); backdrop-filter: blur(5px); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.note-title { font-size: 18px; color: #D4A373; margin-bottom: 10px; font-weight: 800; }
.handwriting-font { font-family: 'Indie Flower', cursive; font-size: 20px; line-height: 1.6; color: #5D5D5D; flex: 1; }
.note-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 14px; color: #999; }
.reply-btn { background: #FFDAC1; border: none; color: #7a5c48; font-weight: 700; }
.reply-btn:hover { background: #FFCeb4; }

.status-card { padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; background: linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%); }
.status-emoji { font-size: 48px; line-height: 1; }
.status-text { text-align: center; }
.status-text .label { display: block; font-size: 10px; color: #B0C4DE; margin-bottom: 2px; }
.status-text .value { font-weight: 800; font-size: 16px; color: #5D5D5D; }
.status-switch { margin-top: 5px; }

.wish-card { padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%); cursor: pointer; }
.jar-icon { font-size: 40px; margin-bottom: 10px; }
.wish-info { width: 100%; text-align: center; }
.wish-title { font-weight: 700; font-size: 15px; display: block; margin-bottom: 8px; }
.wish-meta { font-size: 10px; color: #999; margin-top: 5px; display: block; }

.floating-dock { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(25px); padding: 10px 20px; border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 10px 40px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 15px; z-index: 100; }
.dock-item { width: 45px; height: 45px; border-radius: 50%; background: transparent; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.dock-item:hover { background: #fff; transform: translateY(-10px) scale(1.1); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.dock-add { background: #FF8FAB; color: #fff; width: 55px; height: 55px; box-shadow: 0 5px 20px rgba(255, 143, 171, 0.4); }
.dock-add:hover { background: #FF7096; transform: translateY(-10px) scale(1.1); }
.dock-icon-plus { font-size: 30px; font-weight: 300; line-height: 1; margin-top: -3px; }

/* 移动端适配 */
@media (max-width: 768px) {
  .bind-card { flex-direction: column; max-width: 90%; margin: 0 auto 30px; }
  .ticket-stub { width: 100%; border-right: none; border-bottom: 2px dashed rgba(255,255,255,0.6); box-sizing: border-box; }
  .ticket-stub::before { left: -10px; top: auto; bottom: -10px; }
  .ticket-stub::after { right: -10px; top: auto; bottom: -10px; }

  .bento-container { grid-template-columns: 1fr; grid-template-rows: auto; }
  .photo-card { grid-row: auto; margin-bottom: 20px; }
  .note-card { grid-column: span 1; }
  .num { font-size: 40px; }
  .floating-dock { bottom: 20px; padding: 8px 15px; gap: 10px; }
  .dock-item { width: 40px; height: 40px; }
  .dock-add { width: 50px; height: 50px; }
}
</style>