<template>
  <div class="note-wall-container cream-theme">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <nav class="wall-header">
      <div class="back-btn" @click="router.push('/home')">
        <el-icon><ArrowLeft /></el-icon> Home
      </div>
      <h2 class="page-title">Sticky Notes 📝</h2>
      <div class="placeholder"></div> </nav>

    <div class="wall-content">
      <div v-if="notes.length === 0" class="empty-wall">
        <img src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png" alt="Empty">
        <p>墙上空空的，快来贴第一张便利贴吧！✨</p>
      </div>

      <div class="notes-wrapper">
        <div
            v-for="note in notes"
            :key="note.id"
            class="sticky-note animate-pop-in"
            :class="[getNoteColorClass(note.bgImage), { 'is-mine': note.isMine }]"
            :style="note.randomStyle"
        >
          <div class="pin-tack">📍</div>

          <div class="mood-stamp">{{ note.mood }}</div>

          <div
              class="note-body"
              :class="{ 'is-hidden': note.isHidden && !note.isRevealed }"
              @click="revealNote(note)"
          >
            <div v-if="note.isHidden && !note.isRevealed" class="secret-cover">
              <span class="lock-icon">🔒</span>
              <span class="scratch-hint">Tap to Reveal</span>
            </div>
            <p class="handwriting-text">{{ note.content }}</p>
          </div>

          <div class="note-footer">
            <div class="user-info">
              <img :src="note.senderAvatar" class="avatar-xs">
              <span class="time">{{ formatTime(note.createTime) }}</span>
            </div>
            <div v-if="note.isMine" class="trash-btn" @click.stop="handleDelete(note.id)">
              <el-icon><Delete /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fab-add" @click="dialogVisible = true">
      <el-icon><EditPen /></el-icon>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="写张便利贴 ✏️"
        width="90%"
        class="note-dialog"
        align-center
    >
      <div class="note-form">
        <div class="color-picker">
          <div
              v-for="color in colors"
              :key="color.value"
              class="color-dot"
              :class="[color.value, { active: form.bgImage === color.value }]"
              @click="form.bgImage = color.value"
          ></div>
        </div>

        <textarea
            v-model="form.content"
            class="note-textarea handwriting-font"
            :class="form.bgImage"
            placeholder="写点什么给 Ta 看..."
            maxlength="100"
        ></textarea>
        <div class="char-count">{{ form.content.length }}/100</div>

        <div class="form-tools">
          <el-popover placement="top" trigger="click" width="200">
            <template #reference>
              <div class="tool-btn mood-btn">
                <span>Mood: {{ form.mood }}</span>
              </div>
            </template>
            <div class="emoji-grid">
              <span v-for="emoji in emojis" :key="emoji" @click="form.mood = emoji">{{ emoji }}</span>
            </div>
          </el-popover>

          <div
              class="tool-btn secret-btn"
              :class="{ active: form.isHidden }"
              @click="form.isHidden = !form.isHidden"
          >
            <el-icon><Lock /></el-icon>
            {{ form.isHidden ? 'Secret On' : 'Secret Off' }}
          </div>
        </div>
      </div>

      <template #footer>
        <el-button round @click="dialogVisible = false">Cancel</el-button>
        <el-button
            type="primary"
            color="#FF8FAB"
            round
            :loading="submitting"
            @click="handleSubmit"
        >
          Post It!
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, EditPen, Delete, Lock } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { noteApi, userApi } from '@/api'

const router = useRouter()
const dialogVisible = ref(false)
const submitting = ref(false)
const currentUser = ref(null)
const currentCoupleId = ref(null)

// 留言列表
const notes = ref([])

const form = reactive({
  content: '',
  bgImage: 'yellow', // pink, yellow, blue, purple
  mood: '😊',
  isHidden: false
})

const colors = [
  { value: 'yellow', hex: '#FFF9C4' },
  { value: 'pink', hex: '#FFC8DD' },
  { value: 'blue', hex: '#BDE0FE' },
  { value: 'purple', hex: '#E2Cbf7' },
]

const emojis = ['😊', '❤️', '🐷', '😭', '😡', '🍲', '💤', '🌟', '💩', '🎁']

// --- 方法 ---

