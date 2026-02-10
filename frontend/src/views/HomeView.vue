<template>
  <div class="home-container cream-theme">

    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

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
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
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
        <div class="tape"></div> <h3 class="note-title">To My Love:</h3>
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

    <nav class="floating-dock">
      <div class="dock-item" @click="router.push('/home')" title="Home">
        <span class="dock-icon">🏠</span>
      </div>
      <div class="dock-item" @click="router.push('/timeline')" title="Timeline">
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. 恋爱天数计算
const startDate = new Date('2023-05-20') // 你们的纪念日
const today = new Date()
const daysCount = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))

// 2. 状态切换逻辑
const isHappy = ref(true)
const currentStatus = reactive({
  emoji: '💻',
  text: 'Coding...'
})

const toggleStatus = (val) => {
  if (val) {
    currentStatus.emoji = '💻'
    currentStatus.text = 'Coding...'
  } else {
    currentStatus.emoji = '😴'
    currentStatus.text = 'Sleeping...'
  }
}

// 3. 进度条颜色 (Element Plus)
const customColors = [
  { color: '#B5EAD7', percentage: 20 },
  { color: '#FFDAC1', percentage: 40 },
  { color: '#FFB7B2', percentage: 80 },
  { color: '#FF9AA2', percentage: 100 },
]

// 4. 打开发布弹窗 (预留)
const openPublish = () => {
  console.log('Open Publish Modal')
}
</script>

<style scoped>
/* 引入手写字体 (用于留言板) */
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
/* 引入圆润字体 */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

/* === 全局变量 (Creamy Theme) === */
:root {
  --bg-cream: #FFFBF5;
  --card-white: rgba(255, 255, 255, 0.65); /* 磨砂白 */
  --card-border: 1px solid rgba(255, 255, 255, 0.8);
  --primary-pink: #FF8FAB;
  --soft-yellow: #FFDAC1;
  --text-main: #5D5D5D;
  --shadow-soft: 0 8px 30px rgba(0,0,0,0.04);
}

