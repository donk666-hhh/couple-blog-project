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

        <div class="bento-card note-card" @click="router.push('/notes')">
          <div class="tape"></div>

          <div class="note-section partner-note-section">
            <div class="section-header">
              <img :src="coupleInfo?.partner?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Partner'" class="section-avatar">
              <span class="section-label">{{ coupleInfo?.partner?.nickname || 'Ta' }} Says:</span>
            </div>
            <div class="note-content" :class="partnerHomeNote?.bgImage ? 'bg-' + partnerHomeNote.bgImage : ''">
              <p v-if="partnerHomeNote" class="handwriting-font">{{ partnerHomeNote.content }} <span class="mood">{{ partnerHomeNote.mood }}</span></p>
              <p v-else class="empty-note">Ta 还没贴便利贴~ 😴</p>
            </div>
          </div>

          <div class="note-divider"></div>

          <div class="note-section my-note-section">
            <div class="section-header">
              <img :src="user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.username" class="section-avatar">
              <span class="section-label">I Say:</span>
            </div>
            <div class="note-content" :class="myHomeNote?.bgImage ? 'bg-' + myHomeNote.bgImage : ''">
              <p v-if="myHomeNote" class="handwriting-font">{{ myHomeNote.content }} <span class="mood">{{ myHomeNote.mood }}</span></p>
              <p v-else class="empty-note">去贴一张便利贴吧 ✏️</p>
            </div>
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
            <el-progress :percentage="65" :color="customColors" :stroke-width="10" striped striped-flow />
            <span class="wish-meta">¥3500 / ¥5000</span>
          </div>
        </div>
      </main>
    </div>

    <nav class="floating-dock">
      <div class="dock-item" @click="router.push('/home')" title="Home"><span class="dock-icon">🏠</span></div>
      <div v-if="isCoupled" class="dock-item" @click="router.push('/timeline')" title="Timeline"><span class="dock-icon">📅</span></div>
      <div class="dock-item dock-add" @click="openPublish" title="New Moment"><span class="dock-icon-plus">+</span></div>
      <div class="dock-item" @click="router.push('/album')" title="Gallery"><span class="dock-icon">📷</span></div>
      <div class="dock-item" @click="router.push('/profile')" title="Profile"><span class="dock-icon">⚙️</span></div>
    </nav>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CopyDocument, Lock } from '@element-plus/icons-vue'
import { userApi, coupleApi, noteApi } from '@/api'

const router = useRouter()
const route = useRoute()

// 状态定义
const isCoupled = ref(false)
const loading = ref(false)
const statusLoading = ref(false)
const user = reactive({ id: null, nickname: '', username: '', avatar: '', inviteCode: '', cityName: '', isHappy: 1, happyText: 'Coding...', happyEmoji: '💻', restingText: 'Sleeping...', restingEmoji: '😴' })
const isHappySwitch = ref(true)
const coupleInfo = ref(null)
const daysCount = ref(0)

// 🌟 首页展示的特定留言
const partnerHomeNote = ref(null)
const myHomeNote = ref(null)

// 绑定相关
const partnerCode = ref('')

// Computed
const displayStatus = computed(() => isHappySwitch.value ? { emoji: user.happyEmoji || '💻', text: user.happyText || 'Coding...' } : { emoji: user.restingEmoji || '😴', text: user.restingText || 'Sleeping...' })
const partnerDisplayStatus = computed(() => {
  const p = coupleInfo.value?.partner
  if (!p) return { emoji: '⏳', text: 'Loading...' }
  const pIsHappy = (p.isHappy === 1 || p.isHappy === true || p.isHappy === undefined)
  return pIsHappy ? { emoji: p.happyEmoji || '💻', text: p.happyText || 'Coding...' } : { emoji: p.restingEmoji || '😴', text: p.restingText || 'Sleeping...' }
})

