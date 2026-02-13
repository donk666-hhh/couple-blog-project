# HomeView 开发进度报告

> 更新时间：2026-02-12

## 📊 整体进度

| 模块 | 前端页面 | 后端 API | 数据库表 | 完成度 |
|------|---------|---------|---------|--------|
| 单身模式 | ✅ | ✅ | ✅ | 100% |
| 情侣模式 | ✅ | ✅ | ✅ | 100% |
| 心情状态 | ✅ | ✅ | ✅ | 100% |
| 倒计时 | ✅ | ✅ | ✅ | 100% |
| 留言板 | ✅ | ✅ | ✅ | 95% |
| 相册 | ✅ | ⚠️ | ✅ | 30% |
| 愿望清单 | ✅ | ⚠️ | ✅ | 30% |
| 发布动态 | ✅ | ⚠️ | ✅ | 20% |
| 时光轴 | ✅ | ✅ | ✅ | 100% |
| 天气组件 | ⚠️ | ❌ | N/A | 40% |

---

## 🎉 已完成功能

### 1. 单身模式 ✅
- **界面展示**：欢迎卡片 + 邀请码展示
- **复制功能**：点击邀请码自动复制
- **绑定功能**：输入对方邀请码发起绑定
- **引导卡片**：Personal Diary / My Gallery 入口

### 2. 情侣模式 ✅
- **天气组件**：显示城市和温度（温度暂为硬编码）
- **恋爱天数**：自动计算并显示心跳动画
- **用户头像**：点击跳转个人设置

### 3. 心情状态双系统 ✅
- **Happy 状态**：自定义文字 + Emoji
- **Resting 状态**：自定义文字 + Emoji
- **状态切换**：开关组件实时切换
- **双方展示**：上半部分显示对方状态，下半部分显示自己状态

### 4. 留言板便签 ✅ (95%)
- **便签颜色联动**：NoteWall 选择的颜色会同步到 Home
  - 支持 4 种颜色：yellow, pink, blue, green
  - 颜色值与 NoteWallView 保持一致
- **置顶功能**：
  - 全局唯一置顶（一个情侣只能置顶一条）
  - 后端接口：`PUT /note/pin/{id}` 和 `PUT /note/unpin/{id}`
  - 数据库字段：`is_on_home` (TINYINT(1))
- **首页展示**：优先显示置顶的留言，若无置顶则取最新
- **数据来源**：调用 `noteApi.getNoteList()` 获取真实数据

**待完善**：
- 留言内容当前只显示最新的单条，考虑显示更多历史

### 5. 倒计时 ✅
- **日期计算**：正确处理 LocalDate 字符串转换
- **自动更新**：每次进入页面重新计算天数

---

## ⚠️ 部分实现功能

### 1. 相册 (Album) - 30%
**当前状态**：
- 界面展示：✅ `.photo-card` 卡片
- 点击跳转：✅ 跳转到 `/album`
- 后端 API：⚠️ 仅有 `getAlbumList`，缺少上传、删除、创建相册等接口

**需要实现**：
- `AlbumView.vue` 页面组件
- 图片上传功能
- 相册分类管理
- 照片删除功能

**后端接口需求**：
```
POST   /album/upload        - 上传照片到指定相册
POST   /album/album        - 创建新相册分类
DELETE /album/{id}          - 删除照片
PUT    /album/{id}          - 修改照片信息
GET    /album/detail/{id}   - 获取相册详情
```

### 2. 愿望清单 (Wishlist) - 30%
**当前状态**：
- 界面展示：✅ `.wish-card` 卡片（带进度条）
- 点击跳转：✅ 跳转到 `/wishlist`
- 后端 API：⚠️ 仅有 `getWishlist`，缺少增删改接口
- 数据展示：⚠️ 标题和金额为硬编码 "Mac mini M5"

**需要实现**：
- `WishlistView.vue` 页面组件
- 添加/编辑愿望功能
- 进度更新功能
- 上传还愿照片功能

**后端接口需求**：
```
POST   /wishlist/create     - 创建新愿望
PUT    /wishlist/{id}       - 更新愿望（进度/状态）
DELETE /wishlist/{id}       - 删除愿望
POST   /wishlist/{id}/proof - 上传还愿照片
```

### 3. 发布动态 (Publish) - 20%
**当前状态**：
- FAB 按钮：✅ Floating Dock 中的 "+" 按钮
- 点击事件：✅ 绑定 `openPublish` 方法
- 功能实现：❌ 仅 `console.log('Open Publish')`，无实际弹窗

