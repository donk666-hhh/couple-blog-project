<template>
  <div class="login-container">
    <canvas ref="bgCanvas" class="dynamic-bg-canvas"></canvas>
    <div class="bg-overlay"></div>

    <div class="content-wrapper">
      <div class="top-back" @click="router.push('/')">
        <el-icon><Back /></el-icon> <span>Back to Gallery</span>
      </div>

      <div class="auth-card">
        <div class="card-header">
          <div class="brand">欢迎使用</div>
          <h2 class="title">{{ isRegister ? 'Create Account' : '登录' }}</h2>
          <p class="subtitle">
            {{ isRegister ? '开启你们的独家记忆' : '登录以延续美好的故事' }}
          </p>
        </div>

        <div class="form-body">
          <el-form v-if="!isRegister" class="minimal-form">
            <div class="input-group">
              <span class="input-label">Username</span>
              <el-input v-model="loginForm.username" placeholder="请输入账号" class="custom-input" />
            </div>
            <div class="input-group">
              <span class="input-label">Password</span>
              <el-input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  class="custom-input"
                  show-password
              />
            </div>
            <div class="form-extras">
              <el-checkbox v-model="rememberMe" label="Remember me" size="small" />
              <span class="forgot-link">Forgot password?</span>
            </div>
            <button class="action-btn" @click.prevent="handleLogin">
              <span v-if="!loading">SIGN IN</span>
              <span v-else>LOADING...</span>
            </button>
          </el-form>

          <el-form v-else class="minimal-form">
            <div class="input-group">
              <span class="input-label">Account</span>
              <el-input v-model="registerForm.username" placeholder="设置账号" class="custom-input" />
            </div>
            <div class="input-group">
              <span class="input-label">Nickname</span>
              <el-input v-model="registerForm.nickname" placeholder="你的昵称" class="custom-input" />
            </div>
            <div class="input-group">
              <span class="input-label">Password</span>
              <el-input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="设置密码"
                  class="custom-input"
              />
            </div>
            <button class="action-btn" @click.prevent="handleRegister">
              <span v-if="!loading">JOIN US</span>
              <span v-else>CREATING...</span>
            </button>
          </el-form>
        </div>

        <div class="card-footer">
          <p v-if="!isRegister">
            New here? <a @click="toggleMode">Create an account</a>
          </p>
          <p v-else>
            Already have an account? <a @click="toggleMode">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { userApi } from '@/api'

// --- 原有逻辑 ---
const router = useRouter()
const isRegister = ref(false)
const loading = ref(false)
const rememberMe = ref(false)
const loginForm = reactive({ username: '', password: '' })
const registerForm = reactive({ username: '', nickname: '', password: '' })

const toggleMode = () => {
  isRegister.value = !isRegister.value
  loginForm.username = ''
  loginForm.password = ''
}

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('Please fill in all fields')
    return
  }

  loading.value = true
  try {
    const response = await userApi.login({
      username: loginForm.username,
      password: loginForm.password
    })

    ElMessage.success('登录成功！')
    localStorage.setItem('token', response.data.token)
    await router.push('/home')
  } catch (error) {
    console.error(error)
    ElMessage.error(error.message || '服务器连接超时')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  if (!registerForm.username || !registerForm.password || !registerForm.nickname) {
    ElMessage.warning('请将信息填写完整！')
    return
  }

  loading.value = true
  try {
    await userApi.register({
      username: registerForm.username,
      password: registerForm.password,
      nickname: registerForm.nickname
    })

    ElMessage.success('注册成功，快去登录吧！')
    isRegister.value = false
    registerForm.username = ''
    registerForm.password = ''
    registerForm.nickname = ''
  } catch (error) {
    console.error(error)
    ElMessage.error(error.message || '服务器连接超时')
  } finally {
    loading.value = false
  }
}

// === 🌟 Canvas 动态光球背景逻辑 (暖色调版) ===
const bgCanvas = ref(null)
let ctx = null
let particles = []
let animationFrameId = null

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.radius = Math.random() * 60 + 20
    this.vx = (Math.random() - 0.5) * 1
    this.vy = (Math.random() - 0.5) * 1
    // 透明度稍微调高一点，在浅色背景上更明显
    this.alpha = Math.random() * 0.3 + 0.2
    // 🎨 核心改动：光球颜色改为香槟金/柔杏色
    // RGB(255, 220, 180) 是一种很高级的暖金色
    this.color = `rgba(255, 225, 190, ${this.alpha})`
  }

  draw() {
    ctx.beginPath()
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    gradient.addColorStop(0, this.color)
    // 边缘渐变到完全透明
    gradient.addColorStop(1, 'rgba(255, 225, 190, 0)')

    ctx.fillStyle = gradient
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx
    this.y += this.vy
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) this.vx = -this.vx
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) this.vy = -this.vy
    this.draw()
  }
}

