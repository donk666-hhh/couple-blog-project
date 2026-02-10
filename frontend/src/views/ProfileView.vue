<template>
  <div class="profile-container cream-theme">

    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <nav class="top-nav">
      <div class="back-btn" @click="router.push('/home')">
        <el-icon><ArrowLeft /></el-icon> Back
      </div>
      <h2 class="page-title">My Profile</h2>
      <div class="placeholder"></div>
    </nav>

    <div class="content-wrapper animate-slide-up">

      <div class="setting-card profile-card">
        <div class="avatar-wrapper">
          <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleAvatarChange"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <div v-else class="avatar-placeholder">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Default" class="avatar" />
            </div>
            <div class="edit-badge"><el-icon><Camera /></el-icon></div>
          </el-upload>
        </div>
        <h3 class="username-display">@{{ form.username }}</h3>

        <div class="invite-tag" @click="copyInviteCode">
          Code: {{ form.inviteCode || 'Loading...' }} <el-icon><CopyDocument /></el-icon>
        </div>
      </div>

      <div class="setting-card">
        <h3 class="section-title">Basic Info</h3>

        <div class="form-item">
          <label>Nickname</label>
          <el-input v-model="form.nickname" placeholder="Your Nickname" class="cream-input" />
        </div>

        <div class="form-item">
          <label>City (For Weather)</label>
          <el-select v-model="form.cityCode" placeholder="Select City" class="cream-select" @change="handleCityChange">
            <el-option label="北京 Beijing" value="101010" />
            <el-option label="上海 Shanghai" value="101020" />
            <el-option label="广州 Guangzhou" value="101280" />
            <el-option label="深圳 Shenzhen" value="101280" />
            <el-option label="杭州 Hangzhou" value="101210" />
            <el-option label="成都 Chengdu" value="101270" />
          </el-select>
        </div>
      </div>

      <div class="setting-card">
        <h3 class="section-title">Happy Mode Config 💖</h3>
        <div class="mood-selector">
          <el-input
              v-model="form.happyText"
              placeholder="e.g. Coding..."
              class="cream-input mood-input"
              maxlength="50"
              show-word-limit
          />
          <div class="emoji-picker">
            <span
                v-for="emoji in popularEmojis"
                :key="emoji"
                :class="{ 'emoji-active': form.happyEmoji === emoji }"
                @click="selectEmoji('happy', emoji)"
            >
              {{ emoji }}
            </span>
          </div>
        </div>
      </div>

      <div class="setting-card">
        <h3 class="section-title">Resting Mode Config 😴</h3>
        <div class="mood-selector">
          <el-input
              v-model="form.restingText"
              placeholder="e.g. Sleeping..."
              class="cream-input mood-input"
              maxlength="50"
              show-word-limit
          />
          <div class="emoji-picker">
            <span
                v-for="emoji in popularEmojis"
                :key="emoji"
                :class="{ 'emoji-active': form.restingEmoji === emoji }"
                @click="selectEmoji('resting', emoji)"
            >
              {{ emoji }}
            </span>
          </div>
        </div>
      </div>

      <div class="setting-card">
        <h3 class="section-title">Security</h3>
        <div class="security-row">
          <div class="sec-info">
            <span class="sec-label">Password</span>
            <span class="sec-desc">•••••••••</span>
          </div>
          <el-button class="edit-btn" size="small" round @click="pwdDialogVisible = true">Change</el-button>
        </div>
      </div>

      <div class="setting-card danger-zone" v-if="isCoupled && coupleInfo">
        <h3 class="section-title" style="color: #D65A5A;">Relationship</h3>

        <div class="partner-info">
          <img :src="coupleInfo.partner?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Partner'" alt="Partner" class="partner-avatar" />
          <div class="partner-text">
            <span class="p-name">Bound with: <strong>{{ coupleInfo.partner?.nickname || 'My Love' }} 💖</strong></span>
            <span class="p-days">Since {{ formatDate(coupleInfo.couple?.startDate) }}</span>
          </div>
        </div>

        <el-button class="unbind-btn" plain @click="handleUnbind">
          💔 Unbind Relationship
        </el-button>
      </div>

      <div class="footer-actions">
        <el-button class="save-btn" round :loading="loading" @click="saveProfile">
          Save Changes
        </el-button>
        <div class="logout-link" @click="handleLogout">Log Out</div>
      </div>

    </div>

    <el-dialog
        v-model="pwdDialogVisible"
        title="Change Password"
        width="90%"
        class="cream-dialog"
        align-center
    >
      <el-form :model="pwdForm" label-position="top">
        <el-form-item label="Old Password">
          <el-input v-model="pwdForm.oldPwd" type="password" show-password class="cream-input" />
        </el-form-item>
        <el-form-item label="New Password">
          <el-input v-model="pwdForm.newPwd" type="password" show-password class="cream-input" />
        </el-form-item>
        <el-form-item label="Confirm New Password">
          <el-input v-model="pwdForm.confirmPwd" type="password" show-password class="cream-input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pwdDialogVisible = false" round>Cancel</el-button>
          <el-button type="primary" @click="handleChangePassword" color="#5D5D5D" round>Confirm</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft, Camera, CopyDocument } from '@element-plus/icons-vue'
