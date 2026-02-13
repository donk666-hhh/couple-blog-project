<template>
  <div class="roadmap-container cream-theme">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

    <header class="header">
      <div class="logo">
        <div class="logo-box">R/D</div>
        <span class="logo-text">Roadmap</span>
      </div>
      <div class="actions">
        <el-button class="back-btn" round @click="router.push('/home')">
          <el-icon><ArrowLeft /></el-icon> Back Home
        </el-button>
      </div>
    </header>

    <section class="hero-section">
      <div class="hero-content">
        <div class="tag-pill">🗺️ 开发计划</div>
        <h1 class="hero-title">功能开发路线</h1>
        <p class="hero-desc">记录我们的点点滴滴，开发进度一目了然</p>
      </div>
      <div class="hero-image-wrapper">
        <img src="https://images.unsplash.com/photo-151632715025-24a22f8a69?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&auto=format&fit=crop&q=80" alt="Hero" class="soft-img" />
      </div>
    </section>

    <section class="stats-section">
      <div class="section-header center">
        <h2 class="section-title">📊 开发进度</h2>
        <p class="section-subtitle">功能完成度一览</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card done">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h4>已完成</h4>
            <p class="stat-desc">用户系统、情侣绑定、心情状态、时光轴、留言板</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 90%"></div>
            </div>
          </div>
        </div>

        <div class="stat-card progress">
          <div class="stat-icon">🚧</div>
          <div class="stat-content">
            <h4>开发中</h4>
            <p class="stat-desc">相册上传、愿望清单、发布动态</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 40%"></div>
            </div>
          </div>
        </div>

        <div class="stat-card todo">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h4>待开发</h4>
            <p class="stat-desc">博客文章、活动系统、评论功能、天气 API</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 10%"></div>
            </div>
          </div>
        </div>

        <div class="stat-card done">
          <div class="stat-icon">🎨</div>
          <div class="stat-content">
            <h4>UI/UX</h4>
            <p class="stat-desc">响应式设计、毛玻璃效果、动画交互</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 85%"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">📋 功能列表</h2>
        <p class="section-subtitle">计划中的功能模块</p>
      </div>

      <div class="features-grid">
        <!-- 相册模块 -->
        <div class="feature-card">
          <div class="feature-status todo">待开发</div>
          <div class="feature-icon">📷</div>
          <div class="feature-content">
            <h3>相册功能</h3>
            <p class="feature-desc">情侣专属的照片空间</p>
            <ul class="task-list">
              <li class="task-item">☁️ 云端存储照片</li>
              <li class="task-item">🗂️ 创建相册分类</li>
              <li class="task-item">🖼️ 图片上传功能</li>
              <li class="task-item">🗑️ 删除照片</li>
              <li class="task-item">🏷️ 九宫格展示</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-todo">TODO</span>
              <span class="priority">P1</span>
            </div>
          </div>
        </div>

        <!-- 愿望清单 -->
        <div class="feature-card">
          <div class="feature-status todo">待开发</div>
          <div class="feature-icon">⭐</div>
          <div class="feature-content">
            <h3>愿望清单</h3>
            <p class="feature-desc">一起实现的小目标</p>
            <ul class="task-list">
              <li class="task-item">➕ 创建新愿望</li>
              <li class="task-item">✏️ 编辑愿望内容</li>
              <li class="task-item">💰 更新进度/金额</li>
              <li class="task-item">✅ 标记为已实现</li>
              <li class="task-item">🖼️ 上传还愿照片</li>
              <li class="task-item">🗑️ 删除愿望</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-todo">TODO</span>
              <span class="priority">P1</span>
            </div>
          </div>
        </div>

        <!-- 发布动态 -->
        <div class="feature-card">
          <div class="feature-status progress">开发中</div>
          <div class="feature-icon">✍️</div>
          <div class="feature-content">
            <h3>发布动态</h3>
            <p class="feature-desc">记录生活中的美好瞬间</p>
            <ul class="task-list">
              <li class="task-item done">📝 发布弹窗组件</li>
              <li class="task-item done">✏️ 编辑标题和内容</li>
              <li class="task-item">🖼️ 上传封面图片</li>
              <li class="task-item">🖼️ 上传多张配图</li>
              <li class="task-item">⚙️ 设置权限（公开/情侣/私密）</li>
              <li class="task-item">🗑️ 删除动态</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-progress">进行中</span>
              <span class="priority">P0</span>
            </div>
          </div>
        </div>

        <!-- 博客文章 -->
        <div class="feature-card disabled">
          <div class="feature-status todo">计划中</div>
          <div class="feature-icon">📰</div>
          <div class="feature-content">
            <h3>博客文章</h3>
            <p class="feature-desc">长篇图文的内容管理</p>
            <ul class="task-list">
              <li class="task-item">📝 文章列表页</li>
              <li class="task-item">📄 文章详情页</li>
              <li class="task-item">✏️ 富文本编辑器</li>
              <li class="task-item">💬  评论系统</li>
              <li class="task-item">🏷️ Markdown 支持</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-todo">TODO</span>
              <span class="priority">P2</span>
            </div>
          </div>
        </div>

        <!-- 活动系统 -->
        <div class="feature-card disabled">
          <div class="feature-status todo">计划中</div>
          <div class="feature-icon">🎉</div>
          <div class="feature-content">
            <h3>官方活动</h3>
            <p class="feature-desc">平台组织的特色活动</p>
            <ul class="task-list">
              <li class="task-item">🎊 活动列表展示</li>
              <li class="task-item">📋 活动详情页</li>
              <li class="task-item">➕️ 参与活动报名</li>
              <li class="task-item">🏆 活动倒计时</li>
              <li class="task-item">🎁 活动奖励机制</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-todo">TODO</span>
              <span class="priority">P2</span>
            </div>
          </div>
        </div>

        <!-- 天气组件 -->
        <div class="feature-card todo">
          <div class="feature-status todo">待开发</div>
          <div class="feature-icon">🌤️</div>
          <div class="feature-content">
            <h3>天气组件</h3>
            <p class="feature-desc">根据城市动态获取天气</p>
            <ul class="task-list">
              <li class="task-item">🌐️ 接入天气 API</li>
              <li class="task-item">🌡️ 动态天气图标</li>
              <li class="task-item">🌡️ 温度实时显示</li>
              <li class="task-item">📍 城市选择器</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-todo">TODO</span>
              <span class="priority">P1</span>
            </div>
          </div>
        </div>

        <!-- 评论系统 -->
        <div class="feature-card disabled">
          <div class="feature-status todo">计划中</div>
          <div class="feature-icon">💬</div>
          <div class="feature-content">
            <h3>评论系统</h3>
            <p class="feature-desc">文章互动的核心功能</p>
            <ul class="task-list">
              <li class="task-item">💬 发表评论</li>
              <li class="task-item">😊 表情回复</li>
              <li class="task-item">🔔 评论通知</li>
              <li class="task-item">💭 评论管理</li>
            </ul>
            <div class="feature-meta">
              <span class="badge badge-todo">TODO</span>
              <span class="priority">P2</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="priority-section">
      <div class="section-header center">
        <h2 class="section-title">🎯 开发优先级</h2>
        <p class="section-subtitle">按重要性划分的功能开发顺序</p>
      </div>

      <div class="priority-grid">
        <div class="priority-card p0">
          <div class="priority-label">P0 核心功能</div>
          <p class="priority-desc">用户体验的核心功能，需要优先开发</p>
          <ul class="priority-list">
            <li>✍️ 发布动态功能</li>
            <li>📷 相册上传功能</li>
            <li>📝 留言板完善</li>
          </ul>
        </div>

        <div class="priority-card p1">
          <div class="priority-label">P1 重要功能</div>
          <p class="priority-desc">完善用户体验的重要功能</p>
          <ul class="priority-list">
            <li>⭐️ 愿望清单</li>
            <li>🌤️ 天气组件</li>
            <li>🎨 UI/UX 优化</li>
          </ul>
        </div>

        <div class="priority-card p2">
          <div class="priority-label">P2 增强功能</div>
          <p class="priority-desc">内容生态和运营相关功能</p>
          <ul class="priority-list">
            <li>📰 博客文章</li>
            <li>🎉 官方活动</li>
            <li>💬 评论系统</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="tech-section">
      <div class="section-header center">
        <h2 class="section-title">🛠️ 技术栈</h2>
        <p class="section-subtitle">项目使用的技术和工具</p>
      </div>

      <div class="tech-grid">
        <div class="tech-card frontend">
          <h4>🎨 前端</h4>
          <div class="tech-list">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Vite 7.3</span>
            <span class="tech-tag">Element Plus</span>
            <span class="tech-tag">Vue Router 4</span>
            <span class="tech-tag">Axios</span>
          </div>
        </div>

        <div class="tech-card backend">
          <h4>⚙️ 后端</h4>
          <div class="tech-list">
            <span class="tech-tag">Spring Boot 3.3.4</span>
            <span class="tech-tag">MyBatis-Plus</span>
            <span class="tech-tag">Spring Security</span>
            <span class="tech-tag">MySQL 8.0</span>
            <span class="tech-tag">JWT</span>
          </div>
        </div>

        <div class="tech-card tools">
          <h4>🔧 开发工具</h4>
          <div class="tech-list">
            <span class="tech-tag">VS Code</span>
            <span class="tech-tag">Maven</span>
            <span class="tech-tag">Git</span>
            <span class="tech-tag">Swagger UI</span>
          </div>
        </div>

        <div class="tech-card database">
          <h4>💾 数据库</h4>
          <div class="tech-list">
            <span class="tech-tag">MySQL 8.0</span>
            <span class="tech-tag">9 张核心表</span>
            <span class="tech-tag">utf8mb4</span>
            <span class="tech-tag">逻辑删除</span>
          </div>
        </div>
      </div>
    </section>

    <section class="changelog-section">
      <div class="section-header center">
        <h2 class="section-title">📝 更新日志</h2>
        <p class="section-subtitle">最近的版本更新记录</p>
      </div>

      <div class="timeline">
        <div class="timeline-item latest">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="version">v2.0.1</div>
            <div class="date">2026-02-12</div>
            <h3>🎉 留言板增强</h3>
            <p>
              ✨ 便签墙页面 - 记录你的心情寄语<br>
              🎨 4种便签颜色 - yellow/pink/blue/green 自由选择<br>
              📌 置顶功能 - 首页显示最重要的便签<br>
              ✏️ 心情贴纸 - 带上 Emoji 表达此刻心情<br>
              💬 即时编辑 - 随时修改已发布的便签
            </p>
            <div class="tags">
              <span class="tag feature">前端</span>
              <span class="tag backend">后端</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="version">v2.0.0</div>
            <div class="date">2026-02-10</div>
            <h3>🚀 基础架构搭建</h3>
            <p>
              🏗️ Monorepo 结构 - 前后端分离<br>
              🔐 三层架构设计 - Controller/Service/Mapper<br>
              📝 完整数据库设计 - 9张核心表<br>
              🔐 JWT 认证 - 无状态安全机制<br>
              🎨 响应式设计 - 移动端适配<br>
              ✨ Happy/Resting 双状态系统
            </p>
            <div class="tags">
              <span class="tag fullstack">全栈</span>
              <span class="tag database">数据库</span>
              <span class="tag security">安全</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 Couple Blog. Made with 🥛 & 🍯.</p>
      <p class="footer-note">💡 感谢选择我们，祝你们永远甜如蜜糖！🍬</p>
    </footer>
  </div>
  <FloatingDock />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import FloatingDock from "@/components/FloatingDock.vue";

