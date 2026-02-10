<template>
  <div class="gallery-container cream-theme">

    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div class="logo">
        <div class="logo-box">C/B</div>
        <span class="logo-text">Couple<span class="dot">.</span>Blog</span>
      </div>

      <nav class="nav-menu">
        <span
            v-for="item in navItems"
            :key="item"
            class="nav-item"
            :class="{ active: activeTab === item }"
            @click="handleNavClick(item)"
        >
          {{ item }}
        </span>
      </nav>

      <div class="actions">
        <el-button class="login-btn" round @click="router.push('/login')">Log In</el-button>
      </div>
    </header>

    <section class="hero-section">
      <div class="hero-content">
        <div class="tag-pill">✨ Our Little World</div>
        <h1 class="hero-title">Collecting <span class="highlight">Moments</span>,<br>Not Just Things.</h1>
        <p class="hero-desc">把我们的生活碎片，整理成最温柔的诗。<br>这里没有喧嚣，只有我们。</p>

        <div class="hero-actions">
          <button class="primary-btn" @click="router.push('/login')">
            <span>Start Journey</span>
            <el-icon><ArrowRight /></el-icon>
          </button>
        </div>
      </div>

      <div class="hero-image-wrapper">
        <img src="https://images.unsplash.com/photo-1516054575922-f0b8eeede20f?q=80&w=900&auto=format&fit=crop" alt="Hero" class="soft-img" />
      </div>
    </section>

    <section class="features-section">
      <div class="section-header center">
        <h2 class="section-title">Sweet Functions</h2>
        <p class="section-subtitle">为你准备的小确幸功能</p>
      </div>

      <div class="bento-grid">
        <div class="bento-item theme-pink" @click="router.push('/login')">
          <div class="icon-circle">📅</div>
          <div class="content">
            <h3>Timeline</h3>
            <p>记录心动的每一天</p>
          </div>
          <div class="arrow-btn"><ArrowRight /></div>
        </div>

        <div class="bento-item theme-blue" @click="router.push('/login')">
          <div class="icon-circle">☁️</div>
          <div class="content">
            <h3>Cloud Gallery</h3>
            <p>云端存储独家记忆</p>
          </div>
          <div class="arrow-btn"><ArrowRight /></div>
        </div>

        <div class="bento-item theme-yellow" @click="router.push('/login')">
          <div class="icon-circle">⭐️</div>
          <div class="content">
            <h3>Wishlist</h3>
            <p>一起完成的小目标</p>
          </div>
          <div class="arrow-btn"><ArrowRight /></div>
        </div>
      </div>
    </section>

    <section class="activity-section" id="activity-anchor">
      <div class="clean-card" @click="router.push('/login')">
        <div class="card-left">
          <span class="status-tag">Upcoming Event</span>
          <h2>Valentine's Letter 💌</h2>
          <p>一年一度的情书交换计划。在这个快节奏的时代，我们慢下来，写封信。</p>
          <div class="meta-info">
            <span>Feb 14 - Feb 20</span>
          </div>
          <button class="text-btn">Join Now</button>
        </div>
        <div class="card-right">
          <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Gift">
        </div>
      </div>
    </section>

    <section class="moments-section">
      <div class="section-header center">
        <h2 class="section-title">Daily Slices</h2>
        <p class="section-subtitle">生活不仅有诗，还有可爱的你</p>
      </div>

      <div class="moments-row">
        <div class="polaroid-card" v-for="(img, index) in momentImages" :key="index" @click="router.push('/login')">
          <div class="img-frame">
            <img :src="img.src" :alt="img.title">
            <div class="hover-heart">❤️</div>
          </div>
          <div class="card-text">
            <h4>{{ img.title }}</h4>
            <span>{{ img.user }}</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 Couple Blog. Made with 🥛 & 🍯.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

// --- 状态变量 ---
const isScrolled = ref(false) // 是否发生滚动（控制Header变色）
const activeTab = ref('') // 当前选中的导航项
const navItems = ['Timeline', 'Album', 'Wishlist', 'Events'] // 导航菜单列表

