<template>
  <div class="timeline-container cream-theme">

    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <nav class="top-nav">
      <div class="back-btn" @click="router.push('/home')">
        <el-icon><ArrowLeft /></el-icon> Home
      </div>
      <h2 class="page-title">Our Story</h2>
      <div class="add-btn-top" @click="dialogVisible = true">
        <el-icon><Plus /></el-icon>
      </div>
    </nav>

    <div class="timeline-wrapper">

      <div v-if="events.length === 0" class="empty-state">
        <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" alt="Empty">
        <p>还没有记录大事件哦，快去添加第一个吧！✨</p>
        <el-button round class="cream-btn" @click="dialogVisible = true">Record Now</el-button>
      </div>

      <div v-else class="timeline-list">
        <div class="center-line"></div>

        <div
            v-for="(item, index) in events"
            :key="item.id"
            class="timeline-item animate-item"
            :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }"
        >
          <div class="timeline-dot" :class="item.type || 'love'">
            <div class="emoji-inner">{{ getIcon(item.type) }}</div>
          </div>

          <div class="timeline-content">
            <span class="event-date">{{ formatDate(item.eventDate) }}</span>
            <div class="content-card">
              <div class="delete-btn" @click.stop="handleDelete(item.id)">
                <el-icon><Delete /></el-icon>
              </div>

              <img v-if="item.imageUrl" :src="item.imageUrl" class="event-img" @click="previewImage(item.imageUrl)">
              <h3 class="event-title">{{ item.title }}</h3>
              <p class="event-desc" v-if="item.description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="New Memory ✨" width="90%" class="cream-dialog" align-center>
      <el-form :model="form" label-position="top">
        <el-form-item label="Event Type">
          <div class="type-selector">
            <div
                v-for="(icon, type) in iconMap"
                :key="type"
                class="type-option"
                :class="{ active: form.type === type, [type]: true }"
                @click="form.type = type"
            >
              {{ icon }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Title">
          <el-input v-model="form.title" placeholder="e.g. First Kiss 💋" class="cream-input" />
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker v-model="form.eventDate" type="date" placeholder="Pick a date" class="cream-input w-100" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="Photo (Optional)">
          <el-upload class="event-uploader" action="#" :show-file-list="false" :auto-upload="false" :on-change="handleFileChange">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="uploaded-img" />
            <div v-else class="upload-placeholder"><el-icon><Plus /></el-icon> Upload</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.description" type="textarea" rows="2" placeholder="Write something..." class="cream-input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false" round>Cancel</el-button>
        <el-button type="primary" color="#FF8FAB" round :loading="submitting" @click="handleSubmit">Save Memory</el-button>
      </template>
    </el-dialog>

    <el-image-viewer v-if="showViewer" @close="showViewer = false" :url-list="[previewUrl]" />

    <FloatingDock />

  </div>
</template>

<script setup>
import FloatingDock from '@/components/FloatingDock.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, Delete } from '@element-plus/icons-vue' // 引入 Delete 图标
import { ElMessage, ElMessageBox } from 'element-plus'
import { timelineApi } from '@/api'

const router = useRouter()
const dialogVisible = ref(false)
const submitting = ref(false)
const showViewer = ref(false)
const previewUrl = ref('')

const iconMap = {
  love: '❤️', travel: '✈️', food: '🍜', milestone: '🏆', gift: '🎁', cat: '🐱'
}
const getIcon = (type) => iconMap[type] || '❤️'

const events = ref([])
const form = reactive({ title: '', eventDate: '', imageUrl: '', description: '', type: 'love' })

const fetchTimeline = async () => {
  try {
    const res = await timelineApi.getTimeline()
    if (res.code === '200') events.value = res.data || []
  } catch (error) {
    if (error.response?.status === 401) router.push('/login')
  }
}

const handleFileChange = (file) => { form.imageUrl = URL.createObjectURL(file.raw) }

const handleSubmit = async () => {
  if(!form.title || !form.eventDate) return ElMessage.warning('Title and Date are required')
  submitting.value = true
  try {
    const res = await timelineApi.createEvent({ ...form })
    if (res.code === '200') {
      ElMessage.success('Memory Added! 🎉')
      dialogVisible.value = false
      await fetchTimeline()
      Object.assign(form, { title: '', eventDate: '', imageUrl: '', description: '', type: 'love' })
    }
  } catch (error) { ElMessage.error('Failed to create event') }
  finally { submitting.value = false }
}

// --- 🗑️ 删除逻辑 ---
const handleDelete = (id) => {
  ElMessageBox.confirm(
      'Are you sure you want to delete this memory?',
      'Delete Memory',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
        icon: Delete // 使用图标
      }
  ).then(async () => {
    try {
      const res = await timelineApi.deleteEvent(id)
      if (res.code === '200') {
        ElMessage.success('Deleted successfully')
        // 本地移除，避免重新请求闪烁
        events.value = events.value.filter(e => e.id !== id)
      }
    } catch (error) {
      ElMessage.error('Delete failed')
    }
  }).catch(() => {})
}

const previewImage = (url) => { previewUrl.value = url; showViewer.value = true }
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

onMounted(() => { fetchTimeline() })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