const router = useRouter()
</script>

<style scoped>
/* 使用系统字体栈，替代 Google Fonts */

/* CSS 变量 */
:root {
  --bg-cream: #FFFBF5;
  --primary-pink: #FF8FAB;
  --soft-blue: #B5EAD7;
  --soft-yellow: #FFDAC1;
  --text-main: #5D5D5D;
  --text-light: #9A9A9A;
  --shadow-soft: 0 10px 40px rgba(226, 212, 200, 0.4);
  --todo-bg: #FFF5F7;
  --progress-bg: #E8F5E9;
  --done-color: #52C41A;
}

.roadmap-container {
  min-height: 100vh;
  background-color: var(--bg-cream);
  color: var(--text-main);
  font-family: 'PingFang SC', 'Nunito', 'Microsoft YaHei', sans-serif;
  padding: 20px 20px 100px;
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
.blob-1 { width: 400px; height: 400px; background: #FFDAC1; top: -100px; left: -50px; }
.blob-2 { width: 300px; height: 300px; background: #B5EAD7; bottom: 100px; right: -50px; }
.blob-3 { width: 250px; height: 250px; background: #FFDAC1; top: 40%; left: 40%; opacity: 0.4; }

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 100;
}

.logo-box {
  background: var(--text-main);
  color: #fff;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 16px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
}

.back-btn {
  background: var(--text-main);
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
}

.back-btn:hover {
  background: var(--primary-pink);
  transform: translateX(-3px);
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 10%;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
}

.tag-pill {
  display: inline-block;
  background: #fff;
  color: var(--text-main);
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  color: #333;
  margin-bottom: 10px;
}

.hero-desc {
  font-size: 16px;
  color: var(--text-light);
}

.hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.soft-img {
  width: 400px;
  border-radius: 32px;
  box-shadow: var(--shadow-soft);
}

/* Stats Section */
.stats-section {
  padding: 60px 10%;
  position: relative;
  z-index: 1;
}

.section-header.center {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  color: #333;
  margin-bottom: 10px;
}

.section-subtitle {
  color: var(--text-light);
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  gap: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-soft);
  text-align: center;
}

.stat-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.stat-content h4 {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stat-desc {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 12px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.done .progress-fill { background: var(--done-color); }
.progress .progress-fill { background: var(--progress-bg); }
.todo .progress-fill { background: var(--todo-bg); }

/* Features Section */
.features-section {
  padding: 60px 10%;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 24px;
}

.feature-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}

.feature-status {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.feature-status.todo { background: var(--todo-bg); color: #fff; }
.feature-status.progress { background: var(--progress-bg); color: #fff; }
.feature-status.done { background: var(--done-color); color: #fff; }
.feature-status.disabled { background: #e0e0e0; color: #999; }

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature-content h3 {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 16px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-item.done {
  color: #999;
  text-decoration: line-through;
}

.feature-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.badge {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
}

.badge-todo { background: var(--todo-bg); color: #fff; }
.badge-progress { background: var(--progress-bg); color: #fff; }
.badge-done { background: var(--done-color); color: #fff; }

.priority {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 700;
}

.p0 .priority { background: #FF6B6B; color: #fff; }
.p1 .priority { background: #FFB347; color: #fff; }
.p2 .priority { background: #F5F5F5; color: #666; }

/* Priority Section */
.priority-section {
  padding: 60px 10%;
}

.priority-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  gap: 20px;
}

.priority-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-soft);
}

.priority-label {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  padding: 8px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: inline-block;
}

.p0 .priority-label { background: #FF6B6B; }
.p1 .priority-label { background: #FFB347; }
.p2 .priority-label { background: #F5F5F5; }

.priority-desc {
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 12px;
}

.priority-list {
  list-style: none;
  padding: 0;
}

.priority-list li {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
  padding-left: 20px;
  position: relative;
}

.priority-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-pink);
}

/* Tech Section */
.tech-section {
  padding: 60px 10%;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 20px;
}

.tech-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-soft);
}

.tech-card h4 {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: #f0f0f0;
  color: #666;
}

/* Changelog Section */
.changelog-section {
  padding: 60px 10%;
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -30px;
  top: 0;
  bottom: 0;
  width: 2px;
  height: 100%;
  background: #e0e0e0;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: var(--primary-pink);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
}

.version {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-pink);
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255, 143, 171, 0.1);
}

.date {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 4px;
}

.timeline-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.timeline-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.tags {
  display: flex;
  gap: 6px;
  margin-top: 12px;
}

.tag {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.tag.feature { background: #E3F2FD; color: #fff; }
.tag.backend { background: #9575BD; color: #fff; }
.tag.fullstack { background: #673AB7; color: #fff; }
.tag.database { background: #4CAF50; color: #fff; }
.tag.security { background: #FF5722; color: #fff; }

/* Footer */
.footer {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-light);
  font-size: 14px;
}

.footer-note {
  font-size: 13px;
  margin-top: 10px;
}

/* Floating Dock */
:deep(.floating-dock) {
  z-index: 100;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .stats-grid, .features-grid, .priority-grid, .tech-grid {
    grid-template-columns: 1fr;
  }

  .hero-section {
    flex-direction: column;
    padding: 40px 20px;
  }

  .soft-img {
    width: 100%;
  }

  .hero-title {
    font-size: 32px;
  }
}
</style>
