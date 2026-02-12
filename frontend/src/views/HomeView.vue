<template>
  <div class="home-container cream-theme">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

    <div v-if="!isCoupled" class="solo-mode-container animate-fade-in">
      <header class="solo-header">
        <h1>Welcome, <span class="highlight-text">{{ user.nickname || user.username }}</span> 👋</h1>
        <p class="subtitle">开启你们的专属空间，只差最后一步啦！</p>
      </header>

      <div class="bind-card">
        <div class="ticket-stub">
          <div class="stub-content">
            <span class="ticket-label">Your Invite Code</span>
            <h2 class="invite-code" @click="copyCode">
              {{ user.inviteCode || '...' }}
              <el-icon><CopyDocument /></el-icon>
            </h2>
            <p class="ticket-tip">点击复制，发给 Ta 💖</p>
          </div>
        </div>

        <div class="ticket-main">
          <h3>Connect with Partner</h3>
          <div class="input-area">
            <el-input
                v-model="partnerCode"
                placeholder="输入邀请码"
                class="custom-input"
                maxlength="8"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
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
          <span class="weather-icon">⛅️ {{ user.cityName || 'City' }} 24°C</span>
        </div>

        <div class="days-counter" @click="router.push('/timeline')">
          <span class="label">Being in love for</span>
          <div class="count-box">
            <span class="num">{{ daysCount }}</span>
            <div class="heart-icon animate-beat">❤️</div>
          </div>
          <span class="label">Days</span>
        </div>

        <div class="user-avatar" @click="router.push('/profile')">
          <img :src="user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.username" alt="User" />
        </div>
      </header>

      <main class="bento-container">
        <div class="bento-card photo-card" @click="router.push('/album')">
          <div class="polaroid-frame">
            <img src="@/assets/41e543c29f854bb32233aae8a74bc48a.jpg" alt="Us" />
            <div class="photo-meta">
              <span class="date">Today</span>
              <span class="location">Sweet Home</span>
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
            <span>— By Partner</span>
            <el-button class="reply-btn" size="small" round>Reply ✏️</el-button>
          </div>
        </div>

        <div class="bento-card status-card-dual">
          <div class="partner-status-area">
            <div class="p-header">
              <img :src="coupleInfo?.partner?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Partner'" class="p-mini-avatar">
              <span class="p-name">{{ coupleInfo?.partner?.nickname || 'Ta' }} is:</span>
            </div>
            <div class="p-status-content">
              <span class="p-emoji">{{ partnerDisplayStatus.emoji }}</span>
              <span class="p-text">{{ partnerDisplayStatus.text }}</span>
            </div>
          </div>

          <div class="divider-line"></div>

          <div class="my-status-area">
            <div class="my-info">
              <span class="my-label">Me:</span>
              <span class="my-emoji">{{ displayStatus.emoji }}</span>
              <span class="my-text">{{ displayStatus.text }}</span>
            </div>
            <el-switch
                v-model="isHappySwitch"
                class="mini-switch"
                size="small"
                active-color="#FF8FAB"
                inactive-color="#B5EAD7"
                :loading="statusLoading"
                @change="handleToggleStatus"
            />
          </div>
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
      <div class="dock-item dock-add" @click="openPublish" title="New Moment">
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
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CopyDocument, Lock } from '@element-plus/icons-vue'
import { userApi, coupleApi } from '@/api'

const router = useRouter()
const route = useRoute()

// --- 🌟 核心状态 ---
const isCoupled = ref(false)
const loading = ref(false)
const statusLoading = ref(false)

// 用户信息
const user = reactive({
  id: null,
  nickname: '',
  username: '',
  avatar: '',
  inviteCode: '',
  cityName: '',
  isHappy: 1,
  happyText: 'Coding...',
  happyEmoji: '💻',
  restingText: 'Sleeping...',
  restingEmoji: '😴'
})

// 开关状态
const isHappySwitch = ref(true)

// 情侣信息
const coupleInfo = ref(null)
const daysCount = ref(0)

// --- 💡 我的状态 (Computed) ---
const displayStatus = computed(() => {
  if (isHappySwitch.value) {
    return { emoji: user.happyEmoji || '💻', text: user.happyText || 'Coding...' }
  } else {
    return { emoji: user.restingEmoji || '😴', text: user.restingText || 'Sleeping...' }
  }
})

