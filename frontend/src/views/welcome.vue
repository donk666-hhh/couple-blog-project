<template>
  <div class="gallery-container cream-theme">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <el-dialog
      v-model="showUpdateDialog"
      width="400px"
      :show-close="false"
      class="update-dialog"
      align-center
    >
      <div class="update-content">
        <div class="update-banner">
          <img src="@/assets/微信图片_20260209195436_136_99.jpg" alt="Update Banner">
          <div class="version-badge">v1.3.0</div>
          <div class="close-icon" @click="closeUpdateDialog">
            <el-icon><Close /></el-icon>
          </div>
        </div>

        <div class="update-body">
          <h2>🎉 欢迎来到 Couple Blog</h2>

          <div class="update-section">
            <h4>✨ 功能亮点</h4>
            <ul>
              <li>📸 <strong>时光轴功能</strong>：记录生活中的美好瞬间</li>
              <li>☁️ <strong>云端存储</strong>：照片安全保存在阿里云</li>
              <li>🎨 <strong>九宫格展示</strong>：智能布局，美观大方</li>
              <li>🔒 <strong>隐私保护</strong>：情侣空间完全隔离</li>
            </ul>
          </div>

          <div class="update-section developer-note">
            <h4>💌 关于我们</h4>
            <p>
              这是一个专为情侣打造的私密博客空间。<br>
              在这里，你们可以：<strong>共同记录时光、分享心情、留下寄语</strong>。<br>
              每一张照片、每一段文字，都是爱情的见证。<br><br>
              感谢选择我们，祝你们永远甜如蜜糖！🍬
            </p>
          </div>

          <div class="update-footer">
            <span class="developer-sign">— 刘同学 🐱</span>
          </div>
        </div>
      </div>
    </el-dialog>

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
        <img src="https://images.unsplash.com/photo-1516054575922-f0b8eeede20f?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&auto=format&fit=crop&q=80" alt="Hero" class="soft-img" />
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
import { ArrowRight, Close } from '@element-plus/icons-vue'

const router = useRouter()

// --- 版本更新弹窗逻辑 ---
const showUpdateDialog = ref(true) // 每次访问欢迎页都显示弹窗

const closeUpdateDialog = () => {
  showUpdateDialog.value = false
}

// --- 页面状态逻辑 ---
const isScrolled = ref(false)
const activeTab = ref('')
const navItems = ['Timeline', 'Album', 'Wishlist', 'Events']