.home-container {
  min-height: 100vh;
  background-color: #FFFBF5; /* 硬编码背景色，防止变量失效 */
  color: #5D5D5D;
  font-family: 'Nunito', sans-serif;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 背景光斑 */
.bg-blob {
  position: fixed; border-radius: 50%; filter: blur(90px); z-index: 0; opacity: 0.5;
}
.blob-1 { width: 400px; height: 400px; background: #FFB7B2; top: -100px; left: -50px; }
.blob-2 { width: 300px; height: 300px; background: #B5EAD7; bottom: 100px; right: -50px; }
.blob-3 { width: 200px; height: 200px; background: #FFDAC1; top: 40%; left: 40%; opacity: 0.3; }

/* === 2. 顶部 Header (情感仪表盘) === */
.love-header {
  position: relative; z-index: 10;
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 20px; margin-bottom: 30px;
}

.weather-widget {
  font-size: 14px; font-weight: 700; color: #9A9A9A;
  background: rgba(255,255,255,0.5); padding: 8px 16px; border-radius: 20px;
}
.divider { margin: 0 8px; color: #FFB7B2; }

.days-counter {
  text-align: center; display: flex; flex-direction: column; align-items: center;
}
.label { font-size: 12px; letter-spacing: 1px; color: #9A9A9A; text-transform: uppercase; }
.count-box { display: flex; align-items: center; gap: 5px; }
.num {
  font-size: 48px; font-weight: 900;
  background: linear-gradient(45deg, #FF9AA2, #FFB7B2);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1;
}
.heart-icon { font-size: 24px; margin-top: 10px; }
/* 应用动画 */
.animate-beat {
  /* 缓慢、线性的呼吸 */
  animation: heartbeatBreath 2.5s ease-in-out infinite;
}

/* 定义关键帧 */
@keyframes heartbeatBreath {
  0% {
    transform: scale(1);
    opacity: 0.8; /* 开始时稍微淡一点 */
  }
  50% {
    /* 缓慢放大到最大 */
    transform: scale(1.15);
    opacity: 1; /* 最亮 */
    /* 加一个极其柔和的粉色光晕 */
    filter: drop-shadow(0 0 5px rgba(255, 183, 178, 0.6));
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.user-avatar img {
  width: 45px; height: 45px; border-radius: 50%;
  border: 3px solid #fff; box-shadow: var(--shadow-soft);
}

/* === 3. Bento Grid (便当盒布局) === */
.bento-container {
  position: relative; z-index: 10;
  max-width: 1000px; margin: 0 auto;
  display: grid;
  /* 定义网格：3列，自动行高 */
  grid-template-columns: 1.2fr 1fr 1fr;
  grid-template-rows: 240px 180px;
  gap: 24px;
  padding-bottom: 100px; /* 给底部Dock留位置 */
}

/* 通用卡片样式 */
.bento-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}
.bento-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0,0,0,0.08);
  background: rgba(255, 255, 255, 0.85);
}

/* [A] 照片卡片 (跨两行) */
.photo-card {
  grid-row: span 2; /* 占满两行高度 */
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: transparent !important; /* 特殊处理，不需要背景色 */
  box-shadow: none !important; border: none !important;
}
.polaroid-frame {
  background: #fff; padding: 15px 15px 50px 15px;
  border-radius: 4px; /* 拍立得是直角或小圆角 */
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transform: rotate(-3deg); /* 微微倾斜 */
  transition: transform 0.4s ease;
  position: relative;
  width: 100%; max-width: 300px;
}
.photo-card:hover .polaroid-frame { transform: rotate(0deg) scale(1.02); z-index: 5; }
.polaroid-frame img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 2px; background: #eee; }
.photo-meta {
  position: absolute; bottom: 15px; left: 15px; right: 15px;
  display: flex; justify-content: space-between;
  font-family: 'Indie Flower', cursive; color: #555; font-size: 14px;
}
.pin {
  position: absolute; top: -15px; left: 50%; font-size: 24px;
  filter: drop-shadow(2px 5px 2px rgba(0,0,0,0.2));
}
.card-label {
  margin-top: 20px; font-weight: 700; color: #FF8FAB; font-size: 14px; letter-spacing: 1px;
}

/* [B] 留言板 (跨两列) */
.note-card {
  grid-column: span 2; /* 占满右边两列 */
  background: #FFFDF0; /* 淡淡的黄色便利贴纸 */
  padding: 30px;
  display: flex; flex-direction: column;
}
.tape {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  width: 100px; height: 25px;
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.6);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.note-title { font-size: 18px; color: #D4A373; margin-bottom: 10px; font-weight: 800; }
.handwriting-font {
  font-family: 'Indie Flower', cursive; /* 手写字体 */
  font-size: 20px; line-height: 1.6; color: #5D5D5D;
  flex: 1;
}
.note-footer {
  display: flex; justify-content: space-between; align-items: center; margin-top: 10px;
  font-size: 14px; color: #999;
}
.reply-btn { background: #FFDAC1; border: none; color: #7a5c48; font-weight: 700; }
.reply-btn:hover { background: #FFCeb4; }

/* [C] 状态卡片 */
.status-card {
  padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  background: linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%);
}
.status-emoji { font-size: 48px; line-height: 1; }
.status-text { text-align: center; }
.status-text .label { display: block; font-size: 10px; color: #B0C4DE; margin-bottom: 2px; }
.status-text .value { font-weight: 800; font-size: 16px; color: #5D5D5D; }
.status-switch { margin-top: 5px; }

/* [D] 许愿罐 */
.wish-card {
  padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%);
  cursor: pointer;
}
.jar-icon { font-size: 40px; margin-bottom: 10px; }
.wish-info { width: 100%; text-align: center; }
.wish-title { font-weight: 700; font-size: 15px; display: block; margin-bottom: 8px; }
.wish-meta { font-size: 10px; color: #999; margin-top: 5px; display: block; }

/* === 4. 底部 Dock (悬浮) === */
.floating-dock {
  position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  display: flex; align-items: center; gap: 15px;
  z-index: 100;
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

/* 中间的大加号 */
.dock-add {
  background: #FF8FAB; color: #fff;
  width: 55px; height: 55px;
  box-shadow: 0 5px 20px rgba(255, 143, 171, 0.4);
}
.dock-add:hover {
  background: #FF7096; transform: translateY(-10px) scale(1.1);
}
.dock-icon-plus { font-size: 30px; font-weight: 300; line-height: 1; margin-top: -3px; }

/* === 移动端适配 === */
@media (max-width: 768px) {
  .bento-container {
    grid-template-columns: 1fr; /* 变单列 */
    grid-template-rows: auto;
  }
  .photo-card { grid-row: auto; margin-bottom: 20px; }
  .note-card { grid-column: span 1; }
  .num { font-size: 40px; }
  .floating-dock { bottom: 20px; padding: 8px 15px; gap: 10px; }
  .dock-item { width: 40px; height: 40px; }
  .dock-add { width: 50px; height: 50px; }
}
</style>