// --- 💡 对方的状态 (Computed) ---
const partnerDisplayStatus = computed(() => {
  const p = coupleInfo.value?.partner
  if (!p) return { emoji: '⏳', text: 'Loading...' }
  const pIsHappy = (p.isHappy === 1 || p.isHappy === true || p.isHappy === undefined)
  if (pIsHappy) {
    return { emoji: p.happyEmoji || '💻', text: p.happyText || 'Coding...' }
  } else {
    return { emoji: p.restingEmoji || '😴', text: p.restingText || 'Sleeping...' }
  }
})

// --- 🔄 切换我的状态 ---
const handleToggleStatus = async (val) => {
  statusLoading.value = true
  try {
    const res = await userApi.updateProfile({ id: user.id, isHappy: val ? 1 : 0 })
    if (res.code === '200') {
      user.isHappy = val ? 1 : 0
      ElMessage.success(val ? 'Status: Happy ✨' : 'Status: Resting 🌙')
    }
  } catch (error) {
    ElMessage.error('Failed to sync status')
    isHappySwitch.value = !val
  } finally {
    statusLoading.value = false
  }
}

// --- 加载逻辑 ---
const loadUserInfo = async () => {
  try {
    const res = await userApi.getCurrentUser()
    if (res.code === '200') {
      Object.assign(user, res.data)
      isHappySwitch.value = user.isHappy === 1
      if (user.coupleId) {
        isCoupled.value = true
        loadCoupleInfo()
      }
    }
  } catch (error) {
    if (error.response?.status === 401) router.push('/login')
  }
}

const loadCoupleInfo = async () => {
  try {
    const res = await coupleApi.getCoupleInfo()
    if (res.code === '200') {
      coupleInfo.value = res.data
      if (res.data.couple?.startDate) {
        const start = new Date(res.data.couple.startDate)
        daysCount.value = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24))
      }
    }
  } catch (error) {
    console.error(error)
  }
}

// --- 绑定 & 复制 ---
const partnerCode = ref('')

const handleBind = async () => {
  if (!partnerCode.value) return ElMessage.warning('请输入邀请码')
  loading.value = true
  try {
    const res = await coupleApi.bindCouple(partnerCode.value.trim())
    if (res.code === '200') {
      ElMessage.success('🎉 绑定成功！')
      isCoupled.value = true
      await loadUserInfo()
    } else {
      ElMessage.error(res.msg || '绑定失败')
    }
  } catch (error) {
    ElMessage.error('绑定失败')
  } finally {
    loading.value = false
  }
}

const copyCode = () => {
  if (user.inviteCode) {
    navigator.clipboard.writeText(user.inviteCode)
    ElMessage.success('已复制邀请码')
  }
}

const customColors = [
  { color: '#B5EAD7', percentage: 20 },
  { color: '#FFDAC1', percentage: 40 },
  { color: '#FFB7B2', percentage: 80 },
  { color: '#FF9AA2', percentage: 100 },
]

const openPublish = () => { console.log('Open Publish') }

watch(() => route.path, (newPath) => {
  if (newPath === '/home') loadUserInfo()
})

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

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
  padding-bottom: 100px; /* 增加底部留白，防止被Dock遮挡 */
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

