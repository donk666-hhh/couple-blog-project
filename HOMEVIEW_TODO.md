# HomeView 未实现功能分析报告

> 本文档分析 HomeView.vue 界面中展示但尚未实现的功能点。

---

## 📋 概述

HomeView.vue 是应用的主页面，包含单身模式和情侣模式两种界面。虽然界面设计完整，但部分功能尚未实现。

## 🔍 功能缺失详细分析

### 1. 相册功能 (Album)

**当前状态:**
- 界面展示: ✅ 有相册卡片 (`.photo-card`)
- 路由跳转: ✅ 点击可跳转 `/album`
- 页面实现: ❌ `AlbumView.vue` 不存在
- 后端 API: ⚠️ 仅有 `getAlbumList`，缺少上传、删除等接口

**缺失组件:**
- `frontend/src/views/AlbumView.vue` - 相册页面
- 相册上传组件
- 图片预览组件

**需要实现的后端接口:**
```
POST   /album/upload        - 上传照片
POST   /album/create        - 创建相册分类
DELETE /album/{id}          - 删除照片
PUT    /album/{id}          - 修改照片信息
GET    /album/detail/{id}   - 获取相册详情
```

**数据库表支持:**
- `sys_album` 表已存在 ✅

---

### 2. 愿望清单功能 (Wishlist)

**当前状态:**
- 界面展示: ✅ 有愿望卡片 (`.wish-card`)
- 路由跳转: ✅ 点击可跳转 `/wishlist`
- 页面实现: ❌ `WishlistView.vue` 不存在
- 后端 API: ⚠️ 仅有 `getWishlist`，缺少增删改接口

**缺失组件:**
- `frontend/src/views/WishlistView.vue` - 愿望清单页面
- 添加愿望对话框
- 进度更新组件

**需要实现的后端接口:**
```
POST   /wishlist/create     - 创建愿望
PUT    /wishlist/{id}       - 更新愿望（进度/状态）
DELETE /wishlist/{id}       - 删除愿望
POST   /wishlist/{id}/proof - 上传还愿照片
```

**数据库表支持:**
- `sys_wishlist` 表已存在 ✅

---

### 3. 发布动态功能 (Publish)

**当前状态:**
- 界面展示: ✅ Floating Dock 中有 "+" 按钮
- 点击事件: ✅ 绑定了 `openPublish` 方法
- 功能实现: ❌ 仅 `console.log('Open Publish')`，无实际功能

**需要实现的组件:**
- 发布弹窗组件 (`PublishDialog.vue` 或类似)
- 图片上传组件
- 动态预览组件

**需要实现的后端接口:**
```
POST   /post/create         - 创建帖子
POST   /post/upload         - 上传图片
GET    /post/my             - 获取我的帖子
DELETE /post/{id}           - 删除帖子
PUT    /post/{id}           - 编辑帖子
```

**数据库表支持:**
- `sys_post` 表已存在 ✅

---

### 4. 天气组件功能

**当前状态:**
- 界面展示: ✅ 显示城市名称和温度
- 数据来源: ⚠️ 使用 `user.cityName`，但温度是硬编码的 "24°C"
- API 调用: ❌ 没有调用天气 API

**需要实现的功能:**
- 天气 API 集成（高德/和风天气等）
- 根据 `user.cityCode` 动态获取天气
- 天气图标更新

**建议实现:**
```javascript
// 在 loadUserInfo 中调用天气 API
const fetchWeather = async (cityCode) => {
  const res = await axios.get(`/weather?city=${cityCode}`)
  weather.value = res.data
}
```

---

### 5. 留言板回复功能

**当前状态:**
- 界面展示: ✅ 留言卡片 (`.note-card`)
- Reply 按钮: ❌ 点击无反应
- 数据来源: ⚠️ 留言内容是硬编码的静态内容

**需要实现的功能:**
- 点击 Reply 打开回复弹窗
- 调用 `noteApi.sendNote()` 发送回复
- 实时获取最新留言（而非硬编码）

**API 已存在:**
- `noteApi.sendNote()` ✅
- `noteApi.getNoteList()` ✅

**数据库表支持:**
- `sys_note` 表已存在 ✅

---

### 6. 博客文章功能 (Post)

**当前状态:**
- API 定义: ⚠️ 仅有 `getPostList` 和 `createPost`
- 页面实现: ❌ 没有文章列表/详情页

**需要实现的组件:**
- 文章列表页 (`PostListView.vue`)
- 文章详情页 (`PostDetailView.vue`)
- 文章编辑器

---

### 7. 活动功能 (Activity)

**当前状态:**
- 数据库表: ✅ `sys_activity` 表已存在
- API 定义: ❌ `api/index.js` 中没有 `activityApi`
- 页面实现: ❌ 没有活动列表/详情页

**需要实现的内容:**
- `activityApi` 接口定义
- 活动列表页
- 活动详情页
- 参与活动功能

---

## 📊 总结统计

| 功能模块 | 前端页面 | 后端 API | 数据库表 | 完成度 |
|---------|---------|---------|---------|--------|
| 用户系统 | ✅ | ✅ | ✅ | 100% |
| 情侣绑定 | ✅ | ✅ | ✅ | 100% |
| 心情状态 | ✅ | ✅ | ✅ | 100% |
| 时光轴 | ✅ | ✅ | ✅ | 100% |
| 留言板 | ⚠️ | ✅ | ✅ | 80% |
| 相册 | ❌ | ⚠️ | ✅ | 30% |
| 愿望清单 | ❌ | ⚠️ | ✅ | 30% |
| 博客文章 | ❌ | ⚠️ | ✅ | 20% |
| 活动 | ❌ | ❌ | ✅ | 10% |
| 天气组件 | ⚠️ | ❌ | N/A | 40% |
| 发布功能 | ❌ | ⚠️ | ✅ | 20% |

---

## 🎯 优先级建议

### P0 - 核心功能（必须实现）
1. **发布动态功能** - 用户体验核心
2. **相册功能** - 情侣空间核心内容
3. **留言板实时加载** - 替换静态内容

### P1 - 重要功能（应该实现）
1. **愿望清单** - 已有数据库支持
2. **天气组件** - 增强体验
3. **博客文章** - 完善内容生态

### P2 - 增强功能（可以延后）
1. **活动功能** - 运营相关
2. **评论系统** - 社交相关

---

## 🚀 快速实现指南

### 相册功能 (Album)

**前端 - 添加路由:**
```javascript
// router/index.js
{
  path: '/album',
  name: 'album',
  component: () => import('../views/AlbumView.vue'),
  meta: { requiresAuth: true }
}
```

**后端 - 补充接口:**
```java
// AlbumController.java
@PostMapping("/upload")
public Result<String> upload(@RequestParam MultipartFile file) {
    // 实现上传逻辑
}

@DeleteMapping("/{id}")
public Result<Void> delete(@PathVariable Long id) {
    // 实现删除逻辑
}
```

### 愿望清单 (Wishlist)

**前端 - 添加路由:**
```javascript
// router/index.js
{
  path: '/wishlist',
  name: 'wishlist',
  component: () => import('../views/WishlistView.vue'),
  meta: { requiresAuth: true }
}
```

### 发布动态 (Publish)

**创建发布弹窗组件:**
```vue
<!-- PublishDialog.vue -->
<template>
  <el-dialog v-model="visible" title="分享美好时刻">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload :action="uploadUrl" list-type="picture-card" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </template>
  </el-dialog>
</template>
```

---

> 文档生成时间: 2026-02-12
> 分析基于: HomeView.vue (前端), api/index.js (API定义), sql.txt (数据库结构)
