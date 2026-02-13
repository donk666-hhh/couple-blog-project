<template>
  <div class="note-wall-container cream-theme">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <nav class="wall-header">
      <div class="back-btn" @click="router.push('/home')">
        <el-icon><ArrowLeft /></el-icon> Home
      </div>
      <h2 class="page-title">Sticky Notes 🎨</h2>
      <div class="placeholder"></div>
    </nav>

    <div class="wall-content">
      <div class="status-bar">
        <span>✨ 墙上的每一张便签，都是时光的碎片</span>
      </div>

      <div v-if="notes.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <p>墙上空空的，贴一张试试？</p>
      </div>

      <div class="notes-board">
        <div
            v-for="(note, index) in notes"
            :key="note.id"
            class="note-card animate-pop-in"
            :class="[getNoteColorClass(note.bgImage), { 'is-pinned': note.isOnHome }]"
            :style="note.randomStyle"
        >
          <div class="washi-tape"></div>

          <div v-if="note.isOnHome" class="home-sticker" title="Pinned to Home">
            <el-icon><House /></el-icon>
          </div>

          <div class="card-body" @click="openEditDialog(note)">
            <p class="handwriting-font">{{ note.content }}</p>
            <div class="mood-stamp">{{ note.mood }}</div>
          </div>

          <div class="card-footer">
            <span class="date">{{ formatTime(note.createTime) }}</span>
            <div class="action-bar">
              <div class="mini-btn pin" :class="{ active: note.isOnHome }" @click.stop="setAsHomeNote(note)">
                <el-icon><CollectionTag /></el-icon>
              </div>
              <div class="mini-btn" @click.stop="openEditDialog(note)"><el-icon><EditPen /></el-icon></div>
              <div class="mini-btn delete" @click.stop="handleDelete(note.id)"><el-icon><Delete /></el-icon></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fab-add" @click="openCreateDialog">
      <el-icon><Plus /></el-icon>
    </div>

    <el-dialog
        v-model="dialogVisible"
        :title="form.id ? 'Edit Note ✏️' : 'New Note ✨'"
        width="420px"
        class="cream-dialog"
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
            :class="'bg-' + form.bgImage"
            placeholder="写下此刻的想法..."
            maxlength="100"
        ></textarea>

        <div class="form-footer">
          <el-popover placement="top" trigger="click" width="280" popper-class="emoji-popper">
            <template #reference>
              <div class="mood-selector">
                <span>Mood:</span> <span class="current-mood">{{ form.mood }}</span>
              </div>
            </template>
            <div class="emoji-grid">
              <span v-for="emoji in emojis" :key="emoji" @click="form.mood = emoji">{{ emoji }}</span>
            </div>
          </el-popover>
          <span class="char-count">{{ form.content.length }}/100</span>
        </div>
      </div>

      <template #footer>
        <div class="dialog-actions">
          <el-button round @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" color="#FF8FAB" round :loading="submitting" @click="handleSubmit">
            Stick It!
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <FloatingDock />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, EditPen, Delete, CollectionTag, Plus, House } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { noteApi, userApi } from '@/api'
import FloatingDock from "@/components/FloatingDock.vue";

const router = useRouter()
const dialogVisible = ref(false)
const submitting = ref(false)
const notes = ref([])
const currentUser = ref(null)
const currentCoupleId = ref(null)

const form = reactive({ id: null, content: '', bgImage: 'yellow', mood: '😊' })

const colors = [
  { value: 'yellow', hex: '#FDF6E3' },
  { value: 'pink', hex: '#FCE4EC' },
  { value: 'blue', hex: '#E1F5FE' },
  { value: 'green', hex: '#E8F5E9' },
]
const emojis = ['😊', '❤️', '🐷', '😭', '😡', '🍲', '💤', '🌟', '💩', '🎁', '🥑', '🍺']

const generateRandomStyle = () => {
  const rotate = Math.random() * 12 - 6
  const marginTop = Math.random() * 40
  return { transform: `rotate(${rotate}deg)`, marginTop: `${marginTop}px` }
}

const setAsHomeNote = async (targetNote) => {
  if (targetNote.isOnHome) return
  try {
    const res = await noteApi.pinToHome(targetNote.id)
    if (res.code === '200') {
      notes.value.forEach(n => n.isOnHome = false)
      targetNote.isOnHome = true
      ElMessage.success('已置顶到首页 🏠')
    }
  } catch (e) { ElMessage.error('操作失败') }
}