const handleToggleStatus = async (val) => {
  statusLoading.value = true
  try {
    const res = await userApi.updateProfile({ id: user.id, isHappy: val ? 1 : 0 })
    if (res.code === '200') { user.isHappy = val ? 1 : 0; ElMessage.success(val ? 'Status: Happy ✨' : 'Status: Resting 🌙') }
  } catch (error) { ElMessage.error('Failed'); isHappySwitch.value = !val } finally { statusLoading.value = false }
}

const loadUserInfo = async () => {
  try {
    const res = await userApi.getCurrentUser()
    if (res.code === '200') {
      Object.assign(user, res.data)
      isHappySwitch.value = user.isHappy === 1
      if (user.coupleId) {
        isCoupled.value = true
        loadCoupleInfo()
        loadHomeNotes() // 🌟 加载首页展示的留言
      }
    }
  } catch (error) { if (error.response?.status === 401) router.push('/login') }
}

const loadCoupleInfo = async () => {
  try {
    const res = await coupleApi.getCoupleInfo()
    if (res.code === '200') {
      coupleInfo.value = res.data
      // ⚠️ 修复：startDate 是字符串，需要先转换为 Date 对象
      if (res.data.couple?.startDate) {
        const start = new Date(res.data.couple.startDate)
        daysCount.value = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24))
      }
    }
  } catch (error) {}
}

// --- 绑定 & 复制 ---
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

// 🌟 获取首页展示的留言 (使用现有的 getNoteList API)
const loadHomeNotes = async () => {
  try {
    const res = await noteApi.getNoteList(user.coupleId)
    if (res.code === '200' && res.data) {
      const notes = res.data

      // 🌟 优先显示置顶的留言 (isOnHome === 1)
      const getHomeNote = (noteList) => {
        const pinned = noteList.find(n => n.isOnHome === 1)
        if (pinned) return pinned
        // 如果没有置顶，取最新的
        return noteList.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))[0]
      }

      const myNotes = notes.filter(n => n.senderId === user.id)
      const partnerNotes = notes.filter(n => n.senderId !== user.id)

      myHomeNote.value = myNotes.length > 0 ? getHomeNote(myNotes) : null
      partnerHomeNote.value = partnerNotes.length > 0 ? getHomeNote(partnerNotes) : null
    }
  } catch (error) {
    console.error('Failed to load home notes:', error)
    myHomeNote.value = null
    partnerHomeNote.value = null
  }
}

const customColors = [ { color: '#B5EAD7', percentage: 20 }, { color: '#FFDAC1', percentage: 40 }, { color: '#FFB7B2', percentage: 80 }, { color: '#FF9AA2', percentage: 100 } ]
const openPublish = () => { console.log('Open Publish') }

watch(() => route.path, (newPath) => { if (newPath === '/home') loadUserInfo() })
onMounted(() => { loadUserInfo() })
</script>