// 生成随机旋转角度 (-5 ~ 5度)
const generateRandomStyle = () => {
  const deg = Math.random() * 10 - 5
  return { transform: `rotate(${deg}deg)` }
}

const handleSubmit = async () => {
  if (!form.content.trim()) return ElMessage.warning('写几个字呗~')
  submitting.value = true

  try {
    const res = await noteApi.sendNote({
      coupleId: currentCoupleId.value,
      senderId: currentUser.value.id,
      content: form.content,
      bgImage: form.bgImage,
      mood: form.mood,
      isHidden: form.isHidden ? 1 : 0
    })

    if (res.code === '200') {
      ElMessage.success('贴上啦！🎉')
      dialogVisible.value = false
      // 重置表单
      form.content = ''
      form.isHidden = false
      // 刷新留言列表
      await fetchNotes()
    }
  } catch (error) {
    ElMessage.error('发送失败，请重试')
  } finally {
    submitting.value = false
  }
}

const revealNote = (note) => {
  if (note.isHidden && !note.isRevealed) {
    note.isRevealed = true
    // 可以加个震动反馈
    if (navigator.vibrate) navigator.vibrate(50);
  }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('要把这张便利贴撕掉吗？', '提示', {
      confirmButtonText: '撕掉',
      cancelButtonText: '留着',
      type: 'warning'
    })

    const res = await noteApi.deleteNote(id)
    if (res.code === '200') {
      ElMessage.success('已撕掉')
      await fetchNotes()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const formatTime = (time) => {
  // 简单格式化，实际可以用 dayjs
  const d = new Date(time)
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
}

const getNoteColorClass = (color) => `note-bg-${color}`

// 获取当前用户信息
const fetchCurrentUser = async () => {
  try {
    const res = await userApi.getCurrentUser()
    if (res.code === '200') {
      currentUser.value = res.data
      currentCoupleId.value = res.data.coupleId
      // 获取到情侣ID后，加载留言
      if (currentCoupleId.value) {
        await fetchNotes()
      }
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
}

// 获取留言列表
const fetchNotes = async () => {
  try {
    const res = await noteApi.getNoteList(currentCoupleId.value)
    if (res.code === '200') {
      // 处理数据，添加前端需要的字段
      notes.value = res.data.map(note => ({
        ...note,
        isMine: note.senderId === currentUser.value.id,
        isRevealed: false, // 前端控制刮刮乐状态
        randomStyle: generateRandomStyle()
      }))
    }
  } catch (error) {
    ElMessage.error('获取留言失败')
  }
}

onMounted(() => {
  fetchCurrentUser()
})
</script>

<style scoped>
/* 引入手写字体 (非常重要，有了这个才有便利贴的感觉) */
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Ma+Shan+Zheng&display=swap');

/* 如果你想用中文手写体，推荐引入 'Ma Shan Zheng' 或类似字体 */

.note-wall-container {
  min-height: 100vh;
  background-color: #FFFBF5;
  font-family: 'Nunito', sans-serif;
  padding-bottom: 80px;
  position: relative;
  overflow-x: hidden;
}

/* 顶部导航 */
.wall-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px; position: sticky; top: 0; z-index: 100;
  background: rgba(255, 251, 245, 0.9); backdrop-filter: blur(10px);
}
.page-title { font-size: 20px; font-weight: 800; color: #5D5D5D; margin: 0; }
.back-btn { cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 700; color: #555; }
.placeholder { width: 60px; }

/* 墙面区域 */
.wall-content { padding: 20px; max-width: 1000px; margin: 0 auto; }
.empty-wall { text-align: center; margin-top: 100px; color: #999; }
.empty-wall img { width: 120px; opacity: 0.5; margin-bottom: 20px; }

/* 便利贴容器 (Flex 布局实现乱中有序) */
.notes-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* 🌟 便利贴核心样式 */
.sticky-note {
  width: 160px;
  height: 160px;
  padding: 15px;
  box-shadow: 2px 5px 15px rgba(0,0,0,0.1);
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* 默认背景色，会被下面的类覆盖 */
  background: #FFF9C4;
}
.sticky-note:hover {
  transform: scale(1.1) rotate(0deg) !important; /* 悬停时放大并摆正 */
  z-index: 10;
  box-shadow: 5px 15px 30px rgba(0,0,0,0.15);
}

/* 颜色变体 */
.note-bg-yellow { background: linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%); }
.note-bg-pink { background: linear-gradient(135deg, #FFC8DD 0%, #FF90B3 100%); }
.note-bg-blue { background: linear-gradient(135deg, #BDE0FE 0%, #81C7F5 100%); }
.note-bg-purple { background: linear-gradient(135deg, #E2CBF7 0%, #D0A7F5 100%); }

.pin-tack {
  position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
  font-size: 20px; text-shadow: 2px 2px 2px rgba(0,0,0,0.2);
}

.mood-stamp {
  position: absolute; bottom: 10px; right: 10px;
  font-size: 30px; opacity: 0.8; transform: rotate(-15deg);
  filter: grayscale(0.2);
}

.note-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.handwriting-text {
  font-family: 'Indie Flower', 'Ma Shan Zheng', cursive; /* 手写体 */
  font-size: 18px;
  line-height: 1.4;
  color: #444;
  word-break: break-all;
  text-align: center;
  font-weight: 600;
}

/* 🔒 刮刮乐效果 */
.is-hidden .handwriting-text { filter: blur(8px); opacity: 0.3; }
.secret-cover {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: rgba(0,0,0,0.4);
  z-index: 5;
}
.lock-icon { font-size: 24px; margin-bottom: 5px; }
.scratch-hint { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }

.note-footer {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-top: 10px; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 5px;
}
.user-info { display: flex; align-items: center; gap: 5px; }
.avatar-xs { width: 20px; height: 20px; border-radius: 50%; border: 1px solid #fff; }
.time { font-size: 10px; color: rgba(0,0,0,0.5); font-weight: 700; }

.trash-btn {
  color: #fff; background: rgba(0,0,0,0.2);
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; transition: 0.2s;
}
.trash-btn:hover { background: #FF4D4F; }

/* 悬浮按钮 FAB */
.fab-add {
  position: fixed; bottom: 40px; right: 30px;
  width: 60px; height: 60px; background: #333; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  cursor: pointer; transition: 0.3s; z-index: 99;
}
.fab-add:hover { transform: scale(1.1) rotate(90deg); background: #000; }

/* 弹窗样式 */
:deep(.note-dialog) { border-radius: 20px; }
.note-form { padding: 10px; }

.color-picker { display: flex; gap: 15px; margin-bottom: 20px; justify-content: center; }
.color-dot { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: 0.2s; }
.color-dot.yellow { background: #FFF9C4; }
.color-dot.pink { background: #FFC8DD; }
.color-dot.blue { background: #BDE0FE; }
.color-dot.purple { background: #E2CBF7; }
.color-dot.active { transform: scale(1.2); border-color: #333; }

.note-textarea {
  width: 100%; height: 120px; border: none; padding: 15px;
  border-radius: 12px; font-size: 18px; outline: none; resize: none;
  font-family: 'Indie Flower', cursive; margin-bottom: 5px;
  transition: background 0.3s;
}
.note-textarea.yellow { background: #FFF9C4; }
.note-textarea.pink { background: #FFC8DD; }
.note-textarea.blue { background: #BDE0FE; }
.note-textarea.purple { background: #E2CBF7; }

.char-count { text-align: right; font-size: 12px; color: #999; margin-bottom: 15px; }

.form-tools { display: flex; justify-content: space-between; }
.tool-btn {
  padding: 8px 15px; background: #f5f5f5; border-radius: 20px;
  font-size: 13px; font-weight: 700; color: #666; cursor: pointer;
  display: flex; align-items: center; gap: 5px; transition: 0.2s;
}
.tool-btn.active { background: #333; color: #fff; }
.emoji-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; padding: 10px; text-align: center; font-size: 24px; cursor: pointer; }

/* 动画 */
.animate-pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes popIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 768px) {
  .sticky-note { width: 44%; /* 手机上一行两个 */ height: 150px; }
  .notes-wrapper { gap: 10px; }
  /* 弹窗适配 */
  :deep(.note-dialog) { width: 90% !important; }
}
</style>