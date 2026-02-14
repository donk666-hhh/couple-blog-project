<template>
  <div class="gallery-container cream-theme">
    <div class="noise-overlay"></div>

    <div class="clouds-container">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>

    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

    <!-- 更新弹窗组件 -->
    <UpdateDialog />

    <section class="hero-section">
      <div class="hero-content fade-in-up">
        <div class="tag-pill">✨ Our Little World</div>
        <h1 class="hero-title">Collecting <span class="highlight">Moments</span>,<br>Not Just Things.</h1>
        <p class="hero-desc">把我们的生活碎片，整理成最温柔的诗。<br>这里没有喧嚣，只有我们。</p>

        <div class="hero-actions">
          <button class="primary-btn sparkle-btn" @click="router.push('/login')">
            <span>Start Journey</span>
            <el-icon><ArrowRight /></el-icon>

            <div class="sparkles">
              <div v-for="n in 10" :key="n" class="sparkle"></div>
            </div>
          </button>
        </div>
      </div>

      <div class="hero-image-wrapper">
        <img src="@/assets/logo.png" alt="Hero" class="soft-img float-anim" />
        <div class="sticker sticker-love">❤️</div>
        <div class="sticker sticker-star">✨</div>
      </div>
    </section>

    <section class="features-section">
      <div class="section-header center fade-in-up" style="animation-delay: 0.2s;">
        <h2 class="section-title">Sweet Functions</h2>
        <p class="section-subtitle">为你准备的小确幸功能</p>
      </div>

      <div class="bento-grid">
        <div class="bento-item theme-pink glass-card" @click="router.push('/login')">
          <div class="item-bg-decor"></div>
          <div class="icon-circle">📅</div>
          <div class="content">
            <h3>Timeline</h3>
            <p>记录心动的每一天</p>
          </div>
          <div class="arrow-btn"><ArrowRight /></div>
        </div>

        <div class="bento-item theme-blue glass-card" @click="router.push('/login')">
          <div class="item-bg-decor"></div>
          <div class="icon-circle">☁️</div>
          <div class="content">
            <h3>Cloud Gallery</h3>
            <p>云端存储独家记忆</p>
          </div>
          <div class="arrow-btn"><ArrowRight /></div>
        </div>

        <div class="bento-item theme-yellow glass-card" @click="router.push('/login')">
          <div class="item-bg-decor"></div>
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
      <div class="clean-card glass-card hover-lift" @click="router.push('/login')">
        <div class="card-left">
          <span class="status-tag">Upcoming Event</span>
          <h2>Valentine's Letter 💌</h2>
          <p>一年一度的情书交换计划。在这个快节奏的时代，我们慢下来，写封信。</p>
          <div class="meta-info">
            <span>📅 Feb 14 - Feb 20</span>
          </div>
          <button class="text-btn">Join Now <el-icon class="icon-slide"><ArrowRight /></el-icon></button>
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
        <div class="polaroid-card tape-effect" v-for="(img, index) in momentImages" :key="index" @click="router.push('/login')" :style="{'--rot': (index % 2 === 0 ? '-2deg' : '3deg')}">
          <div class="img-frame">
            <img :src="img.src" :alt="img.title">
            <div class="hover-heart">❤️</div>
          </div>
          <div class="card-text">
            <h4 class="handwriting-font">{{ img.title }}</h4>
            <span>{{ img.user }}</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 Couple Blog. Made with 🥛 & 🍯.</p>
    </footer>
  </div>
  <FloatingDock />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import FloatingDock from "@/components/FloatingDock.vue"
import UpdateDialog from "@/components/UpdateDialog.vue"

const router = useRouter()