const momentImages = [
  { src: 'https://images.unsplash.com/photo-1490810235433-239104826d29?auto=format&fit=crop&w=600&q=80', title: 'Sunday Brunch', user: 'Alice' },
  { src: 'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=600&q=80', title: 'Beach Day', user: 'Bob' },
  { src: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', title: 'Nature Walk', user: 'Alice' },
  { src: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=600&q=80', title: 'Our Cat', user: 'Bob' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleNavClick = (tab) => {
  activeTab.value = tab
  if (tab === 'Events') {
    scrollToActivity()
  } else {
    router.push('/login')
  }
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

/* CSS 变量 */
:root {
  --bg-cream: #FFFBF5;
  --primary-pink: #FF8FAB;
  --soft-blue: #B5EAD7;
  --soft-yellow: #FFDAC1;
  --text-main: #5D5D5D;
  --text-light: #9A9A9A;
  --shadow-soft: 0 10px 40px rgba(226, 212, 200, 0.4);
}

.gallery-container {
  min-height: 100vh;
  background-color: var(--bg-cream);
  color: var(--text-main);
  font-family: 'Nunito', sans-serif;
  overflow-x: hidden;
  position: relative;
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

/* 头部导航 */
.header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  box-sizing: border-box;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding: 15px 60px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
}

.logo { display: flex; align-items: center; gap: 12px; }
.logo-box {
  background: var(--text-main);
  color: #fff;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 16px;
}
.logo-text { font-size: 20px; font-weight: 700; }
.dot { color: var(--primary-pink); font-size: 30px; line-height: 0; }

.nav-menu {
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  padding: 6px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  gap: 5px;
}

.nav-item {
  padding: 8px 20px;
  border-radius: 40px;
  color: var(--text-main);
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1;
  border: 2px solid transparent;
}

.nav-item:hover {
  color: #D65A5A;
  background: #FFF0F0;
  border-color: #FFD1D1;
  transform: translateY(-2px);
}

.nav-item.active {
  background: var(--primary-pink);
  color: #fff;
  border-color: var(--primary-pink);
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 143, 171, 0.6);
}

.login-btn {
  background: var(--text-main);
  border: none;
  color: #fff;
  padding: 10px 24px;
  font-weight: 700;
  transition: all 0.3s;
}
.login-btn:hover { background: #000; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }

/* Hero Section */
.hero-section {
  padding: 160px 8% 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.hero-content { flex: 1; max-width: 600px; }

.tag-pill {
  display: inline-block;
  background: #fff;
  color: var(--text-main);
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.hero-title {
  font-size: 64px;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 25px;
  color: #333;
}

.highlight {
  color: var(--primary-pink);
  position: relative;
  z-index: 1;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 15px;
  background: rgba(255, 183, 178, 0.3);
  z-index: -1;
  border-radius: 4px;
}

.hero-desc {
  font-size: 18px;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 40px;
}

.primary-btn {
  background: var(--primary-pink);
  border: none;
  padding: 16px 36px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(255, 183, 178, 0.4);
  white-space: nowrap;
  width: fit-content;
  transition: all 0.3s;
}

.primary-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 30px rgba(255, 183, 178, 0.6);
}

.hero-image-wrapper { flex: 1; display: flex; justify-content: flex-end; }

.soft-img {
  width: 90%;
  max-width: 500px;
  border-radius: 40px;
  box-shadow: var(--shadow-soft);
  transform: rotate(3deg);
  transition: transform 0.5s ease;
}

.hero-section:hover .soft-img { transform: rotate(0deg) scale(1.02); }

/* Features Section */
.features-section {
  padding: 80px 10%;
  position: relative;
  z-index: 1;
}

.section-header.center { text-align: center; margin-bottom: 60px; }
.section-title { font-size: 36px; font-weight: 800; margin-bottom: 10px; color: #333; }
.section-subtitle { color: var(--text-light); font-size: 16px; }

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.bento-item {
  background: #fff;
  padding: 40px 30px;
  border-radius: 32px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.bento-item:hover { transform: translateY(-10px); box-shadow: var(--shadow-soft); }

/* 三种渐变主题色 */
.theme-pink { background: linear-gradient(135deg, #FFF0F0 0%, #FFFFFF 100%); }
.theme-blue { background: linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%); }
.theme-yellow { background: linear-gradient(135deg, #FFFCF0 0%, #FFFFFF 100%); }

.icon-circle {
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.content h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; color: #333; }
.content p { font-size: 14px; color: var(--text-light); }

.arrow-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  color: #333;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s;
}

.bento-item:hover .arrow-btn { opacity: 1; transform: scale(1); }

/* Activity Section */
.activity-section {
  padding: 0 10% 100px;
  position: relative;
  z-index: 1;
}

.clean-card {
  background: #fff;
  border-radius: 40px;
  display: flex;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  min-height: 320px;
  transition: transform 0.3s ease;
}

.clean-card:hover { transform: scale(1.01); }

.card-left {
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.status-tag {
  background: #FFE4E1;
  color: #D65A5A;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.clean-card h2 { font-size: 32px; font-weight: 800; margin-bottom: 15px; color: #333; }
.clean-card p { color: var(--text-light); margin-bottom: 30px; max-width: 400px; line-height: 1.6; }
.meta-info { font-weight: 700; color: #555; margin-bottom: 30px; }

.text-btn {
  background: none;
  border: none;
  color: #D65A5A;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.text-btn:hover { border-bottom-color: #D65A5A; }

.card-right { flex: 1.2; }
.card-right img { width: 100%; height: 100%; object-fit: cover; }

/* Moments Section */
.moments-section {
  padding: 0 10% 120px;
  position: relative;
  z-index: 1;
}

.moments-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.polaroid-card {
  background: #fff;
  padding: 15px 15px 25px 15px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.polaroid-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.img-frame {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #f8f8f8;
}

.img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.polaroid-card:hover img { transform: scale(1.1); }

.hover-heart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 40px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.polaroid-card:hover .hover-heart {
  transform: translate(-50%, -50%) scale(1);
}

.card-text { margin-top: 15px; text-align: center; }
.card-text h4 { font-size: 15px; font-weight: 700; color: #333; margin-bottom: 4px; }
.card-text span { font-size: 12px; color: var(--text-light); }

.footer { text-align: center; padding: 40px; color: var(--text-light); font-size: 14px; }

/* ==============================================
   🌟 弹窗样式
   ============================================== */
.update-dialog :deep(.el-dialog) {
  border-radius: 24px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.update-dialog :deep(.el-dialog__header) {
  display: none;
}

.update-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.update-content {
  background: #fff;
}

.update-banner {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.update-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.version-badge {
  position: absolute;
  top: 12px;
  right: 42px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--primary-pink);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

.close-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
  z-index: 10;
}

.close-icon:hover { background: rgba(0, 0, 0, 0.6); }

.update-body {
  padding: 24px 30px;
}

.update-body h2 {
  font-size: 22px;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.update-section {
  margin-bottom: 24px;
}

.update-section h4 {
  font-size: 15px;
  font-weight: 700;
  color: #444;
  margin-bottom: 12px;
}

.update-section ul {
  margin: 0;
  padding-left: 6px;
  list-style: none;
}

.update-section li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  position: relative;
  padding-left: 14px;
}

.update-section li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background: var(--primary-pink);
  border-radius: 50%;
}

.developer-note {
  background: #FFF5F7;
  border-radius: 16px;
  padding: 16px;
  border: 1px dashed rgba(255, 143, 171, 0.3);
}

.developer-note p {
  margin: 0;
  color: #666;
  font-size: 13px;
  line-height: 1.7;
}

.developer-note strong {
  color: var(--primary-pink);
}

.update-footer {
  text-align: right;
  margin-top: 16px;
}

.developer-sign {
  font-size: 12px;
  color: #999;
  font-style: italic;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column-reverse;
    padding: 100px 20px 60px;
    text-align: center;
  }

  .hero-image-wrapper {
    justify-content: center;
    margin-bottom: 40px;
  }

  .hero-title { font-size: 40px; }

  .hero-content {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .nav-menu { display: none; }

  .bento-grid, .moments-row {
    grid-template-columns: 1fr;
  }

  .clean-card {
    flex-direction: column;
  }

  .clean-card .card-right {
    height: 200px;
  }

  /* 弹窗移动端适配 */
  :deep(.el-dialog.update-dialog) {
    width: 85% !important;
    margin-top: 15vh !important;
  }

  .update-body {
    padding: 20px;
  }

  .update-body h2 {
    font-size: 18px;
  }
}
</style>