import { userApi, coupleApi } from '@/api'

const router = useRouter()
const loading = ref(false)
const isCoupled = ref(false)
const pwdDialogVisible = ref(false)

// 表单数据 (包含两套心情配置)
const form = reactive({
  id: null,
  username: '',
  nickname: '',
  avatar: '',
  cityCode: '',
  cityName: '',
  // 快乐模式配置
  happyText: 'Coding...',
  happyEmoji: '💻',
  // 休息模式配置
  restingText: 'Sleeping...',
  restingEmoji: '😴',
  // 当前状态 (仅用于保存时回显，界面上不改)
  isHappy: 1,
  inviteCode: ''
})

// 情侣信息
const coupleInfo = ref(null)

// 密码表单
const pwdForm = reactive({
  oldPwd: '',
  newPwd: '',
  confirmPwd: ''
})

// 修复后的 Emoji 列表
const popularEmojis = ['💻', '😴', '🌈', '✨', '☕', '🎮', '🥰', '💪', '🔥', '🚀', '🎨', '🌙', '💤', '🌊']

// --- 加载用户信息 ---
const loadUserInfo = async () => {
  try {
    const res = await userApi.getCurrentUser()
    if (res.code === '200') {
      Object.assign(form, res.data)
      // 兼容 boolean/int
      if (typeof form.isHappy === 'boolean') {
        form.isHappy = form.isHappy ? 1 : 0
      }

      // 检查绑定
      if (form.coupleId) {
        isCoupled.value = true
        loadCoupleInfo()
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
  }
}

// --- 加载情侣信息 ---
const loadCoupleInfo = async () => {
  try {
    const res = await coupleApi.getCoupleInfo()
    if (res.code === '200') {
      coupleInfo.value = res.data
    }
  } catch (error) {
    console.error(error)
  }
}

// --- 初始化 ---
onMounted(() => {
  loadUserInfo()
})

// --- 头像逻辑 ---
const handleAvatarChange = async (file) => {
  if (file.raw) {
    try {
      const res = await userApi.uploadAvatar(file.raw)
      if (res.code === '200') {
        form.avatar = res.data
        ElMessage.success('头像上传成功！')
      }
    } catch (error) {
      ElMessage.error('头像上传失败')
    }
  }
}

// --- 城市逻辑 ---
const handleCityChange = (val) => {
  const cityMap = {
    '101010': 'Beijing',
    '101020': 'Shanghai',
    '101280': 'Guangzhou',
    '101279': 'Shenzhen',
    '101210': 'Hangzhou',
    '101270': 'Chengdu'
  }
  form.cityName = cityMap[val] || ''
}

// --- 选择表情 (分模式) ---
const selectEmoji = (mode, emoji) => {
  if (mode === 'happy') {
    form.happyEmoji = emoji
  } else if (mode === 'resting') {
    form.restingEmoji = emoji
  }
}

// --- 复制邀请码 ---
const copyInviteCode = () => {
  if (!form.inviteCode) return ElMessage.warning('邀请码加载中...')
  navigator.clipboard.writeText(form.inviteCode)
  ElMessage.success('Copied!')
}

// --- 修改密码 ---
const handleChangePassword = async () => {
  if (!pwdForm.oldPwd || !pwdForm.newPwd) return ElMessage.warning('Fill all fields')
  if (pwdForm.newPwd !== pwdForm.confirmPwd) return ElMessage.error('Passwords mismatch')

  loading.value = true
  try {
    const res = await userApi.changePassword(pwdForm.oldPwd, pwdForm.newPwd)
    if (res.code === '200') {
      ElMessage.success('Password updated! Please relogin.')
      pwdDialogVisible.value = false
      setTimeout(() => router.push('/login'), 1500)
    }
  } catch (error) {
    ElMessage.error(error.message || 'Error changing password')
  } finally {
    loading.value = false
  }
}

// --- 保存资料 (核心) ---
const saveProfile = async () => {
  loading.value = true
  try {
    // 提交全量数据
    const res = await userApi.updateProfile({
      nickname: form.nickname,
      avatar: form.avatar,
      cityCode: form.cityCode,
      cityName: form.cityName,
      // 提交两套状态配置
      happyText: form.happyText,
      happyEmoji: form.happyEmoji,
      restingText: form.restingText,
      restingEmoji: form.restingEmoji,
      // 保持当前开关状态不变
      isHappy: form.isHappy
    })
    if (res.code === '200') {
      ElMessage.success('Profile saved! ✨')
    }
  } catch (error) {
    ElMessage.error(error.message || 'Save failed')
  } finally {
    loading.value = false
  }
}

// --- 解绑 ---
const handleUnbind = () => {
  ElMessageBox.confirm(
      'Are you sure? This will clear couple data.', 'Unbind?',
      { confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning' }
  ).then(async () => {
    loading.value = true
    try {
      const res = await coupleApi.unbindCouple()
      if (res.code === '200') {
        ElMessage.info('Unbound successfully.')
        router.push('/home')
      }
    } catch (e) { ElMessage.error('Unbind failed') }
    finally { loading.value = false }
  }).catch(() => {})
}

// --- 登出 ---
const handleLogout = () => {
  ElMessageBox.confirm('Log out now?', 'Confirm', { confirmButtonText: 'Log Out' })
      .then(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
}

// --- 日期格式化 ---
const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

:root { --bg-cream: #FFFBF5; --text-main: #5D5D5D; }

.profile-container {
  min-height: 100vh;
  background-color: #FFFBF5;
  color: #5D5D5D;
  font-family: 'Nunito', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* 顶部导航 */
.top-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px; position: sticky; top: 0; z-index: 100;
  background: rgba(255, 251, 245, 0.9); backdrop-filter: blur(10px);
}
.back-btn { cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 5px; }
.page-title { font-size: 18px; font-weight: 800; margin: 0; }
.placeholder { width: 60px; }

.content-wrapper { padding: 20px; max-width: 600px; margin: 0 auto; padding-bottom: 80px; }
.animate-slide-up { animation: slideUp 0.5s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* 通用卡片 */
.setting-card {
  background: #fff; border-radius: 24px; padding: 25px; margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.02);
}

/* 个人信息卡片 */
.profile-card { display: flex; flex-direction: column; align-items: center; gap: 15px; padding-top: 30px; }
.avatar-wrapper { position: relative; }
.avatar { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 4px solid #fff; box-shadow: 0 8px 15px rgba(0,0,0,0.05); }
.edit-badge { position: absolute; bottom: 0; right: 0; background: #5D5D5D; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
.username-display { margin: 0; font-size: 18px; font-weight: 800; }
.invite-tag {
  background: #F0F9FF; color: #5D5D5D; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 5px;
}
.invite-tag:active { transform: scale(0.95); }

/* 表单区域 */
.section-title { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }
.form-item { margin-bottom: 15px; }
.form-item label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 8px; }

/* 心情选择器 */
.mood-selector { display: flex; flex-direction: column; gap: 15px; }
.mood-input { width: 100%; }
.emoji-picker { display: flex; gap: 10px; flex-wrap: wrap; }
.emoji-picker span {
  font-size: 24px; cursor: pointer; padding: 5px; border-radius: 8px;
  transition: all 0.2s;
}
.emoji-picker span:hover, .emoji-picker span.emoji-active {
  background: #F0F0F0; transform: scale(1.1);
}

/* 密码区域 */
.security-row { display: flex; justify-content: space-between; align-items: center; }
.sec-info { display: flex; flex-direction: column; }
.sec-label { font-weight: 700; font-size: 15px; }
.sec-desc { font-size: 12px; color: #999; }
.edit-btn { background: #F5F5F5; border: none; color: #5D5D5D; font-weight: 700; }

/* 危险区域 */
.danger-zone { border: 1px dashed #FFB7B2; background: #FFFBFB; }
.partner-info { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.partner-avatar { width: 45px; height: 45px; border-radius: 50%; background: #eee; }
.partner-text { display: flex; flex-direction: column; }
.p-name { font-size: 15px; font-weight: 700; }
.p-days { font-size: 12px; color: #D65A5A; }
.unbind-btn { width: 100%; border-color: #FFB7B2; color: #D65A5A; background: transparent; border-radius: 12px; }

/* 底部按钮 */
.footer-actions { margin-top: 30px; text-align: center; }
.save-btn { width: 100%; height: 50px; font-size: 16px; font-weight: 700; background: #5D5D5D; border: none; color: #fff; box-shadow: 0 10px 20px rgba(93, 93, 93, 0.2); }
.save-btn:hover { background: #000; }
.logout-link { margin-top: 20px; color: #999; font-size: 13px; cursor: pointer; text-decoration: underline; }

/* 覆盖 Element 样式 */
:deep(.cream-input .el-input__wrapper), :deep(.cream-select .el-input__wrapper) {
  background-color: #F7F7F7; border-radius: 12px; box-shadow: none !important; padding: 8px 15px;
}
:deep(.el-input__inner) { color: #333; font-weight: 600; }
:deep(.el-dialog.cream-dialog) { border-radius: 24px; padding: 20px; }
:deep(.el-dialog__title) { font-weight: 800; color: #333; }

/* 背景 Blob */
.bg-blob { position: fixed; border-radius: 50%; filter: blur(90px); z-index: 0; opacity: 0.5; }
.blob-1 { width: 300px; height: 300px; background: #B5EAD7; top: -50px; right: -50px; }
.blob-2 { width: 300px; height: 300px; background: #FFDAC1; bottom: -50px; left: -50px; }
</style>