// --- 页面数据 ---
const momentImages = [
  { src: 'https://images.unsplash.com/photo-1490810235433-239104826d29?auto=format&fit=crop&w=600&q=80', title: 'Sunday Brunch', user: 'Alice' },
  { src: 'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=600&q=80', title: 'Beach Day', user: 'Bob' },
  { src: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', title: 'Nature Walk', user: 'Alice' },
  { src: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=600&q=80', title: 'Our Cat', user: 'Bob' }
]
</script>

<style scoped>
/* 使用系统字体栈，替代 Google Fonts */

/* CSS 变量 */
:root {
  --bg-cream: #FFFBF5;
  --primary-pink: #FF8FAB;
  --primary-pink-hover: #ff7596;
  --soft-blue: #B5EAD7;
  --soft-yellow: #FFDAC1;
  --text-main: #4a4a4a;
  --text-light: #888888;
  --shadow-soft: 0 10px 40px rgba(226, 212, 200, 0.4);
  --shadow-hover: 0 20px 50px rgba(226, 212, 200, 0.6);
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(255, 255, 255, 0.8);
}

.gallery-container {
  min-height: 100vh;
  background-color: var(--bg-cream);
  color: var(--text-main);
  font-family: 'PingFang SC', 'Nunito', 'Microsoft YaHei', sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* 🆕 噪点纹理：让背景更有纸质感，不那么“电子味” */
.noise-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0.04;
  z-index: 1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
}

/* 🆕 动态背景光斑：增加呼吸感 */
.bg-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
  animation: blobFloat 10s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
.blob-1 { width: 500px; height: 500px; background: #FFDAC1; top: -100px; left: -100px; animation-duration: 15s; }
.blob-2 { width: 400px; height: 400px; background: #E2F0CB; bottom: 0; right: -50px; animation-duration: 12s; animation-delay: -5s; }
.blob-3 { width: 300px; height: 300px; background: #FFB7B2; top: 40%; left: 30%; opacity: 0.4; animation-duration: 20s; animation-delay: -8s; }

@keyframes blobFloat {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 40px) scale(1.1); }
}

/* Hero Section */
.hero-section {
  padding: 120px 8% 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2; /* 提高层级在噪点之上 */
}

.hero-content { flex: 1; max-width: 600px; }

/* 简单的入场动画 */
.fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.tag-pill {
  display: inline-block;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(5px);
  color: var(--text-main);
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 25px;
  border: 1px solid rgba(255,255,255,0.5);
}

.hero-title {
  font-size: 68px;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 25px;
  color: #333;
  letter-spacing: -1px;
}

.highlight {
  color: var(--primary-pink);
  position: relative;
  z-index: 1;
  display: inline-block;
}

/* 🆕 优化高亮样式：更柔和的马克笔效果 */
.highlight::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: -5px;
  width: 105%;
  height: 20px;
  background: #ffc2d1;
  z-index: -1;
  border-radius: 4px;
  transform: rotate(-2deg);
  opacity: 0.6;
}

.hero-desc {
  font-size: 18px;
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 40px;
}

.primary-btn {
  background: var(--primary-pink);
  border: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(255, 143, 171, 0.5);
  white-space: nowrap;
  width: fit-content;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

}

.primary-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 35px rgba(255, 143, 171, 0.7);
  background: var(--primary-pink-hover);
}

.hero-image-wrapper { flex: 1; display: flex; justify-content: flex-end; position: relative; }

.soft-img {
  width: 90%;
  max-width: 520px;
  border-radius: 40px;
  box-shadow: var(--shadow-soft);
  transform: rotate(3deg);
  transition: transform 0.5s ease;
  z-index: 2;
}

/* 🆕 悬浮动画 */
.float-anim {
  animation: floatImage 6s ease-in-out infinite;
}
@keyframes floatImage {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
}

/* 🆕 装饰贴纸 */
.sticker {
  position: absolute;
  font-size: 40px;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  z-index: 3;
  animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  opacity: 0;
}
.sticker-love { top: -20px; right: 20px; transform: rotate(15deg); animation-delay: 0.5s; }
.sticker-star { bottom: 40px; left: 10px; transform: rotate(-15deg); animation-delay: 0.7s; font-size: 30px; }

@keyframes popIn {
  from { transform: scale(0) rotate(0deg); opacity: 0; }
  to { transform: scale(1) rotate(0deg); opacity: 1; }
}

/* Features Section */
.features-section {
  padding: 60px 10%;
  position: relative;
  z-index: 2;
}

.section-header.center { text-align: center; margin-bottom: 60px; }
.section-title { font-size: 40px; font-weight: 800; margin-bottom: 12px; color: #333; letter-spacing: -0.5px; }
.section-subtitle { color: var(--text-light); font-size: 16px; letter-spacing: 1px; text-transform: uppercase; }

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* 🆕 毛玻璃卡片通用样式 */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}

.bento-item {
  padding: 40px 30px;
  border-radius: 32px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* 🆕 3D 视角 */
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.bento-item:hover {
  transform: translateY(-10px) rotateX(2deg);
  box-shadow: var(--shadow-hover);
  background: rgba(255,255,255,0.9);
}

/* 装饰背景圆 */
.item-bg-decor {
  position: absolute;
  top: -50px; right: -50px;
  width: 150px; height: 150px;
  border-radius: 50%;
  opacity: 0.1;
  transition: transform 0.5s;
}
.theme-pink .item-bg-decor { background: #FF8FAB; }
.theme-blue .item-bg-decor { background: #B5EAD7; }
.theme-yellow .item-bg-decor { background: #ffd166; }

.bento-item:hover .item-bg-decor { transform: scale(1.5); }

.icon-circle {
  width: 64px;
  height: 64px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
  transition: transform 0.3s;
}

.bento-item:hover .icon-circle { transform: scale(1.1) rotate(5deg); }

.content h3 { font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #333; }
.content p { font-size: 15px; color: var(--text-light); }

.arrow-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  background: #333;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bento-item:hover .arrow-btn { opacity: 1; transform: scale(1) rotate(0); }

/* Activity Section */
.activity-section {
  padding: 40px 10% 100px;
  position: relative;
  z-index: 2;
}

.clean-card {
  border-radius: 40px;
  display: flex;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.clean-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.card-left {
  flex: 1;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}

/* 装饰纹理 */
.card-left::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(#D65A5A 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.05;
  pointer-events: none;
}

.status-tag {
  background: #FFE4E1;
  color: #D65A5A;
  font-size: 12px;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(214, 90, 90, 0.15);
}

.clean-card h2 { font-size: 36px; font-weight: 800; margin-bottom: 15px; color: #333; }
.clean-card p { color: #666; margin-bottom: 35px; max-width: 420px; line-height: 1.7; font-size: 16px; }

.meta-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #555;
  margin-bottom: 35px;
  background: rgba(255,255,255,0.6);
  padding: 8px 15px;
  border-radius: 12px;
}

.text-btn {
  background: none;
  border: none;
  color: #D65A5A;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.2s;
}

.text-btn:hover { gap: 12px; }
.icon-slide { transition: transform 0.2s; }

.card-right { flex: 1.2; position: relative; overflow: hidden; }
.card-right img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.clean-card:hover .card-right img { transform: scale(1.05); }

/* Moments Section */
.moments-section {
  padding: 0 10% 120px;
  position: relative;
  z-index: 2;
}

.moments-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding-top: 20px; /* 留出胶带的空间 */
}

/* 🆕 拍立得卡片增强 */
.polaroid-card {
  background: #fff;
  padding: 12px 12px 50px 12px; /* 底部留白多一点，像拍立得 */
  border-radius: 4px; /* 拍立得不需要大圆角 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate(var(--rot)); /* 随机倾斜 */
  position: relative;
}

/* 🆕 CSS 纸胶带效果 */
.tape-effect::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 30px;
  background: rgba(255, 255, 255, 0.4);
  border-left: 1px dashed rgba(0,0,0,0.05);
  border-right: 1px dashed rgba(0,0,0,0.05);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  z-index: 10;
  opacity: 0.8;
  /* 制作胶带边缘 */
  clip-path: polygon(0% 10%, 2% 0%, 5% 10%, 10% 0%, 15% 10%, 20% 0%, 25% 10%, 30% 0%, 35% 10%, 40% 0%, 45% 10%, 50% 0%, 55% 10%, 60% 0%, 65% 10%, 70% 0%, 75% 10%, 80% 0%, 85% 10%, 90% 0%, 95% 10%, 100% 0%, 100% 90%, 98% 100%, 95% 90%, 90% 100%, 85% 90%, 80% 100%, 75% 90%, 70% 100%, 65% 90%, 60% 100%, 55% 90%, 50% 100%, 45% 90%, 40% 100%, 35% 90%, 30% 100%, 25% 90%, 20% 100%, 15% 90%, 10% 100%, 5% 90%, 2% 100%, 0% 90%);
}
.theme-blue-tape::before { background: #B5EAD7; } /* 可扩展不同颜色的胶带 */

.polaroid-card:hover {
  transform: translateY(-10px) rotate(0deg) scale(1.05); /* 悬浮时摆正放大 */
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.img-frame {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
  background: #333; /* 图片加载前的底色 */
  filter: sepia(10%); /* 复古滤镜 */
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
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 50px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 2px 10px rgba(0,0,0,0.2));
}

.polaroid-card:hover .hover-heart {
  transform: translate(-50%, -50%) scale(1);
}

.card-text { margin-top: 20px; text-align: center; }
.card-text h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; /* 手写体感觉 */
}
.card-text span { font-size: 13px; color: var(--text-light); letter-spacing: 1px; text-transform: uppercase; }

.footer {
  text-align: center;
  padding: 60px 40px;
  color: var(--text-light);
  font-size: 14px;
  border-top: 1px dashed rgba(0,0,0,0.05);
  margin-top: 40px;
  position: relative;
  z-index: 2;
}

/* 云朵动画保持不变，此处省略重复代码，上面HTML已包含 */
.clouds-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden; }
.cloud { position: absolute; background: #fff; border-radius: 100px; box-shadow: 0 8px 5px rgba(0,0,0,0.03); animation: floatCloud linear infinite; opacity: 0.8; }
.cloud::after, .cloud::before { content: ''; position: absolute; background: inherit; border-radius: 50%; }
.cloud::after { width: 50px; height: 50px; top: -25px; left: 25px; }
.cloud::before { width: 40px; height: 40px; top: -18px; left: 60px; }
.cloud-1 { width: 120px; height: 40px; top: 15%; left: -20%; animation-duration: 45s; opacity: 0.6; }
.cloud-2 { width: 160px; height: 50px; top: 35%; left: -10%; animation-duration: 60s; animation-delay: -15s; opacity: 0.5; transform: scale(1.2); }
.cloud-3 { width: 100px; height: 35px; top: 65%; left: -15%; animation-duration: 55s; animation-delay: -25s; opacity: 0.7; }
@keyframes floatCloud { 0% { left: -20%; } 100% { left: 120%; } }

/* 按钮发光 & 星星 CSS */
.sparkle-btn { position: relative; overflow: visible; transition: transform 0.3s; }
.sparkle-btn::before { content: ''; position: absolute; top: -3px; left: -3px; right: -3px; bottom: -3px; background: linear-gradient(45deg, #ff8fab, #ffd166, #06d6a0, #118ab2, #ff8fab); background-size: 400%; z-index: -1; border-radius: 50px; opacity: 0; transition: opacity 0.3s; animation: glowing 20s linear infinite; }
.sparkle-btn:hover::before { opacity: 1; }
@keyframes glowing { 0% { background-position: 0 0; } 50% { background-position: 400% 0; } 100% { background-position: 0 0; } }
.sparkles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; border-radius: 50px; }
.sparkle { position: absolute; width: 4px; height: 4px; background: white; border-radius: 50%; opacity: 0; box-shadow: 0 0 5px #fff; animation: sparkleAnim 2s infinite ease-in-out; }
.sparkle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 80%; left: 70%; animation-delay: 0.3s; }
.sparkle:nth-child(3) { top: 40%; left: 40%; animation-delay: 0.6s; }
.sparkle:nth-child(4) { top: 20%; left: 80%; animation-delay: 0.9s; }
.sparkle:nth-child(5) { top: 60%; left: 10%; animation-delay: 1.2s; }
@keyframes sparkleAnim { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }

/* 📱 移动端适配 */
@media (max-width: 768px) {
  /* Hero Section */
  .hero-section {
    flex-direction: column;
    padding: 80px 20px 60px;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
    order: 2; /* 内容放下面 */
  }

  .hero-image-wrapper {
    order: 1; /* 图片放上面 */
    justify-content: center;
    margin-bottom: 30px;
  }

  .soft-img {
    width: 70%;
    max-width: 280px;
    transform: rotate(3deg) translateY(0);
  }

  .hero-title {
    font-size: 42px;
    line-height: 1.2;
  }

  .hero-desc {
    font-size: 16px;
  }

  .tag-pill {
    font-size: 12px;
    padding: 6px 14px;
  }

  .primary-btn {
    padding: 12px 28px;
    font-size: 14px;
    margin: 0 auto;
  }

  /* Features Section */
  .features-section {
    padding: 40px 20px;
  }

  .section-title {
    font-size: 28px;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .bento-item {
    padding: 24px 20px;
  }

  .icon-circle {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }

  .content h3 { font-size: 18px; }
  .content p { font-size: 13px; }

  .arrow-btn {
    width: 36px;
    height: 36px;
    font-size: 16px;
    bottom: 16px;
    right: 16px;
  }

  /* Activity Section */
  .activity-section {
    padding: 30px 20px 60px;
  }

  .clean-card {
    flex-direction: column;
  }

  .card-left {
    padding: 30px 20px;
  }

  .card-left h2 {
    font-size: 24px;
  }

  .card-left p {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .meta-info {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .card-right {
    min-height: 200px;
  }

  /* Moments Section */
  .moments-section {
    padding: 0 20px 80px;
  }

  .moments-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .polaroid-card {
    transform: rotate(0deg) !important; /* 移动端不倾斜 */
  }

  .card-text h4 {
    font-size: 14px;
  }

  .card-text span {
    font-size: 10px;
  }

  /* Blobs smaller */
  .blob-1 { width: 250px; height: 250px; }
  .blob-2 { width: 200px; height: 200px; }
  .blob-3 { width: 150px; height: 150px; }

  /* Stickers smaller */
  .sticker {
    font-size: 28px;
  }

  /* Footer */
  .footer {
    padding: 40px 20px;
    font-size: 12px;
  }
}

/* 超小屏幕适配 (< 375px) */
@media (max-width: 374px) {
  .moments-row {
    grid-template-columns: 1fr;
  }
}

/* 移动端修正 */
@media (max-width: 768px) {
  /* Hero Section */
  .hero-section {
    flex-direction: column;
    padding: 80px 20px 60px;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-image-wrapper {
    order: 1;
    justify-content: center;
    margin-bottom: 30px;
  }

  .soft-img {
    width: 70%;
    max-width: 280px;
    transform: rotate(3deg) translateY(0);
  }

  .hero-title {
    font-size: 42px;
    line-height: 1.2;
  }

  .hero-desc {
    font-size: 16px;
  }

  .tag-pill {
    font-size: 12px;
    padding: 6px 14px;
  }

  .primary-btn {
    padding: 12px 28px;
    font-size: 14px;
    margin: 0 auto;
  }

  /* Features Section */
  .features-section {
    padding: 40px 20px;
  }

  .section-title {
    font-size: 28px;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .bento-item {
    padding: 24px 20px;
  }

  .icon-circle {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }

  .content h3 {
    font-size: 18px;
  }

  .content p {
    font-size: 13px;
  }

  .arrow-btn {
    width: 36px;
    height: 36px;
    font-size: 16px;
    bottom: 16px;
    right: 16px;
  }

  /* Activity Section */
  .activity-section {
    padding: 30px 20px 60px;
  }

  .clean-card {
    flex-direction: column;
  }

  .card-left {
    padding: 30px 20px;
  }

  .card-left h2 {
    font-size: 24px;
  }

  .card-left p {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .meta-info {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .card-right {
    min-height: 200px;
  }

  /* Moments Section */
  .moments-section {
    padding: 0 20px 80px;
  }

  .moments-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-top: 20px;
  }

  .polaroid-card {
    transform: rotate(0deg) !important;
  }

  .card-text h4 {
    font-size: 14px;
  }

  .card-text span {
    font-size: 10px;
  }

  /* Blobs smaller */
  .blob-1 { width: 250px; height: 250px; }
  .blob-2 { width: 200px; height: 200px; }
  .blob-3 { width: 150px; height: 150px; }

  /* Stickers smaller */
  .sticker {
    font-size: 28px;
  }

  /* Footer */
  .footer {
    padding: 40px 20px;
    font-size: 12px;
  }
}
</style>