const openCreateDialog = () => {
  Object.assign(form, { id: null, content: '', bgImage: 'yellow', mood: '😊' })
  dialogVisible.value = true
}

const openEditDialog = (note) => {
  Object.assign(form, { id: note.id, content: note.content, bgImage: note.bgImage, mood: note.mood })
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!form.content.trim()) return ElMessage.warning('写几个字呗~')
  submitting.value = true
  try {
    if (!form.id) {
      const payload = {
        coupleId: currentCoupleId.value,
        senderId: currentUser.value.id,
        content: form.content,
        bgImage: form.bgImage,
        mood: form.mood
      }
      const res = await noteApi.sendNote(payload)
      if (res.code === '200') {
        dialogVisible.value = false
        ElMessage.success('贴好啦 ✨')
        await fetchNotes()
      }
    } else {
      const payload = { id: form.id, content: form.content, bgImage: form.bgImage, mood: form.mood }
      const res = await noteApi.updateNote(payload)
      if (res.code === '200') {
        dialogVisible.value = false
        ElMessage.success('修改成功 ✨')
        await fetchNotes()
      }
    }
  } catch (e) { ElMessage.error('操作失败') }
  finally { submitting.value = false }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('撕掉这张便签吗？', '提示', { confirmButtonText: '撕掉', type: 'warning' })
    const res = await noteApi.deleteNote(id)
    if (res.code === '200') {
      ElMessage.success('已撕掉')
      await fetchNotes()
    }
  } catch (e) {}
}

const fetchCurrentUser = async () => {
  try {
    const res = await userApi.getCurrentUser()
    if (res.code === '200') {
      currentUser.value = res.data
      currentCoupleId.value = res.data.coupleId
      if (currentCoupleId.value) await fetchNotes()
    }
  } catch (error) { ElMessage.error('获取用户信息失败') }
}

const fetchNotes = async () => {
  try {
    const res = await noteApi.getNoteList(currentCoupleId.value)
    if (res.code === '200') {
      // 🌟 只显示当前用户自己写的便签（过滤掉对方的）
      notes.value = res.data
        .filter(note => note.senderId === currentUser.value?.id)
        .map(note => ({
          ...note,
          isOnHome: note.isOnHome === 1,
          randomStyle: generateRandomStyle()
        }))
    }
  } catch (error) {
    console.error('Fetch notes error:', error)
    ElMessage.error('获取留言失败')
  }
}

const formatTime = (t) => {
  const d = new Date(t)
  return `${d.getMonth()+1}.${d.getDate()}`
}
const getNoteColorClass = (c) => `card-bg-${c}`

onMounted(() => { fetchCurrentUser() })
</script>

<style scoped>
/* 使用系统字体栈，替代 Google Fonts */