const initCanvas = () => {
  const canvas = bgCanvas.value
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particles = []
  // 增加粒子数量，营造温馨氛围
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(canvas.width, canvas.height))
  }
}

const animate = () => {
  const canvas = bgCanvas.value
  // 🎨 核心改动：背景填充色改为暖米白，带有极低的透明度用于制造拖尾
  ctx.fillStyle = 'rgba(249, 248, 244, 0.2)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update(canvas.width, canvas.height)
  })
  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => { initCanvas() }

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* === 全局容器 === */
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', sans-serif;
  color: #2C2C2C;
  /* 🎨 核心改动：背景底色改为暖米白 */
  background: #F9F8F4;
}

/* === Canvas 背景层 === */
.dynamic-bg-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  /* 增大模糊度，让光斑更柔和梦幻 */
  filter: blur(50px);
  transform: scale(1.2); /* 放大消除边缘 */
}

/* 遮罩层 (改为极淡的暖色) */
.bg-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  /* 使用一个非常淡的暖色渐变，增加层次感 */
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(249, 248, 244, 0.3));
  z-index: 1;
}

/* === 内容层 === */
.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 返回按钮 (改为深色) */
.top-back {
  position: absolute;
  top: 40px;
  left: 40px;
  /* 🎨 核心改动：文字颜色改为深灰 */
  color: rgba(44, 44, 44, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}
/* 鼠标悬浮变黑 */
.top-back:hover { opacity: 1; color: #2C2C2C; transform: translateX(-3px); }

/* === 毛玻璃卡片 (调整阴影以适配浅色背景) === */
.auth-card {
  width: 400px;
  /* 卡片背景稍微白一点，更通透 */
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 50px 40px;
  /* 🎨 核心改动：阴影改为更柔和的暖灰色 */
  box-shadow: 0 20px 60px rgba(100, 90, 80, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.6);
  animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-header { text-align: center; margin-bottom: 40px; }
.brand { font-weight: 900; font-size: 14px; letter-spacing: 2px; margin-bottom: 15px; opacity: 0.5; color: #C27664; /* Logo用一点陶土红点缀 */ }
.title { font-size: 28px; font-weight: 800; color: #2C2C2C; margin-bottom: 8px; }
.subtitle { font-size: 14px; color: #7A7A7A; font-weight: 400; }

/* === 表单样式 === */
.input-group { margin-bottom: 25px; text-align: left; }
.input-label { display: block; font-size: 12px; font-weight: 700; color: #7A7A7A; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }

:deep(.custom-input .el-input__wrapper) {
  background-color: transparent !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0,0,0,0.1) !important;
  border-radius: 0 !important;
  padding-left: 0; padding-right: 0; transition: all 0.3s;
}
:deep(.custom-input .el-input__wrapper.is-focus) {
  border-bottom: 1px solid #2C2C2C !important;
}
:deep(.custom-input .el-input__inner) { color: #2C2C2C; font-weight: 500; font-size: 16px; }

.form-extras { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.forgot-link { font-size: 12px; color: #7A7A7A; cursor: pointer; text-decoration: underline; }

.action-btn {
  width: 100%; padding: 16px; background: #2C2C2C; color: #fff; border: none; border-radius: 12px;
  font-size: 14px; font-weight: 700; letter-spacing: 1px; cursor: pointer; transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.action-btn:hover { background: #000; transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }

.card-footer { margin-top: 30px; text-align: center; font-size: 13px; color: #7A7A7A; }
.card-footer a { color: #2C2C2C; font-weight: 700; text-decoration: none; margin-left: 5px; cursor: pointer; border-bottom: 1px solid transparent; transition: border 0.3s; }
.card-footer a:hover { border-bottom: 1px solid #2C2C2C; }

/* === 移动端适配 === */
@media (max-width: 768px) {
  .top-back { top: 20px; left: 20px; color: rgba(44,44,44,0.8); }
  .auth-card { width: 85%; padding: 40px 30px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(30px); }
  .title { font-size: 24px; }
}
</style>