<style scoped>
/* 保持原有大部分样式不变，仅修改 .note-card 相关 */
/* 使用系统字体栈，替代 Google Fonts */
/* ...省略其他通用样式... */
:root { --bg-cream: #FFFBF5; --primary-pink: #FF8FAB; --text-main: #5D5D5D; --shadow-soft: 0 8px 30px rgba(0,0,0,0.04); }
.home-container { min-height: 100vh; background-color: #FFFBF5; font-family: 'PingFang SC', 'Nunito', 'Microsoft YaHei', sans-serif; padding: 20px 20px 100px; overflow-x: hidden; position: relative; }
.bg-blob { position: fixed; border-radius: 50%; filter: blur(90px); z-index: 0; opacity: 0.5; }
.blob-1 { width: 400px; height: 400px; background: #FFB7B2; top: -100px; left: -50px; }
.blob-2 { width: 300px; height: 300px; background: #B5EAD7; bottom: 100px; right: -50px; }
.blob-3 { width: 200px; height: 200px; background: #FFDAC1; top: 40%; left: 40%; opacity: 0.3; }

/* 动画 */
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header & Solo styles omitted for brevity (keep them as is) ... */
.solo-header { text-align: center; margin: 60px 0 40px; position: relative; z-index: 10; }
.solo-header h1 { font-size: 32px; font-weight: 800; color: #333; margin-bottom: 10px; }
.highlight-text { color: var(--primary-pink); }
.subtitle { color: #999; font-size: 16px; }
/* ... Bind Card styles ... */
.bind-card { max-width: 600px; margin: 0 auto 50px; background: #fff; border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.08); display: flex; overflow: hidden; position: relative; z-index: 10; transition: transform 0.3s; }
.ticket-stub { background: #FF8FAB; color: #fff; width: 200px; padding: 30px 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; border-right: 2px dashed rgba(255,255,255,0.6); }
.ticket-main { flex: 1; padding: 40px; background: rgba(255,255,255,0.9); }
.ticket-main h3 { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #333; }
.input-area { display: flex; gap: 15px; }
.bind-btn { background: #333; color: #fff; border: none; font-weight: 700; }
.solo-grid { max-width: 600px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; position: relative; z-index: 10; }
.solo-card { background: rgba(255,255,255,0.6); border-radius: 20px; padding: 25px; text-align: center; cursor: pointer; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.8); }
.solo-card:hover { background: #fff; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.solo-card .icon { font-size: 30px; display: block; margin-bottom: 10px; }
.solo-card h4 { margin: 0 0 5px 0; font-weight: 700; color: #333; }
.solo-card p { margin: 0; font-size: 12px; color: #999; }

/* Ticket Stub 样式 */
.stub-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
.ticket-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; }
.invite-code { font-size: 32px; font-weight: 900; margin: 10px 0; cursor: pointer; display: flex; align-items: center; gap: 5px; }
.ticket-tip { font-size: 12px; opacity: 0.8; }
.custom-input { flex: 1; }
.custom-input :deep(.el-input__wrapper) { border-radius: 12px; background: rgba(255,255,255,0.8); }
.ticket-stub::before, .ticket-stub::after {
  content: ''; position: absolute; right: -10px; width: 20px; height: 20px;
  background: #FFFBF5; border-radius: 50%;
}
.ticket-stub::before { top: -10px; }
.ticket-stub::after { bottom: -10px; }

/* Couple Header */
.love-header { position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; margin-bottom: 30px; }
.weather-widget { font-size: 14px; font-weight: 700; color: #9A9A9A; background: rgba(255,255,255,0.5); padding: 8px 16px; border-radius: 20px; }
.days-counter { text-align: center; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s; }
.days-counter:hover { transform: scale(1.1); }
.num { font-size: 48px; font-weight: 900; background: linear-gradient(45deg, #FF9AA2, #FFB7B2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.heart-icon { font-size: 24px; animation: heartbeatJelly 1.6s infinite; }
@keyframes heartbeatJelly { 0% { transform: scale(1); } 15% { transform: scale(1.25); } 30% { transform: scale(0.95); } 45% { transform: scale(1.1); } 60% { transform: scale(1); } 100% { transform: scale(1); } }
.user-avatar img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid #fff; box-shadow: var(--shadow-soft); object-fit: cover; }

/* Bento Container */
.bento-container { position: relative; z-index: 10; max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr 1fr; grid-template-rows: 240px 180px; gap: 24px; }
.bento-card { background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); overflow: hidden; position: relative; transition: 0.4s; }
.bento-card:hover { transform: translateY(-5px); box-shadow: 0 15px 50px rgba(0,0,0,0.08); }

.photo-card { grid-row: span 2; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.polaroid-frame { background: #fff; padding: 15px 15px 50px 15px; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: rotate(-3deg); width: 100%; max-width: 300px; position: relative; }
.polaroid-frame img { width: 100%; aspect-ratio: 1; object-fit: cover; background: #eee; }
.photo-meta { position: absolute; bottom: 15px; left: 15px; right: 15px; display: flex; justify-content: space-between; font-family: 'Indie Flower', cursive; color: #555; font-size: 14px; }
.pin { position: absolute; top: -15px; left: 50%; font-size: 24px; filter: drop-shadow(2px 5px 2px rgba(0,0,0,0.2)); }
.card-label { margin-top: 20px; font-weight: 700; color: #FF8FAB; }

/* 🌟 Note Card Styles (Updated) */
.note-card { grid-column: span 2; background: #FFFDF0; padding: 20px 30px; display: flex; flex-direction: column; }
.tape { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 100px; height: 25px; background: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.6); backdrop-filter: blur(5px); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }

.note-section { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.section-header { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.section-avatar { width: 24px; height: 24px; border-radius: 50%; border: 1px solid #fff; }
.section-label { font-size: 12px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }

.note-content {
  flex: 1; border-radius: 8px; padding: 5px 10px; display: flex; align-items: center;
  transition: background 0.3s;
}

/* 动态背景色 - 与 NoteWallView 联动 (使用组合选择器) */
.note-content.bg-yellow { background: rgba(253, 246, 227, 0.5); }
.note-content.bg-pink { background: rgba(252, 228, 236, 0.5); }
.note-content.bg-blue { background: rgba(225, 245, 254, 0.5); }
.note-content.bg-green { background: rgba(232, 245, 233, 0.5); }

.handwriting-font { font-family: 'KaiTi', 'STKaiti', 'Indie Flower', cursive; font-size: 18px; line-height: 1.4; color: #5D5D5D; margin: 0; width: 100%; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.mood { font-size: 18px; margin-left: 5px; flex-shrink: 0; }
.empty-note { font-family: 'KaiTi', 'STKaiti', 'Indie Flower', cursive; font-size: 16px; color: #ccc; font-style: italic; margin: 0; }

.note-divider { height: 1px; background: rgba(0,0,0,0.06); margin: 10px 0; }
.note-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 12px; color: #bbb; }
.reply-btn { background: #FFDAC1; border: none; color: #7a5c48; font-weight: 700; }

/* Status & Wish Card - Omitted for brevity (same as before) */
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

.wish-card { padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%); }
.jar-icon { font-size: 40px; margin-bottom: 10px; }
.wish-info { width: 100%; text-align: center; }
.wish-title { font-weight: 700; color: #5D5D5D; display: block; margin-bottom: 10px; }
.wish-meta { font-size: 12px; color: #999; display: block; margin-top: 8px; }

/* Dock */
.floating-dock { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); padding: 12px 28px; border-radius: 50px; display: flex; gap: 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); z-index: 100; border: 1px solid rgba(255,255,255,0.8); }
.dock-item { cursor: pointer; transition: transform 0.2s; display: flex; align-items: center; justify-content: center; }
.dock-item:hover { transform: scale(1.2); }
.dock-icon { font-size: 22px; }
.dock-icon-plus { font-size: 26px; font-weight: bold; color: #FF8FAB; }
.dock-add { width: 45px; height: 45px; background: linear-gradient(135deg, #FF8FAB 0%, #FFB7B2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: -8px 0; box-shadow: 0 4px 15px rgba(255,143,171,0.4); }

@media (max-width: 768px) {
  .home-container { padding: 15px; padding-bottom: 100px; }
  .love-header { flex-direction: column; gap: 15px; }
  .weather-widget { position: absolute; left: 0; top: 0; }
  .user-avatar { position: absolute; right: 0; top: 0; }
  .days-counter { margin-top: 10px; }
  .bento-container { display: flex; flex-direction: column; gap: 20px; }
  .photo-card { grid-row: auto; }
  .note-card { grid-column: auto; }
  .bind-card { flex-direction: column; }
  .ticket-stub { width: 100%; border-right: none; border-bottom: 2px dashed rgba(255,255,255,0.6); padding: 20px; box-sizing: border-box; }
  .input-area { flex-direction: column; }
  .solo-grid { grid-template-columns: 1fr; }
  .floating-dock { gap: 20px; padding: 10px 20px; width: 85%; justify-content: space-around; }
}
</style>