<template>
  <div class="timeline-container cream-theme">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <nav class="top-nav">
      <div class="back-btn" @click="router.push('/home')">
        <el-icon><ArrowLeft /></el-icon> Home
      </div>
      <h2 class="page-title">Our Story</h2>
      <div class="add-btn-top" @click="openAddDialog">
        <el-icon><Plus /></el-icon>
      </div>
    </nav>

    <div class="timeline-wrapper">
      <div v-if="events.length === 0" class="empty-state">
        <div class="empty-icon">📸</div>
        <p class="empty-title">还没有记录大事件哦</p>
        <p class="empty-desc">快去添加你们的第一个回忆吧！✨</p>
        <el-button round class="cream-btn" @click="openAddDialog">Record Now</el-button>
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
              <div class="action-btns">
                <div class="edit-btn" @click.stop="openEditDialog(item)">
                  <el-icon><EditPen /></el-icon>
                </div>
                <div class="delete-btn" @click.stop="handleDelete(item.id)">
                  <el-icon><Delete /></el-icon>
                </div>
              </div>

              <div v-if="item.imageUrl" class="grid-gallery" :class="getGridClass(parseImages(item.imageUrl).length)">
                <img
                    v-for="(url, imgIndex) in parseImages(item.imageUrl)"
                    :key="imgIndex"
                    :src="url"
                    class="grid-img"
                    @click.stop="previewImage(url, parseImages(item.imageUrl))"
                >
              </div>

              <h3 class="event-title">{{ item.title }}</h3>
              <p class="event-desc" v-if="item.description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
        v-model="dialogVisible"
        :title="form.id ? 'Edit Memory 📝' : 'New Memory ✨'"
        class="responsive-dialog"
        align-center
    >
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
          <el-input v-model="form.title" placeholder="给这段回忆起个名字..." class="cream-input" />
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker v-model="form.eventDate" type="date" placeholder="哪一天发生的？" class="cream-input w-100" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="Photos (Max 9)">
          <div class="upload-wall">
            <div v-for="(img, idx) in form.images" :key="img.uid || idx" class="wall-item">
              <img :src="img.url" class="wall-img">
              <div class="wall-del" @click="removeImage(idx)">
                <el-icon><Close /></el-icon>
              </div>
              <div v-if="img.loading" class="wall-loading">
                <el-icon class="is-loading"><Loading /></el-icon>
              </div>
            </div>

            <el-upload
                v-if="form.images.length < 9"
                class="wall-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleFileChange"
                multiple
            >
              <div class="wall-plus">
                <el-icon><Plus /></el-icon>
              </div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="写下当时的心情..." class="cream-input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" round>取消</el-button>
          <el-button
              type="primary"
              color="#FF8FAB"
              round
              :loading="submitting"
              :disabled="isUploading"
              @click="handleSubmit"
          >
            {{ isUploading ? '图片上传中...' : '确认' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-image-viewer
        v-if="showViewer"
        @close="showViewer = false"
        :url-list="previewUrlList"
        :initial-index="previewIndex"
    />
    <FloatingDock />
  </div>
</template>

<script setup>
import FloatingDock from '@/components/FloatingDock.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, Delete, EditPen, Close, Loading } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { timelineApi, albumApi } from '@/api'

const router = useRouter()
const dialogVisible = ref(false)
const submitting = ref(false)
const isUploading = ref(false)
const showViewer = ref(false)
const previewUrlList = ref([])
const previewIndex = ref(0)

const iconMap = { love: '❤️', travel: '✈️', food: '🍜', milestone: '🏆', gift: '🎁', cat: '🐱', money: '💰' }
const getIcon = (type) => iconMap[type] || '❤️'

const events = ref([])
// images 数组用来暂存编辑时的图片对象 { url, uid, loading }
const initialForm = { id: null, title: '', eventDate: '', imageUrl: '', images: [], description: '', type: 'love' }
const form = reactive({ ...initialForm })

const fetchTimeline = async () => {
  try {
    const res = await timelineApi.getTimeline()
    if (res.code === '200') events.value = res.data || []
  } catch (error) {
    // 认证错误由 request.js 统一处理
  }
}

// 🌟 解析逗号分隔的 URL
const parseImages = (urlStr) => {
  if (!urlStr) return []
  return urlStr.split(',').filter(s => s)
}

// 🌟 核心：打开编辑时，把字符串转回数组
const openAddDialog = () => {
  // 逐个属性重置，避免 reactive 对象问题
  Object.keys(initialForm).forEach(key => {
    form[key] = initialForm[key]
  })
  form.images = []; // 重置图片数组
  dialogVisible.value = true
}

const openEditDialog = (item) => {
  Object.assign(form, { ...item });
  // 将 "url1,url2" 转为 [{url: url1}, {url: url2}]
  form.images = parseImages(item.imageUrl).map(url => ({ url, uid: url, loading: false }))
  dialogVisible.value = true
}

// 🌟 核心：九宫格上传逻辑
const handleFileChange = async (file) => {
  if (form.images.length >= 9) return ElMessage.warning('最多传 9 张哦')

  // 1. 先占位
  const tempImg = { uid: file.uid, url: URL.createObjectURL(file.raw), loading: true }
  form.images.push(tempImg)
  isUploading.value = true

  try {
    const res = await timelineApi.uploadImage(file.raw)
    if (res.code === '200') {
      // 2. 替换为真实 URL
      const target = form.images.find(img => img.uid === file.uid)
      if (target) {
        target.url = res.data
        target.loading = false
      }
    }
  } catch (e) {
    ElMessage.error('上传失败')
    form.images = form.images.filter(img => img.uid !== file.uid)
  } finally {
    // 检查是否所有图片都 loading 结束
    isUploading.value = form.images.some(img => img.loading)
  }
}

const removeImage = (index) => {
  form.images.splice(index, 1)
}

const handleSubmit = async () => {
  if(!form.title || !form.eventDate) return ElMessage.warning('请填写完整信息')
  if(isUploading.value) return ElMessage.warning('还有图片在上传中...')

  submitting.value = true
  try {
    // 🌟 提交前，把数组 join 成字符串
    const finalUrls = form.images.map(img => img.url).join(',')

    const payload = { ...form, imageUrl: finalUrls }
    // 移除临时字段 images，防止后端报错（如果后端严格校验）
    delete payload.images

    const apiCall = form.id ? timelineApi.updateEvent(form.id, payload) : timelineApi.createEvent(payload);
    const res = await apiCall
    if (res.code === '200') {
      ElMessage.success('回忆已保存 ✨')
      dialogVisible.value = false
      await fetchTimeline()
    }
  } catch (e) { ElMessage.error('保存失败') } finally { submitting.value = false }
}

const handleDelete = async (id) => {
  // V2.0.1: 查询关联的相册照片数量，给出更友好的提示
  const albumRes = await albumApi.getBySourceId(id)
  const albumCount = albumRes.code === '200' ? (albumRes.data?.length || 0) : 0

  const confirmMsg = albumCount > 0
    ? `此操作将同时删除相册中的 ${albumCount} 张照片，是否继续？`
    : '确定要删除吗？'

  ElMessageBox.confirm(confirmMsg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await timelineApi.deleteEvent(id)
    if (res.code === '200') {
      ElMessage.success(albumCount > 0 ? '删除成功，关联照片已同步删除' : '已删除')
      events.value = events.value.filter(e => e.id !== id)
    }
  }).catch(() => {})
}

// 🌟 预览逻辑：支持左右滑动
const previewImage = (currentUrl, urlList) => {
  previewUrlList.value = urlList
  // 找到当前点击图片的索引
  previewIndex.value = urlList.indexOf(currentUrl)
  showViewer.value = true
}

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })

// 🌟 辅助：计算 Grid 类名
const getGridClass = (len) => {
  if (len === 1) return 'cols-1'
  if (len === 2 || len === 4) return 'cols-2'
  return 'cols-3'
}

onMounted(() => { fetchTimeline() })
</script>

<style scoped>
/* 基础样式复用（省略重复部分，保持一致）... */
.timeline-container { min-height: 100vh; background-color: #FFFBF5; font-family: 'PingFang SC', 'Nunito', 'Microsoft YaHei', sans-serif; padding-bottom: 120px; position: relative; overflow-x: hidden; }
.bg-blob { position: fixed; border-radius: 50%; filter: blur(90px); z-index: 0; opacity: 0.5; }
.blob-1 { width: 400px; height: 400px; background: #FFB7B2; top: -100px; left: -50px; }
.blob-2 { width: 300px; height: 300px; background: #B5EAD7; bottom: 100px; right: -50px; }
.top-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px); }
.page-title { font-size: 20px; font-weight: 800; color: #5D5D5D; }
.add-btn-top { width: 36px; height: 36px; background: #FF8FAB; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.timeline-wrapper { padding: 20px; max-width: 800px; margin: 0 auto; position: relative; z-index: 10; }
.center-line { position: absolute; left: 50%; top: 20px; bottom: 0; width: 4px; background: #FFE5D9; transform: translateX(-50%); z-index: 0; border-radius: 4px; }
.timeline-item { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 60px; position: relative; width: 100%; }
.timeline-dot { position: absolute; left: 50%; top: 0; transform: translate(-50%, 0); width: 44px; height: 44px; background: #fff; border-radius: 50%; z-index: 5; display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 4px solid #fff; flex-shrink: 0; }
.timeline-dot.love { border-color: #FF8FAB; }
.timeline-content { width: 42%; position: relative; padding-top: 10px; }
.timeline-item.left .timeline-content { text-align: right; }
.timeline-item.right { flex-direction: row-reverse; }
.event-date { font-family: 'Indie Flower', cursive; font-size: 18px; color: #9A9A9A; font-weight: 700; margin-bottom: 10px; display: block; }
.content-card { background: #fff; border-radius: 24px; padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); transition: all 0.3s ease; position: relative; overflow: hidden; }
.action-btns { position: absolute; top: 10px; right: 10px; display: flex; gap: 8px; visibility: hidden; opacity: 0; transition: 0.3s; z-index: 20; }
.content-card:hover .action-btns { visibility: visible; opacity: 1; }
.delete-btn, .edit-btn { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.delete-btn { background: #FF4D4F; }
.edit-btn { background: #FFDAC1; color: #7a5c48; }
.event-title { font-size: 18px; font-weight: 800; color: #5D5D5D; margin: 0 0 8px 0; }
.event-desc { font-size: 14px; color: #888; line-height: 1.6; margin: 0; white-space: pre-wrap; }
.type-selector { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.type-option { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; cursor: pointer; background: #F5F5F5; border: 2px solid transparent; transition: 0.2s; }
.type-option.active { border-color: #FF8FAB; background: #FFF0F5; transform: scale(1.1); }

/* 🌟🌟🌟 新增：小红书/朋友圈 风格九宫格 🌟🌟🌟 */
.grid-gallery {
  display: grid;
  gap: 6px; /* 间隙稍微大一点点，更有呼吸感 */
  margin-bottom: 12px;
  width: 100%;
  /* 移除外层 overflow: hidden，因为每个子图都有圆角 */
}

.grid-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 必须裁剪以保持整齐 */
  object-position: center top; /* 🌟 关键：优先显示图片的中上部（人脸/头），防止切头 */
  cursor: zoom-in;
  transition: opacity 0.3s;
  border-radius: 8px; /* 小红书风格圆角 */
  background: #f8f8f8;
}
.grid-img:hover { opacity: 0.9; }

/* --- 📱 场景 1：单张大图 (修复版) --- */
.grid-gallery.cols-1 {
  /* 🌟 核心修复：宽度撑满卡片，不再留白 */
  width: 100% !important;
  grid-template-columns: 1fr;

  /* 🌟 比例保持 3:4 (竖屏黄金比例)，适合人像/穿搭 */
  /* 如果觉得太长，可以改成 4 / 3 (横屏) 或 1 / 1 (正方形) */
  aspect-ratio: 3 / 4;

  margin-bottom: 10px; /* 让图片和下方的标题稍微有点距离 */
}

/* 针对单张图的圆角优化 */
.grid-gallery.cols-1 .grid-img {
  border-radius: 12px; /* 单张图圆角大一点，更好看 */
  object-position: center 20%; /* 🌟稍微偏上一点，防止切掉头 */
}

/* --- 📱 场景 2：双图/四图 (双列布局) --- */
.grid-gallery.cols-2 {
  grid-template-columns: repeat(2, 1fr);
  /* 高度自动由内容(正方形)撑开 */
}
.grid-gallery.cols-2 .grid-img {
  aspect-ratio: 1 / 1; /* 强制正方形 */
}

/* --- 📱 场景 3：三图/五到九图 (三列布局) --- */
.grid-gallery.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-gallery.cols-3 .grid-img {
  aspect-ratio: 1 / 1; /* 强制正方形 */
}

/* 📱 手机端微调 */
@media (max-width: 768px) {
  /* 手机上单张图可以宽一点 */
  .grid-gallery.cols-1 {
    width: 85%;
    aspect-ratio: 3 / 4;
  }

  /* 手机上间隙小一点 */
  .grid-gallery { gap: 4px; }
}
/* 🌟🌟🌟 新增：仿微信上传墙样式 🌟🌟🌟 */
.upload-wall { display: flex; flex-wrap: wrap; gap: 8px; }
.wall-item, .wall-uploader { width: 70px; height: 70px; border-radius: 8px; overflow: hidden; position: relative; }
.wall-img { width: 100%; height: 100%; object-fit: cover; }
.wall-plus { width: 100%; height: 100%; background: #F8F8F8; color: #AAA; display: flex; align-items: center; justify-content: center; font-size: 24px; border: 1px dashed #DDD; cursor: pointer; transition: 0.2s; }
.wall-plus:hover { border-color: #FF8FAB; color: #FF8FAB; background: #FFF0F5; }
.wall-del { position: absolute; top: 0; right: 0; background: rgba(0,0,0,0.5); color: #fff; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-bottom-left-radius: 6px; z-index: 5; }
.wall-loading { position: absolute; inset: 0; background: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center; z-index: 4; font-size: 20px; color: #FF8FAB; }

/* 响应式弹窗 */
:deep(.responsive-dialog) { width: 500px; border-radius: 28px !important; background-color: #FFFBF5 !important; }

/* 🌟🌟🌟 空状态样式 🌟🌟🌟 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
  animation: floatImage 3s ease-in-out infinite;
}

.empty-title {
  font-size: 22px;
  font-weight: 700;
  color: #5D5D5D;
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 16px;
  color: #888;
  margin-bottom: 30px;
  line-height: 1.6;
}

.cream-btn {
  background: #FF8FAB;
  color: #fff;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
}

/* 📱 手机端深度适配 */
@media (max-width: 768px) {
  :deep(.responsive-dialog) { width: 92% !important; margin-top: 5vh !important; }
  .center-line { left: 20px !important; transform: none !important; top: 0 !important; bottom: 0 !important; }
  .timeline-dot { left: 20px !important; transform: translateX(-50%) !important; top: 0 !important; position: absolute !important; margin-top: 0 !important; }
  .timeline-item { flex-direction: column !important; align-items: flex-start !important; width: 100% !important; margin-left: 0 !important; padding-left: 50px !important; margin-bottom: 40px !important; position: relative !important; box-sizing: border-box !important; }
  .timeline-content { width: 100% !important; text-align: left !important; padding: 0 !important; }
  .event-date { position: static !important; text-align: left !important; margin-bottom: 8px !important; display: block !important; margin-top: -5px !important; }
  .action-btns { visibility: visible !important; opacity: 1 !important; top: 10px !important; right: 10px !important; background: rgba(255, 255, 255, 0.9); border-radius: 20px; padding: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

  /* 手机上九宫格单图稍微方一点 */
  .grid-gallery.cols-1 { aspect-ratio: 4 / 3; }
  .wall-item, .wall-uploader { width: 60px; height: 60px; } /* 手机上传格小一点 */

  /* 空状态手机端适配 */
  .empty-state { padding: 60px 20px; min-height: 300px; }
  .empty-icon { font-size: 60px; }
  .empty-title { font-size: 18px; }
  .empty-desc { font-size: 14px; }
  .cream-btn { padding: 10px 24px; font-size: 14px; }
}
</style>