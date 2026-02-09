<template>
  <div class="gallery-container">
    <header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div class="logo">
        <span class="logo-icon">C/B</span>
        <span class="logo-text">Couple&Blog.</span>
      </div>

      <nav class="nav-menu">
        <span class="nav-item" @click="router.push('/login')">Timeline</span>
        <span class="nav-item" @click="router.push('/login')">Album</span>
        <span class="nav-item" @click="router.push('/login')">Wishlist</span>
        <span class="nav-item" @click="router.push('/login')">Moments</span>
        <span class="nav-item active" @click="scrollToActivity">Events</span>
      </nav>

      <div class="actions">
        <el-button round class="login-btn" @click="router.push('/login')">Sign In</el-button>
      </div>
    </header>

    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-overlay">
        <div class="hero-content">
          <p class="hero-subtitle">— OUR SHARED JOURNAL</p>
          <h1 class="hero-title">Curating <br> Our Life's Art.</h1>
          <p class="hero-desc">记录，是抵抗遗忘的唯一方式。<br>在这里，珍藏只属于我们的每一帧。</p>
          <div class="hero-actions">
            <el-button color="#333" size="large" round class="start-btn" @click="router.push('/login')">
              开始创作之旅 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">The Collection.</h2>
        <p class="section-subtitle">为二人世界设计的专属模块</p>
      </div>

      <div class="bento-grid">
        <div class="bento-item item-large theme-clay" @click="router.push('/login')">
          <div class="bento-content">
            <el-icon class="bento-icon"><Calendar /></el-icon>
            <h3>Timeline Story</h3>
            <p>以时间为轴，串联起所有心动瞬间。让回忆像电影一样播放。</p>
          </div>
          <div class="hover-reveal">Explore <el-icon><ArrowRight /></el-icon></div>
        </div>

        <div class="bento-item item-medium theme-sage" @click="router.push('/login')">
          <div class="bento-content">
            <el-icon class="bento-icon"><Camera /></el-icon>
            <h3>Private Gallery</h3>
            <p>构建云端私密映像馆，原图存储你们的独家记忆。</p>
          </div>
          <div class="hover-reveal">View <el-icon><ArrowRight /></el-icon></div>
        </div>

        <div class="bento-item item-medium theme-sand" @click="router.push('/login')">
          <div class="bento-content">
            <el-icon class="bento-icon"><CollectionTag /></el-icon>
            <h3>Wishlist & Goals</h3>
            <p>共同拟定未来计划，用一个个勾选完成生活的仪式感。</p>
          </div>
          <div class="hover-reveal">Check <el-icon><ArrowRight /></el-icon></div>
        </div>
      </div>
    </section>

    <section class="activity-section" id="activity-anchor">
      <div class="activity-banner" @click="router.push('/login')">
        <div class="activity-visual">
          <img src="https://images.unsplash.com/photo-1579208575657-c595a05383b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Event">
        </div>
        <div class="activity-info">
          <span class="activity-badge">OFFICIAL EVENT</span>
          <h2 class="activity-title">Valentine's Day Special: <br>Love Letter Exchange 💌</h2>
          <p class="activity-desc">参与年度情侣书信交换计划。给未来的彼此写一封信，封存在时光胶囊中。</p>
          <div class="activity-meta">
            <span>📅 Feb 14 - Feb 20</span>
            <el-button round class="join-btn">立即参与</el-button>
          </div>
        </div>
      </div>
    </section>

    <section class="moments-section">
      <div class="section-header">
        <h2 class="section-title">Sweet Moments.</h2>
        <p class="section-subtitle">我们的生活碎片与高光时刻</p>
      </div>

      <div class="moments-grid">
        <div class="moment-card" @click="router.push('/login')">
          <div class="moment-img-box">
            <img src="https://images.unsplash.com/photo-1516589171835-cc4860af09d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="moment">
            <div class="moment-overlay"><span class="likes">❤️ 128</span></div>
          </div>
          <div class="moment-info">
            <h4>Morning Coffee ☕️</h4>
            <div class="user-info"><span class="avatar">A</span><span class="name">Alice</span></div>
          </div>
        </div>

        <div class="moment-card" @click="router.push('/login')">
          <div class="moment-img-box">
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="moment">
            <div class="moment-overlay"><span class="likes">❤️ 256</span></div>
          </div>
          <div class="moment-info">
            <h4>First Trip ✈️</h4>
            <div class="user-info"><span class="avatar">B</span><span class="name">Bob</span></div>
          </div>
        </div>

        <div class="moment-card" @click="router.push('/login')">
          <div class="moment-img-box">
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="moment">
            <div class="moment-overlay"><span class="likes">❤️ 89</span></div>
          </div>
          <div class="moment-info">
            <h4>Weekend Vibe 🎬</h4>
            <div class="user-info"><span class="avatar">A</span><span class="name">Alice</span></div>
          </div>
        </div>

        <div class="moment-card" @click="router.push('/login')">
          <div class="moment-img-box">
            <img src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="moment">
            <div class="moment-overlay"><span class="likes">❤️ 342</span></div>
          </div>
          <div class="moment-info">
            <h4>Anniversary 🎂</h4>
            <div class="user-info"><span class="avatar">B</span><span class="name">Bob</span></div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 Couple Blog. Designed for love.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { Calendar, Camera, CollectionTag, ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToActivity = () => {
  const element = document.getElementById('activity-anchor');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* === PC端样式 === */
:root {
  --bg-cream: #F9F8F4;
  --text-dark: #2C2C2C;
  --text-muted: #7A7A7A;
}

.gallery-container {
  min-height: 100vh;
  background-color: var(--bg-cream);
  color: var(--text-dark);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
  overflow-x: hidden;
}

/* --- Header & Nav --- */
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 25px 60px; position: fixed; width: 100%; top: 0; z-index: 100;
  background: transparent; transition: all 0.4s ease; box-sizing: border-box;
}
.header-scrolled { background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px); padding: 15px 60px; box-shadow: 0 2px 20px rgba(0,0,0,0.03); }

.logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { font-weight: 900; font-size: 18px; background: var(--text-dark); color: #fff; padding: 4px 8px; border-radius: 4px; }
.logo-text { font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }

/* 🌟 中间导航菜单样式 (升级版) */
.nav-menu {
  display: flex;
  gap: 15px; /* 稍微拉近一点，因为我们要加背景 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-item {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;

  /* 胶囊效果核心样式 */
  padding: 8px 20px; /* 增加内边距，撑起胶囊 */
  border-radius: 50px; /* 圆润的边角 */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* 丝滑的动画曲线 */
  background: transparent; /* 默认背景透明 */
}

/* 🖱️ 鼠标悬浮效果：上浮 + 变色 + 出现背景 */
.nav-item:hover {
  background: rgba(44, 44, 44, 0.05); /* 淡淡的灰色背景 */
  color: #C27664; /* 文字变成陶土红，呼应主题 */
  transform: translateY(-2px); /* 轻轻上浮 2像素 */
}

/* 激活状态 */
.nav-item.active {
  font-weight: 700;
  color: #C27664;
}

.login-btn { border-color: var(--text-dark); color: var(--text-dark); font-weight: 600; transition: all 0.3s; }
.login-btn:hover { background: var(--text-dark); color: #fff; }

/* --- Hero Section --- */
.hero-section { height: 92vh; position: relative; overflow: hidden; border-radius: 0 0 40px 40px; }
.hero-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover; background-position: center;
  transform: scale(1); animation: kenBurns 20s ease-in-out infinite alternate;
}
@keyframes kenBurns { from { transform: scale(1); } to { transform: scale(1.15); } }
.hero-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2));
  display: flex; align-items: center; padding-left: 10%; box-sizing: border-box;
}
.hero-content { color: #fff; max-width: 600px; }
.hero-subtitle { font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; opacity: 0.8; margin-bottom: 20px; display: block; }
.hero-title { font-size: 72px; line-height: 1.1; font-weight: 800; margin-bottom: 30px; letter-spacing: -1px; }
.hero-desc { font-size: 18px; line-height: 1.6; opacity: 0.9; margin-bottom: 40px; }
.start-btn { padding: 25px 50px; font-size: 16px; font-weight: 600; border: none; transition: transform 0.3s; }

/* --- Features Section --- */
.features-section { padding: 120px 10% 80px 10%; box-sizing: border-box; }
.section-header { margin-bottom: 70px; max-width: 500px; }
.section-title { font-size: 48px; font-weight: 800; margin-bottom: 15px; letter-spacing: -0.5px; }
.section-subtitle { font-size: 18px; color: var(--text-muted); }

.bento-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 30px; min-height: 500px; }
.bento-item {
  border-radius: 32px; padding: 50px; display: flex; flex-direction: column; justify-content: space-between;
  cursor: pointer; position: relative; overflow: hidden; border: 1px solid rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.item-large { grid-column: span 6; background-color: #F2EBE9; }
.item-medium { grid-column: span 3; background-color: #E8ECE6; }
.theme-sand { background-color: #F4F0E8; }
.bento-icon { font-size: 48px; margin-bottom: 30px; color: var(--text-dark); }
.bento-content h3 { font-size: 28px; font-weight: 700; margin-bottom: 15px; }
.bento-content p { font-size: 16px; color: var(--text-muted); line-height: 1.6; }
.hover-reveal {
  position: absolute; bottom: 40px; right: 50px; font-weight: 600; display: flex; align-items: center; gap: 5px;
  opacity: 0; transform: translateX(-20px); transition: all 0.4s ease;
}
.bento-item:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 30px 60px rgba(0,0,0,0.08); }
.bento-item:hover .hover-reveal { opacity: 1; transform: translateX(0); }

/* --- Activity Section --- */
.activity-section { padding: 0 10% 120px 10%; box-sizing: border-box; }
.activity-banner {
  background-color: #2C2C2C; border-radius: 32px; overflow: hidden; display: flex; cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease; color: #fff; min-height: 350px;
}
.activity-banner:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(44, 44, 44, 0.2); }
.activity-info { flex: 1; padding: 60px; display: flex; flex-direction: column; justify-content: center; }
.activity-badge {
  display: inline-block; background: #C27664; color: #fff; font-size: 12px; font-weight: 700;
  padding: 6px 12px; border-radius: 4px; margin-bottom: 20px; width: fit-content; letter-spacing: 1px;
}
.activity-title { font-size: 36px; font-weight: 700; margin-bottom: 20px; line-height: 1.2; }
.activity-desc { font-size: 16px; opacity: 0.8; margin-bottom: 40px; max-width: 450px; line-height: 1.6; }
.activity-meta { display: flex; align-items: center; gap: 20px; font-weight: 600; }
.join-btn { background: #fff; color: #2C2C2C; border: none; font-weight: 700; }
.activity-visual { flex: 1; position: relative; overflow: hidden; }
.activity-visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.activity-banner:hover .activity-visual img { transform: scale(1.05); }

/* --- Moments Section --- */
.moments-section { padding: 0 10% 120px 10%; box-sizing: border-box; }
.moments-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
.moment-card {
  background: #fff; padding: 15px 15px 25px 15px; border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03); cursor: pointer; border: 1px solid rgba(0,0,0,0.02); transition: all 0.4s ease;
}
.moment-card:hover { transform: translateY(-10px) rotate(1deg); box-shadow: 0 20px 50px rgba(0,0,0,0.08); z-index: 10; }
.moment-img-box { width: 100%; aspect-ratio: 3/4; overflow: hidden; border-radius: 2px; position: relative; background: #f0f0f0; }
.moment-img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.moment-card:hover .moment-img-box img { transform: scale(1.05); }
.moment-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.2);
  display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s;
}
.moment-card:hover .moment-overlay { opacity: 1; }
.likes { color: #fff; font-weight: bold; font-size: 18px; background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); padding: 8px 16px; border-radius: 20px; }
.moment-info { margin-top: 20px; }
.moment-info h4 { font-size: 16px; font-weight: 700; margin-bottom: 10px; color: var(--text-dark); }
.user-info { display: flex; align-items: center; gap: 8px; }
.avatar { width: 24px; height: 24px; background: var(--text-muted); color: #fff; border-radius: 50%; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.name { font-size: 13px; color: var(--text-muted); }
.footer { padding: 50px; text-align: center; border-top: 1px solid rgba(0,0,0,0.05); color: var(--text-muted); font-size: 14px; font-weight: 500; }

/* =================================================================
   📱 移动端适配 (Mobile Responsiveness)
   ================================================================= */
@media (max-width: 768px) {
  /* 移动端隐藏中间导航 */
  .nav-menu { display: none; }

  .header { padding: 15px 20px; }
  .header-scrolled { padding: 10px 20px; }
  .logo-text { font-size: 18px; }
  .login-btn { padding: 8px 15px; font-size: 12px; }

  .hero-section { height: 85vh; border-radius: 0 0 25px 25px; }
  .hero-overlay { padding-left: 20px; padding-right: 20px; justify-content: center; text-align: center; }
  .hero-content { width: 100%; }
  .hero-title { font-size: 42px; margin-bottom: 20px; }
  .hero-subtitle { font-size: 12px; letter-spacing: 1px; }
  .hero-desc { font-size: 16px; margin-bottom: 30px; }
  .start-btn { padding: 15px 35px; font-size: 14px; width: 100%; }

  .features-section { padding: 60px 20px; }
  .section-title { font-size: 32px; }
  .section-subtitle { font-size: 16px; }
  .bento-grid { grid-template-columns: 1fr; gap: 20px; }
  .bento-item { padding: 30px; min-height: 250px; grid-column: span 1 !important; }
  .bento-icon { font-size: 36px; margin-bottom: 20px; }
  .bento-content h3 { font-size: 24px; }

  .activity-section { padding: 0 20px 80px 20px; }
  .activity-banner { flex-direction: column; min-height: auto; }
  .activity-visual { height: 200px; width: 100%; order: 1; }
  .activity-info { order: 2; padding: 30px 25px; align-items: flex-start; text-align: left; }
  .activity-title { font-size: 24px; }
  .activity-desc { font-size: 14px; margin-bottom: 20px; }
  .activity-meta { flex-direction: column; align-items: flex-start; gap: 15px; width: 100%; }
  .join-btn { width: 100%; }

  .moments-section { padding: 0 20px 100px 20px; }
  .moments-grid { grid-template-columns: 1fr; gap: 25px; }
  .moment-card { padding: 10px 10px 20px 10px; }
}
</style>