**需要实现**：
- `PublishDialog.vue` 发布弹窗组件
- 图片上传功能
- 动态预览功能
- 发布到 API

**后端接口需求**：
```
POST   /post/create         - 创建帖子
POST   /post/upload         - 上传图片
GET    /post/my             - 获取我的帖子
DELETE /post/{id}           - 删除帖子
PUT    /post/{id}           - 编辑帖子
```

### 4. 天气组件 - 40%
**当前状态**：
- 界面展示：✅ 显示城市名称和 "24°C"
- 数据来源：⚠️ 温度为硬编码，未调用天气 API
- 城市数据：✅ `user.cityName` 和 `user.cityCode` 字段已存在

**需要实现**：
- 天气 API 集成（高德天气 / 和风天气等）
- 动态温度和天气图标更新
- 根据用户所在城市自动获取天气

**建议实现**：
```javascript
// 在 loadUserInfo 中调用天气 API
const fetchWeather = async (cityCode) => {
  const res = await axios.get(`/weather?city=${cityCode}`)
  weather.value = res.data  // { temp: 24, icon: '⛅️', condition: '多云' }
}
```

---

## ❌ 未实现功能

### 博客文章 - 0%
- 前端无文章列表页
- 前端无文章详情页
- API 定义不完整

### 活动功能 - 10%
- 数据库表存在：`sys_activity`
- API 未定义
- 前端无活动页面

### 评论系统 - 0%
- 数据库表存在：`sys_comment`
- API 未定义
- 前端无评论组件

---

## 📝 最近更新 (2026-02-12)

### 留言功能更新
1. ✅ **便签颜色联动**：HomeView 留言背景色与 NoteWallView 保持一致
   - 使用组合选择器 `.note-content.bg-*` 确保样式正确应用
   - 支持颜色：yellow (#FDF6E3), pink (#FCE4EC), blue (#E1F5FE), green (#E8F5E9)

2. ✅ **置顶逻辑优化**：首页优先显示置顶的留言
   - 检查 `isOnHome === 1` 的留言优先显示
   - 若无置顶则按时间取最新的
   - 全局唯一置顶（后端已实现）

3. ✅ **数据库迁移**：添加 `is_on_home` 字段
   ```sql
   ALTER TABLE `sys_note`
   ADD COLUMN `is_on_home` TINYINT(1) DEFAULT 0 COMMENT '是否置顶到首页(0否 1是)';
   ```

### 后端接口更新
- ✅ **NoteController**：
  - 新增 `PUT /note/pin/{id}` - 设置首页置顶
  - 新增 `PUT /note/unpin/{id}` - 取消首页置顶
  - 修改置顶逻辑：按情侣ID 全局唯一

- ✅ **Note 实体**：添加 `isOnHome` 字段

### 前端 API 更新
- ✅ **api/index.js**：
  - 新增 `noteApi.pinToHome(id)`
  - 新增 `noteApi.unpinFromHome(id)`

### 样式优化
- ✅ 修复 CSS 选择器问题，使用组合选择器确保样式正确应用
- ✅ 修复文本溢出问题，使用 `-webkit-line-clamp: 2` 限制显示两行

---

## 🎯 下一步开发建议

### P0 - 核心功能
1. **发布动态功能** - 用户体验核心
   - 创建发布弹窗组件
   - 实现图片上传
   - 完善后端帖子接口

2. **相册功能** - 情侣空间核心内容
   - 创建 AlbumView 页面
   - 实现上传/删除功能
   - 完善后端接口

### P1 - 重要功能
1. **留言板实时加载** - 替换静态内容
   - HomeView 当前已从 API 获取数据 ✅
   - 考虑添加下拉刷新或定时刷新

2. **愿望清单完整实现**
   - 创建 WishlistView 页面
   - 实现增删改功能

### P2 - 增强功能
1. **天气组件** - 完善用户体验
   - 集成真实天气 API
   - 动态天气图标

2. **博客文章** - 内容生态
   - 创建文章列表页
   - 创建文章详情页

---

## 🐛 已知问题

1. **天气温度**：当前为硬编码 "24°C"，需要接入真实天气 API
2. **愿望数据**：当前为硬编码 "Mac mini M5"，需要从 API 获取
3. **相册图片**：当前使用占位图片，需要接入真实数据

---

> 文档维护：请在实现新功能后及时更新本进度报告