// 模拟的照片数据
const momentImages = [
  { src: 'https://images.unsplash.com/photo-1490810235433-239104826d29?auto=format&fit=crop&w=600&q=80', title: 'Sunday Brunch', user: 'Alice' },
  { src: 'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=600&q=80', title: 'Beach Day', user: 'Bob' },
  { src: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', title: 'Nature Walk', user: 'Alice' },
  { src: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=600&q=80', title: 'Our Cat', user: 'Bob' }
]

// --- 方法逻辑 ---

// 处理滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 导航点击处理
const handleNavClick = (tab) => {
  activeTab.value = tab
  if (tab === 'Events') {
    scrollToActivity()
  } else {
    // 其他按钮统一跳转登录页演示
    router.push('/login')
  }
}

// 滚动到活动区域锚点
const scrollToActivity = () => {
  const element = document.getElementById('activity-anchor');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 引入圆润可爱的英文字体 */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

/* ==============================================
   CSS 变量定义 (这里修改主题色)
   ============================================== */
:root {
  --bg-cream: #FFFBF5;         /* 背景色：暖杏仁白 */
  --primary-pink: #FF8FAB;     /* 主色调：莫兰迪粉 */
  --soft-blue: #B5EAD7;        /* 辅助色：薄荷蓝 */
  --soft-yellow: #FFDAC1;      /* 辅助色：奶油黄 */
  --text-main: #5D5D5D;        /* 主文字：柔和深灰 */
  --text-light: #9A9A9A;       /* 次要文字：浅灰 */
  --shadow-soft: 0 10px 40px rgba(226, 212, 200, 0.4); /* 全局柔和阴影 */
}

/* ==============================================
   A. 全局基础样式
   ============================================== */
.gallery-container {
  min-height: 100vh;
  background-color: var(--bg-cream);
  color: var(--text-main);
  font-family: 'Nunito', 'PingFang SC', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* 背景光斑 */
.bg-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
}
.blob-1 { width: 500px; height: 500px; background: #FFDAC1; top: -100px; left: -100px; }
.blob-2 { width: 400px; height: 400px; background: #E2F0CB; bottom: 0; right: -50px; }

/* ==============================================
   B. 顶部导航栏 (Header)
   ============================================== */
.header {
  position: fixed; width: 100%; top: 0; z-index: 100;
  padding: 20px 60px;
  display: flex; justify-content: space-between; align-items: center;
  transition: all 0.4s ease;
  box-sizing: border-box;
}

/* 滚动后 Header 变磨砂白 */
.header-scrolled {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding: 15px 60px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.02);
}

.logo { display: flex; align-items: center; gap: 12px; cursor: default; }
.logo-box {
  background: var(--text-main); color: #fff;
  padding: 6px 12px; border-radius: 12px; font-weight: 800; font-size: 16px;
}
.logo-text { font-size: 20px; font-weight: 700; color: var(--text-main); letter-spacing: -0.5px; }
.dot { color: var(--primary-pink); font-size: 30px; line-height: 0; }

/* 🌟 Q弹果冻导航样式 */
.nav-menu {
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  padding: 6px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  gap: 5px;
}

/* 🌟 修复后的导航项样式 */
.nav-item {
  position: relative;
  padding: 8px 20px; /* 稍微缩小一点，更精致 */
  border-radius: 40px;
  color: var(--text-main); /* 默认深灰色文字，更清晰 */
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
  /* 默认给一个透明边框，防止抖动 */
  border: 2px solid transparent;
}

/* 🖱️ 悬浮状态 (Hover) - 变成浅浅的粉色背景 */
.nav-item:hover {
  color: #D65A5A; /* 文字变深红 */
  background: #FFF0F0; /* 背景变极淡的粉白，而不是纯白 */
  border-color: #FFD1D1; /* 加个浅粉色边框 */
  transform: translateY(-2px);
}

/* ✅ 激活状态 (Active) - 颜色加深，阴影加重 */
.nav-item.active {
  background: var(--primary-pink);
  color: #fff; /* 文字纯白反白 */
  border-color: var(--primary-pink);
  transform: scale(1.05);
  /* 关键：加深阴影，让它和背景彻底分开 */
  box-shadow: 0 4px 15px rgba(255, 143, 171, 0.6);
}
.login-btn {
  background: var(--text-main); border: none; color: #fff;
  padding: 10px 24px; font-weight: 700; transition: all 0.3s;
}
.login-btn:hover { background: #000; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }

/* ==============================================
   C. 首屏区域 (Hero Section)
   ============================================== */
.hero-section {
  padding: 160px 8% 80px;
  display: flex; align-items: center; justify-content: space-between;
  position: relative; z-index: 1;
}
.hero-content { flex: 1; max-width: 600px; }

.tag-pill {
  display: inline-block; background: #fff; color: var(--text-main);
  padding: 8px 16px; border-radius: 30px; font-size: 14px; font-weight: 700;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05); margin-bottom: 25px;
}

.hero-title { font-size: 64px; line-height: 1.1; font-weight: 800; margin-bottom: 25px; color: #333; }
.highlight { color: var(--primary-pink); position: relative; z-index: 1; }
/* 标题下划线 */
.highlight::after {
  content: ''; position: absolute; bottom: 5px; left: 0; width: 100%; height: 15px;
  background: rgba(255, 183, 178, 0.3); z-index: -1; border-radius: 4px;
}

.hero-desc { font-size: 18px; color: var(--text-light); line-height: 1.6; margin-bottom: 40px; }

/* 主按钮样式 */
.primary-btn {
  background: var(--primary-pink);
  border: none;
  padding: 16px 36px; border-radius: 50px; font-size: 16px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; gap: 10px;
  box-shadow: 0 10px 25px rgba(255, 183, 178, 0.4);
  white-space: nowrap; /* 防止文字换行消失 */
  width: fit-content;  /* 宽度自适应 */
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.primary-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 30px rgba(255, 183, 178, 0.6); }

.hero-image-wrapper { flex: 1; display: flex; justify-content: flex-end; }
.soft-img {
  width: 90%; max-width: 500px; border-radius: 40px;
  box-shadow: var(--shadow-soft);
  transform: rotate(3deg);
  transition: transform 0.5s ease;
}
.hero-section:hover .soft-img { transform: rotate(0deg) scale(1.02); }

/* ==============================================
   D. 功能卡片区 (Features - Bento Grid)
   ============================================== */
.section-header.center { text-align: center; margin-bottom: 60px; }
.section-title { font-size: 36px; font-weight: 800; margin-bottom: 10px; color: #333; }
.section-subtitle { color: var(--text-light); font-size: 16px; }

.features-section { padding: 80px 10%; position: relative; z-index: 1; }
.bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }

.bento-item {
  background: #fff; padding: 40px 30px; border-radius: 32px;
  cursor: pointer; position: relative; overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(0,0,0,0.02);
}
.bento-item:hover { transform: translateY(-10px); box-shadow: var(--shadow-soft); }

/* 三种渐变主题色 */
.theme-pink { background: linear-gradient(135deg, #FFF0F0 0%, #FFFFFF 100%); }
.theme-blue { background: linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%); }
.theme-yellow { background: linear-gradient(135deg, #FFFCF0 0%, #FFFFFF 100%); }

.icon-circle {
  width: 60px; height: 60px; background: #fff; border-radius: 20px;
  display: flex; align-items: center; justify-content: center; font-size: 28px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05); margin-bottom: 25px;
}
.content h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; color: #333; }
.content p { font-size: 14px; color: var(--text-light); }
.arrow-btn {
  position: absolute; bottom: 30px; right: 30px; width: 40px; height: 40px;
  background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05); color: #333; opacity: 0; transform: scale(0.8); transition: all 0.3s;
}
.bento-item:hover .arrow-btn { opacity: 1; transform: scale(1); }

/* ==============================================
   E. 活动横幅 (Activity Card)
   ============================================== */
.activity-section { padding: 0 10% 100px; position: relative; z-index: 1; }
.clean-card {
  background: #fff; border-radius: 40px; display: flex; overflow: hidden;
  box-shadow: var(--shadow-soft); cursor: pointer; min-height: 320px;
  transition: transform 0.3s ease;
}
.clean-card:hover { transform: scale(1.01); }
.card-left { flex: 1; padding: 60px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.status-tag {
  background: #FFE4E1; color: #D65A5A; font-size: 12px; font-weight: 700;
  padding: 6px 12px; border-radius: 8px; margin-bottom: 20px; letter-spacing: 0.5px;
}
.clean-card h2 { font-size: 32px; font-weight: 800; margin-bottom: 15px; color: #333; }
.clean-card p { color: var(--text-light); margin-bottom: 30px; max-width: 400px; line-height: 1.6; }
.meta-info { font-weight: 700; color: #555; margin-bottom: 30px; }
.text-btn { background: none; border: none; color: #D65A5A; font-weight: 800; font-size: 16px; cursor: pointer; padding: 0; border-bottom: 2px solid transparent; transition: all 0.2s; }
.text-btn:hover { border-bottom-color: #D65A5A; }
.card-right { flex: 1.2; }
.card-right img { width: 100%; height: 100%; object-fit: cover; }

/* ==============================================
   F. 照片墙 (Moments - Polaroid Style)
   ============================================== */
.moments-section { padding: 0 10% 120px; position: relative; z-index: 1; }
.moments-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }

.polaroid-card {
  background: #fff; padding: 15px 15px 25px 15px; border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03); cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.polaroid-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

.img-frame {
  width: 100%; aspect-ratio: 1; border-radius: 12px; overflow: hidden; position: relative;
  background: #f8f8f8;
}
.img-frame img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.polaroid-card:hover img { transform: scale(1.1); }

.hover-heart {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0);
  font-size: 40px; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.polaroid-card:hover .hover-heart { transform: translate(-50%, -50%) scale(1); }

.card-text { margin-top: 15px; text-align: center; }
.card-text h4 { font-size: 15px; font-weight: 700; color: #333; margin-bottom: 4px; }
.card-text span { font-size: 12px; color: var(--text-light); }

.footer { text-align: center; padding: 40px; color: var(--text-light); font-size: 14px; }

/* ==============================================
   G. 移动端适配 (Mobile Responsive)
   ============================================== */
@media (max-width: 768px) {
  .hero-section { flex-direction: column-reverse; padding: 100px 20px 60px; text-align: center; }
  .hero-image-wrapper { justify-content: center; margin-bottom: 40px; }
  .hero-title { font-size: 40px; }
  .hero-content { align-items: center; display: flex; flex-direction: column; }
  .nav-menu { display: none; } /* 移动端暂时隐藏复杂导航 */
  .bento-grid, .moments-row { grid-template-columns: 1fr; }
  .clean-card { flex-direction: column; }
  .clean-card .card-right { height: 200px; }
}
</style>