.timeline-container { min-height: 100vh; background-color: #FFFBF5; font-family: 'Nunito', sans-serif; padding-bottom: 120px; position: relative; overflow-x: hidden; }
.top-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px; position: sticky; top: 0; z-index: 100; background: rgba(255, 251, 245, 0.9); backdrop-filter: blur(10px); }
.page-title { font-size: 20px; font-weight: 800; color: #5D5D5D; }
.add-btn-top { width: 36px; height: 36px; background: #FF8FAB; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 143, 171, 0.4); }

.timeline-wrapper { padding: 20px; max-width: 800px; margin: 0 auto; position: relative; }
.center-line { position: absolute; left: 50%; top: 20px; bottom: 0; width: 4px; background: #FFE5D9; border-radius: 2px; transform: translateX(-50%); z-index: 0; }

.timeline-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; position: relative; width: 100%; }

.timeline-dot {
  position: absolute; left: 50%; top: 20px; transform: translate(-50%, -50%);
  width: 36px; height: 36px; background: #fff; border-radius: 50%; z-index: 1;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border: 4px solid #ddd; transition: all 0.3s;
}
.timeline-dot.love { border-color: #FF8FAB; background: #FFF0F5; }
.timeline-dot.travel { border-color: #A2D2FF; background: #F0F8FF; }
.timeline-dot.food { border-color: #FFDAC1; background: #FFFFF0; }
.timeline-dot.milestone { border-color: #CDB4DB; background: #F8F0FF; }
.timeline-dot.gift { border-color: #B5EAD7; background: #F0FFF4; }
.timeline-dot.cat { border-color: #FFC8DD; background: #FFF5EE; }

.timeline-content { width: 45%; position: relative; }
.timeline-item.left { flex-direction: row; }
.timeline-item.left .timeline-content { text-align: right; }
.timeline-item.left .event-date { position: absolute; right: -120%; top: 15px; width: 100px; text-align: left; }
.timeline-item.right { flex-direction: row-reverse; }
.timeline-item.right .timeline-content { text-align: left; }
.timeline-item.right .event-date { position: absolute; left: -120%; top: 15px; width: 100px; text-align: right; }

.event-date { font-family: 'Indie Flower', cursive; font-size: 16px; color: #9A9A9A; font-weight: 700; }
.content-card {
  background: #fff; border-radius: 20px; padding: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02);
  transition: transform 0.3s; position: relative;
}
.content-card:hover { transform: translateY(-5px); }

/* 🗑️ 删除按钮样式 */
.delete-btn {
  position: absolute; top: 10px; right: 10px;
  width: 28px; height: 28px; border-radius: 50%;
  background: #FFF0F0; color: #FF4D4F;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; opacity: 0; transition: opacity 0.2s;
  z-index: 10;
}
/* 仅悬停时显示删除按钮 */
.content-card:hover .delete-btn { opacity: 1; }
.delete-btn:hover { background: #FF4D4F; color: #fff; }

.event-img { width: 100%; height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; cursor: zoom-in; }
.event-title { font-size: 16px; font-weight: 800; color: #5D5D5D; margin-bottom: 5px; }
.event-desc { font-size: 13px; color: #888; line-height: 1.5; white-space: pre-wrap; }

/* 弹窗样式 */
.type-selector { display: flex; gap: 10px; flex-wrap: wrap; }
.type-option { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; border: 2px solid transparent; background: #F5F5F5; transition: all 0.2s; }
.type-option:hover { transform: scale(1.1); }
.type-option.active.love { border-color: #FF8FAB; background: #FFF0F5; }
/* ...其他颜色复用... */
.event-uploader { width: 100%; height: 150px; border: 2px dashed #ddd; border-radius: 12px; display: flex; justify-content: center; align-items: center; cursor: pointer; overflow: hidden; }
.uploaded-img { width: 100%; height: 100%; object-fit: cover; }
.empty-state { text-align: center; padding-top: 100px; }
.empty-state img { width: 150px; opacity: 0.8; margin-bottom: 20px; }
.cream-btn { background: #FF8FAB; border: none; color: #fff; font-weight: 700; }
.bg-blob { position: fixed; border-radius: 50%; filter: blur(90px); z-index: -1; opacity: 0.5; }
.blob-1 { width: 300px; height: 300px; background: #B5EAD7; top: 10%; right: -50px; }
.blob-2 { width: 300px; height: 300px; background: #FFDAC1; bottom: 10%; left: -50px; }

/* 📱 移动端适配 */
@media (max-width: 768px) {
  /* 1. 线条移到左侧 */
  .center-line { left: 30px; transform: none; }

  /* 2. 圆点移到左侧 */
  .timeline-dot { left: 30px; transform: translateX(-50%); }

  /* 3. 内容区统统靠右 */
  .timeline-item { flex-direction: column !important; align-items: flex-start; margin-left: 60px; width: auto; margin-bottom: 30px; }
  .timeline-content { width: 100%; text-align: left !important; }

  /* 4. 日期样式微调 */
  .event-date {
    position: static !important; /* 取消绝对定位 */
    display: block;
    margin-bottom: 5px;
    text-align: left !important;
    font-size: 14px;
    color: #FF8FAB; /* 移动端高亮日期颜色 */
  }

  /* 5. 移动端删除按钮一直显示（因为没有 hover） */
  .delete-btn { opacity: 1; background: transparent; color: #ddd; top: 5px; right: 5px; }
}
</style>