.animate-fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 背景 Blob */
.bg-blob { position: fixed; border-radius: 50%; filter: blur(90px); z-index: 0; opacity: 0.5; }
.blob-1 { width: 400px; height: 400px; background: #FFB7B2; top: -100px; left: -50px; }
.blob-2 { width: 300px; height: 300px; background: #B5EAD7; bottom: 100px; right: -50px; }
.blob-3 { width: 200px; height: 200px; background: #FFDAC1; top: 40%; left: 40%; opacity: 0.3; }

/* Solo Mode Styles */
.solo-header { text-align: center; margin-top: 60px; margin-bottom: 40px; position: relative; z-index: 10; }
.solo-header h1 { font-size: 32px; font-weight: 800; color: #333; margin-bottom: 10px; }
.highlight-text { color: var(--primary-pink); }
.subtitle { color: #999; font-size: 16px; }

.bind-card {
  max-width: 600px; margin: 0 auto 50px; background: #fff; border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08); display: flex; overflow: hidden;
  position: relative; z-index: 10; transition: transform 0.3s;
}
.bind-card:hover { transform: translateY(-5px); }

.ticket-stub {
  background: #FF8FAB; color: #fff; width: 200px; padding: 30px 20px;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  position: relative; border-right: 2px dashed rgba(255,255,255,0.6);
}
.ticket-stub::before, .ticket-stub::after {
  content: ''; position: absolute; right: -10px; width: 20px; height: 20px;
  background: #FFFBF5; border-radius: 50%;
}
.ticket-stub::before { top: -10px; }
.ticket-stub::after { bottom: -10px; }
.ticket-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; }
.invite-code { font-size: 32px; font-weight: 900; margin: 10px 0; cursor: pointer; display: flex; align-items: center; gap: 5px; }
.ticket-tip { font-size: 12px; opacity: 0.8; }

.ticket-main { flex: 1; padding: 40px; background: rgba(255,255,255,0.9); }
.ticket-main h3 { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #333; }
.input-area { display: flex; gap: 15px; }
.bind-btn { background: #333; color: #fff; border: none; font-weight: 700; }
.bind-btn:hover { background: #000; }

.solo-grid { max-width: 600px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; position: relative; z-index: 10; }
.solo-card { background: rgba(255,255,255,0.6); border-radius: 20px; padding: 25px; text-align: center; cursor: pointer; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.8); }
.solo-card:hover { background: #fff; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.solo-card .icon { font-size: 30px; display: block; margin-bottom: 10px; }
.solo-card h4 { margin: 0 0 5px 0; font-weight: 700; color: #333; }
.solo-card p { margin: 0; font-size: 12px; color: #999; }

/* Couple Mode Styles */
.love-header { position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; margin-bottom: 30px; }
.weather-widget { font-size: 14px; font-weight: 700; color: #9A9A9A; background: rgba(255,255,255,0.5); padding: 8px 16px; border-radius: 20px; }

.days-counter { text-align: center; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.days-counter:hover { transform: scale(1.1); }
.label { font-size: 12px; letter-spacing: 1px; color: #9A9A9A; text-transform: uppercase; }
.count-box { display: flex; align-items: center; gap: 5px; }
.num { font-size: 48px; font-weight: 900; background: linear-gradient(45deg, #FF9AA2, #FFB7B2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
.heart-icon { font-size: 24px; margin-top: 10px; }
.animate-beat { animation: heartbeatJelly 1.6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite; }
@keyframes heartbeatJelly {
  0% { transform: scale(1); }
  15% { transform: scale(1.25); }
  30% { transform: scale(0.95); }
  45% { transform: scale(1.1); }
  60% { transform: scale(1); }
  100% { transform: scale(1); }
}

.user-avatar img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid #fff; box-shadow: var(--shadow-soft); object-fit: cover; cursor: pointer; }

/* Bento Container */
.bento-container {
  position: relative; z-index: 10; max-width: 1000px; margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  grid-template-rows: 240px 180px;
  gap: 24px;
}
.bento-card {
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); overflow: hidden; position: relative;
}
.bento-card:hover { transform: translateY(-5px); box-shadow: 0 15px 50px rgba(0,0,0,0.08); background: rgba(255, 255, 255, 0.85); }

/* Photo Card */
.photo-card { grid-row: span 2; display: flex; flex-direction: column; align-items: center; justify-content: center; background: transparent !important; box-shadow: none !important; border: none !important; cursor: pointer; }
.polaroid-frame { background: #fff; padding: 15px 15px 50px 15px; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: rotate(-3deg); transition: transform 0.4s ease; position: relative; width: 100%; max-width: 300px; }
.photo-card:hover .polaroid-frame { transform: rotate(0deg) scale(1.02); z-index: 5; }
.polaroid-frame img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 2px; background: #eee; }
.photo-meta { position: absolute; bottom: 15px; left: 15px; right: 15px; display: flex; justify-content: space-between; font-family: 'Indie Flower', cursive; color: #555; font-size: 14px; }
.pin { position: absolute; top: -15px; left: 50%; font-size: 24px; filter: drop-shadow(2px 5px 2px rgba(0,0,0,0.2)); }
.card-label { margin-top: 20px; font-weight: 700; color: #FF8FAB; font-size: 14px; letter-spacing: 1px; }

/* Note Card */
.note-card { grid-column: span 2; background: #FFFDF0; padding: 30px; display: flex; flex-direction: column; }
.tape { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 100px; height: 25px; background: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.6); backdrop-filter: blur(5px); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.note-title { font-size: 18px; color: #D4A373; margin-bottom: 10px; font-weight: 800; }
.handwriting-font { font-family: 'Indie Flower', cursive; font-size: 20px; line-height: 1.6; color: #5D5D5D; flex: 1; }
.note-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 14px; color: #999; }
.reply-btn { background: #FFDAC1; border: none; color: #7a5c48; font-weight: 700; }
.reply-btn:hover { background: #FFCeb4; }

/* Status Card Dual Layout */
.status-card-dual { padding: 15px 20px; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%); }
.partner-status-area { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.p-header { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.p-mini-avatar { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #fff; }
.p-name { font-size: 12px; color: #999; font-weight: 700; }
.p-status-content { display: flex; align-items: center; gap: 8px; }
.p-emoji { font-size: 32px; }
.p-text { font-size: 16px; font-weight: 800; color: #5D5D5D; }
.divider-line { height: 1px; background: rgba(0,0,0,0.05); margin: 5px 0; }
.my-status-area { display: flex; align-items: center; justify-content: space-between; height: 40px; }
.my-info { display: flex; align-items: center; gap: 8px; }
.my-label { font-size: 12px; font-weight: 700; color: #999; }
.my-emoji { font-size: 20px; }
.my-text { font-size: 14px; font-weight: 700; color: #5D5D5D; margin-left: 5px; }
.mini-switch { transform: scale(0.9); }

/* Wish Card */
.wish-card { padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%); cursor: pointer; }
.jar-icon { font-size: 40px; margin-bottom: 10px; }
.wish-info { width: 100%; text-align: center; }
.wish-title { font-weight: 700; color: #5D5D5D; display: block; margin-bottom: 10px; }
.wish-meta { font-size: 12px; color: #999; display: block; margin-top: 8px; }

/* Floating Dock */
.floating-dock {
  position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px);
  padding: 12px 28px; border-radius: 50px; display: flex; gap: 25px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1); z-index: 100; border: 1px solid rgba(255,255,255,0.8);
}
.dock-item { cursor: pointer; transition: transform 0.2s ease; display: flex; align-items: center; justify-content: center; }
.dock-item:hover { transform: scale(1.2); }
.dock-icon { font-size: 22px; }
.dock-icon-plus { font-size: 26px; font-weight: bold; color: #FF8FAB; }
.dock-add { width: 45px; height: 45px; background: linear-gradient(135deg, #FF8FAB 0%, #FFB7B2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: -8px 0; box-shadow: 0 4px 15px rgba(255,143,171,0.4); }
.dock-add:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(255,143,171,0.5); }
.dock-add .dock-icon-plus { color: #fff; }

/* ==================================================== */
/* 📱 移动端适配 (核心修复)                           */
/* ==================================================== */
@media (max-width: 768px) {
  .home-container { padding: 15px; padding-bottom: 100px; }

  /* 1. Header 调整 */
  .love-header { flex-direction: column; gap: 15px; }
  .weather-widget { position: absolute; left: 0; top: 0; }
  .user-avatar { position: absolute; right: 0; top: 0; }
  .days-counter { margin-top: 10px; }

  /* 2. Bento Grid 变为单列 */
  .bento-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    grid-template-columns: unset;
    grid-template-rows: unset;
  }

  /* 复位跨列跨行属性 */
  .photo-card, .note-card {
    grid-row: auto;
    grid-column: auto;
  }

  /* 拍立得照片稍微小一点 */
  .polaroid-frame { max-width: 90%; }

  /* 3. Solo 模式卡片 */
  .bind-card {
    flex-direction: column;
  }
  .ticket-stub {
    width: 100%;
    border-right: none;
    border-bottom: 2px dashed rgba(255,255,255,0.6);
    padding: 20px;
    box-sizing: border-box;
  }
  .ticket-stub::before, .ticket-stub::after {
    display: none; /* 移动端去掉小圆缺口，或者调整位置 */
  }
  .ticket-main {
    padding: 30px 20px;
  }
  .input-area {
    flex-direction: column;
  }
  .bind-btn {
    width: 100%;
  }

  .solo-grid {
    grid-template-columns: 1fr; /* 单列 */
  }

  /* 4. 底部 Dock 栏调整 */
  .floating-dock {
    gap: 20px;
    padding: 10px 20px;
    width: 85%;
    justify-content: space-around;
  }
  .dock-icon { font-size: 20px; }
}
</style>