.note-wall-container { min-height: 100vh; background-color: #FFFBF5; font-family: 'PingFang SC', 'Nunito', 'Microsoft YaHei', sans-serif; padding-bottom: 100px; position: relative; overflow-x: hidden; }

.bg-blob { position: fixed; border-radius: 50%; filter: blur(80px); z-index: 0; opacity: 0.6; animation: float 10s infinite ease-in-out; }
.blob-1 { width: 400px; height: 400px; background: #FFD1DC; top: -50px; left: -50px; animation-delay: 0s; }
.blob-2 { width: 350px; height: 350px; background: #E0F7FA; bottom: 50px; right: -50px; animation-delay: 5s; }
@keyframes float { 0% { transform: translate(0, 0); } 50% { transform: translate(20px, 30px); } 100% { transform: translate(0, 0); } }

.wall-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; position: sticky; top: 0; z-index: 100; background: rgba(255, 251, 245, 0.8); backdrop-filter: blur(10px); }
.page-title { font-size: 24px; font-weight: 800; color: #5D5D5D; letter-spacing: -0.5px; }
.back-btn { cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: 700; color: #666; transition: 0.2s; font-size: 15px; }
.back-btn:hover { color: #FF8FAB; transform: translateX(-3px); }
.placeholder { width: 60px; }

.wall-content { padding: 20px 4%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; }
.status-bar { text-align: center; color: #999; font-size: 14px; margin-bottom: 20px; font-family: 'KaiTi', 'STKaiti', 'Indie Flower', cursive; font-weight: bold; }

.notes-board { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; padding: 40px 0; }

.note-card {
  width: 240px; height: 240px; padding: 20px;
  position: relative; display: flex; flex-direction: column;
  box-shadow: 2px 8px 20px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
}
.note-card:hover { transform: scale(1.1) rotate(0deg) !important; z-index: 10; box-shadow: 0 15px 40px rgba(0,0,0,0.15); }

.washi-tape { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 80px; height: 24px; background-color: rgba(255, 255, 255, 0.4); backdrop-filter: blur(2px); box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 2px dashed rgba(0,0,0,0.05); border-right: 2px dashed rgba(0,0,0,0.05); opacity: 0.8; }
.card-bg-yellow .washi-tape { background-color: rgba(255, 240, 150, 0.5); }
.card-bg-pink .washi-tape { background-color: rgba(255, 200, 220, 0.5); }
.card-bg-blue .washi-tape { background-color: rgba(200, 230, 255, 0.5); }
.card-bg-green .washi-tape { background-color: rgba(200, 240, 210, 0.5); }

.home-sticker { position: absolute; top: -10px; right: -10px; background: #FF8FAB; color: #fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-size: 16px; transform: rotate(15deg); z-index: 2; border: 2px solid #fff; }

.card-bg-yellow { background-color: #FDF6E3; color: #5D4037; }
.card-bg-pink { background-color: #FCE4EC; color: #880E4F; }
.card-bg-blue { background-color: #E1F5FE; color: #01579B; }
.card-bg-green { background-color: #E8F5E9; color: #1B5E20; }

.card-body { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 10px; }
.handwriting-font { font-family: 'KaiTi', 'STKaiti', 'Indie Flower', cursive; font-size: 24px; line-height: 1.4; width: 100%; word-break: break-word; }
.mood-stamp { position: absolute; bottom: 50px; right: 10px; font-size: 40px; opacity: 0.15; transform: rotate(-15deg); filter: grayscale(0.5); pointer-events: none; }

.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px dashed rgba(0,0,0,0.05); font-size: 12px; opacity: 0.6; transition: 0.3s; }
.note-card:hover .card-footer { opacity: 1; }
.date { font-weight: bold; font-family: 'KaiTi', 'STKaiti', 'Indie Flower', cursive; }

.action-bar { display: flex; gap: 8px; }
.mini-btn { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.6); cursor: pointer; transition: 0.2s; font-size: 12px; }
.mini-btn:hover { transform: scale(1.1); background: #fff; }
.mini-btn.pin.active { color: #FF8FAB; background: #fff; }
.mini-btn.delete:hover { color: #FF4D4F; }

.fab-add { position: fixed; bottom: 40px; right: 30px; width: 64px; height: 64px; background: #2c2c2c; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); cursor: pointer; transition: 0.3s; z-index: 99; border: 3px solid rgba(255,255,255,0.2); }
.fab-add:hover { transform: scale(1.1) rotate(90deg); }

:deep(.cream-dialog) { border-radius: 32px; padding: 10px; background: #FFFBF5; }
.note-form { padding: 15px; }
.color-picker { display: flex; gap: 16px; margin-bottom: 25px; justify-content: center; }
.color-dot { width: 36px; height: 36px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: 0.2s; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.color-dot.yellow { background: #FDF6E3; }
.color-dot.pink { background: #FCE4EC; }
.color-dot.blue { background: #E1F5FE; }
.color-dot.green { background: #E8F5E9; }
.color-dot.active { border-color: #555; transform: scale(1.15); }

.note-textarea { width: 100%; height: 160px; border: none; padding: 20px; border-radius: 20px; font-size: 22px; outline: none; resize: none; margin-bottom: 20px; transition: 0.3s; color: #444; box-shadow: inset 2px 2px 8px rgba(0,0,0,0.03); }
.note-textarea.bg-yellow { background: #FDF6E3; }
.note-textarea.bg-pink { background: #FCE4EC; }
.note-textarea.bg-blue { background: #E1F5FE; }
.note-textarea.bg-green { background: #E8F5E9; }

.form-footer { display: flex; justify-content: space-between; align-items: center; }
.mood-selector { background: #F2F2F2; padding: 10px 20px; border-radius: 25px; font-size: 14px; font-weight: 700; color: #666; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.current-mood { font-size: 20px; }
.char-count { font-size: 13px; color: #999; }
.dialog-actions { display: flex; justify-content: flex-end; gap: 12px; width: 100%; }

@media (max-width: 768px) {
  .notes-board { gap: 20px; }
  .note-card { width: 46%; height: 200px; padding: 15px; }
  .handwriting-font { font-size: 18px; }
  .mood-stamp { font-size: 30px; bottom: 40px; }
}
</style>
