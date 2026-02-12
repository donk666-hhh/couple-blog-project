# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 项目概述

**情侣博客平台** - 一个全栈 Web 应用，允许情侣创建账号、通过邀请码绑定伴侣、共同记录美好时光。

**Monorepo 结构：**
- `backend/` - Spring Boot 3.3.4 REST API 后端
- `frontend/` - Vue 3 + Vite 前端单页应用

## 技术栈

### 后端技术栈
- **框架**: Spring Boot 3.3.4 (Web, Security, Test)
- **语言**: Java 17
- **ORM**: MyBatis-Plus 3.5.8 (自动 CRUD 功能)
- **数据库**: MySQL 8.0+
- **认证**: JWT (JJWT 0.12.3) 无状态认证
- **API 文档**: SpringDoc OpenAPI 2.3.0
- **工具**: Lombok 减少样板代码

### 前端技术栈
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 7.3.0
- **UI 组件库**: Element Plus
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios
- **状态管理**: Pinia (已配置但未使用)

## 构建/运行命令

### 后端
```bash
# 进入后端目录
cd backend

# 使用 Maven Wrapper (跨平台)
./mvnw clean install      # 构建项目
./mvnw spring-boot:run    # 运行应用

# Windows 用户
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

### 前端
```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 生产构建
npm run build
```

**访问地址：**
- 后端 API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- 前端应用: http://localhost:5173

## 项目架构

### 后端架构（三层架构）
```
Controller 层 (@RestController)
    ↓
Service 层 (@Service 接口 + 实现类)
    ↓
Mapper 层 (MyBatis-Plus BaseMapper<T>)
    ↓
Entity 层 (@TableName, Lombok 注解)
```

**包结构说明：**
- `entity/` - 实体类，包含 MyBatis-Plus 注解
- `mapper/` - 数据访问层，继承 BaseMapper<T>
- `service/` - 服务接口 (I*XxxService*)
- `service/impl/` - 服务实现类
- `controller/` - REST 控制器
- `config/` - 配置类 (安全、MyBatis-Plus 等)
- `filter/` - JWT 认证过滤器
- `util/` - 工具类 (JWT 工具、邀请码生成器)
- `common/` - 通用类 (统一响应结果)

### 前端架构
```
frontend/src/
├── views/           # 页面组件
│   ├── Login.vue    # 登录/注册页面
│   ├── welcome.vue  # 欢迎页面
│   ├── HomeView.vue # 主仪表板（单身/情侣模式）
│   └── ProfileView.vue # 个人设置页面
├── router/          # 路由配置
│   └── index.js     # 路由定义
├── api/             # API 服务层
│   └── index.js     # 按模块分组的 API 接口
└── utils/
    └── request.js   # Axios 实例（带 JWT 拦截器）
```

## 数据库架构

### 数据库配置
- **数据库名**: `couple_blog`
- **默认连接**: `jdbc:mysql://localhost:3306/couple_blog`
- **用户名/密码**: root/root（生产环境请修改）

### 数据库初始化
完整 SQL 脚本位于 `backend/couple-blog-backend/sql.txt`，包含所有表的创建语句。

```bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE couple_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 导入完整表结构
mysql -u root -p couple_blog < backend/couple-blog-backend/sql.txt
```

### 核心数据表

#### 1. sys_user (用户表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 主键ID (自增) |
| username | varchar(50) | 登录账号 (唯一) |
| password | varchar(100) | 登录密码 (BCrypt加密) |
| nickname | varchar(50) | 用户昵称 |
| avatar | varchar(500) | 头像URL |
| couple_id | bigint | 关联的情侣ID (NULL表示单身) |
| status | tinyint | 状态: 1正常, 0禁用 |
| create_time | datetime | 注册时间 |
| authorities | varchar(255) | 用户权限 (默认: ROLE_USER) |
| invite_code | varchar(20) | 邀请码 (唯一, 用于情侣绑定) |
| city_code | varchar(20) | 城市编码 (用于天气API) |
| city_name | varchar(50) | 城市名称 (如: 广州) |
| happy_text | varchar(50) | Happy状态文字 (默认: Coding...) |
| happy_emoji | varchar(10) | Happy状态Emoji (默认: 💻) |
| resting_text | varchar(50) | Resting状态文字 (默认: Sleeping...) |
| resting_emoji | varchar(10) | Resting状态Emoji (默认: 😴) |
| mood_text | varchar(50) | 当前状态文字 (兼容字段) |
| mood_emoji | varchar(20) | 当前状态Emoji (兼容字段) |
| is_happy | tinyint(1) | 心情开关: 1开心/忙碌, 0休息/难过 |
| deleted | tinyint | 逻辑删除 (0-未删除, 1-已删除) |

#### 2. sys_couple (情侣关系表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 情侣ID (自增) |
| user_id_a | bigint | 一方用户ID |
| user_id_b | bigint | 另一方用户ID |
| couple_name | varchar(100) | 空间名称 (默认: 我们的温馨小窝) |
| start_date | date | 恋爱纪念日 |
| bg_image | varchar(500) | 情侣空间背景图 |
| status | tinyint | 状态: 1热恋中, 0已解除 |
| create_time | datetime | 绑定时间 |
| deleted | tinyint | 逻辑删除 |

#### 3. sys_post (帖子笔记表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 帖子ID (自增) |
| user_id | bigint | 发帖人ID |
| couple_id | bigint | 归属情侣ID (NULL则为个人贴) |
| title | varchar(100) | 帖子标题 |
| content | text | 文字内容 |
| cover_img | varchar(500) | 封面图 (用于首页展示) |
| image_urls | json | 多张配图JSON数组 |
| permission | tinyint | 权限: 0公开, 1仅情侣, 2仅自己 |
| activity_id | bigint | 关联的活动ID |
| like_count | int | 点赞数 |
| create_time | datetime | 发布时间 |
| deleted | tinyint | 逻辑删除 |

#### 4. sys_note (情侣留言板/冰箱贴)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 留言ID (自增) |
| couple_id | bigint | 情侣ID |
| sender_id | bigint | 发送者ID |
| content | varchar(1000) | 留言内容 (支持HTML) |
| bg_image | varchar(255) | 便签背景图/颜色风格 |
| is_read | tinyint(1) | 对方是否已读 |
| create_time | datetime | 留言时间 |
| deleted | tinyint(1) | 逻辑删除 |

#### 5. sys_timeline (恋爱时光轴)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 事件ID (自增) |
| couple_id | bigint | 情侣ID |
| title | varchar(100) | 事件标题 (如: 第一次牵手) |
| event_date | date | 发生日期 |
| type | varchar(20) | 事件类型: love/travel/food/milestone/gift/cat |
| description | text | 事件描述 |
| image_url | varchar(500) | 纪念图片 |
| create_time | datetime | 创建时间 |
| deleted | tinyint | 逻辑删除 |

#### 6. sys_album (情侣相册)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 照片ID (自增) |
| couple_id | bigint | 情侣ID |
| url | varchar(500) | 照片地址 |
| album_name | varchar(50) | 相册分类 (默认: 默认相册) |
| create_time | datetime | 上传时间 |
| deleted | tinyint | 逻辑删除 |

#### 7. sys_wishlist (愿望清单)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 愿望ID (自增) |
| couple_id | bigint | 情侣ID |
| title | varchar(50) | 愿望标题 (如: Mac mini M5) |
| icon | varchar(20) | 愿望图标Emoji (默认: ⭐️) |
| content | varchar(500) | 详细描述/备注 |
| target_amount | decimal(10,2) | 目标金额/总进度 |
| current_amount | decimal(10,2) | 当前已存金额/当前进度 |
| status | tinyint | 状态: 0未实现, 1已实现 |
| proof_img | varchar(500) | 还愿照片 |
| type | tinyint | 类型: 0存钱罐(买东西), 1约定/计划 |
| target_date | datetime | 目标日期 (用于倒计时) |
| current_progress | int | 手动进度 (针对非金额类愿望) |
| create_time | datetime | 创建时间 |
| deleted | tinyint | 逻辑删除 |

#### 8. sys_activity (官方活动表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 活动ID (自增) |
| title | varchar(200) | 活动标题 |
| description | varchar(1000) | 活动描述/规则 |
| cover_img | varchar(500) | 活动Banner/海报 |
| start_time | datetime | 开始时间 (V2.1新增) |
| end_time | datetime | 结束时间 (V2.1新增) |
| status | tinyint | 状态: 1进行中, 0已结束 |
| create_time | datetime | 创建时间 |
| deleted | tinyint | 逻辑删除 |

#### 9. sys_comment (评论表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 评论ID (自增) |
| post_id | bigint | 关联帖子ID |
| user_id | bigint | 评论人ID |
| content | varchar(500) | 评论内容 |
| create_time | datetime | 评论时间 |
| deleted | tinyint | 逻辑删除 |

### 表关系说明
- **sys_user.couple_id** → **sys_couple.id** (用户关联情侣)
- **sys_couple** 连接两个用户 (user_id_a 和 user_id_b)
- **sys_post.couple_id** → **sys_couple.id** (帖子归属情侣)
- **sys_note.couple_id** → **sys_couple.id** (留言归属情侣)
- **sys_timeline.couple_id** → **sys_couple.id** (时光轴事件归属情侣)
- **sys_album.couple_id** → **sys_couple.id** (相册归属情侣)
- **sys_wishlist.couple_id** → **sys_couple.id** (愿望清单归属情侣)
- **sys_comment.post_id** → **sys_post.id** (评论关联帖子)

## 核心功能

### 1. 邀请码系统
- **注册时生成**: 每个用户自动获得唯一的 8 位邀请码
- **生成算法**: `InviteCodeGenerator.java` 使用 SecureRandom 确保唯一性
- **使用场景**: 情侣绑定，避免用户名重复问题
- **存储字段**: `sys_user.invite_code`

### 2. Happy/Resting 双状态系统
用户可配置两套独立的心情状态：

**数据库字段：**
```sql
happy_text VARCHAR(50)     -- Happy 模式文字（如："编程中..."）
happy_emoji VARCHAR(10)    -- Happy 模式表情（如："💻"）
resting_text VARCHAR(50)   -- Resting 模式文字（如："休息中..."）
resting_emoji VARCHAR(10)  -- Resting 模式表情（如："😴"）
is_happy TINYINT           -- 1=Happy 模式，0=Resting 模式
```

**前端展示逻辑：**
- **HomeView.vue**: `displayStatus` 计算属性根据 `isHappySwitch` 显示当前状态
- **切换开关**: 可在 Happy/Resting 之间切换，实时同步到后端
- **状态配置**: ProfileView.vue 提供两套独立的配置界面

### 3. 情侣绑定机制
- **单身模式**: 显示邀请码卡片 + 对方邀请码输入框
- **情侣模式**: 展示恋爱天数、天气、双方心情状态等
- **绑定流程**: 输入对方邀请码 → 调用 `coupleApi.bindCouple()` → 建立关系
- **解除绑定**: 个人页面提供"解除关系"按钮

### 4. JWT 认证流程
1. **注册**: 密码 BCrypt 加密 → 生成邀请码
2. **登录**: Spring Security 认证 → 返回 JWT token
3. **存储**: 前端将 token 存在 localStorage
4. **请求拦截**: Axios 自动添加 `Authorization: Bearer <token>`
5. **验证**: `JwtAuthenticationFilter` 验证 token 有效性

## API 接口文档

### 用户管理 (`/user`)
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/user/register` | 用户注册 |
| POST | `/user/login` | 用户登录（返回 JWT） |
| GET | `/user/me` | 获取当前用户信息 |
| PUT | `/user/update` | 更新用户资料（含心情状态） |
| POST | `/user/change-password` | 修改密码 |
| POST | `/user/upload-avatar` | 上传头像 |
| GET | `/user/debug/all` | 调试：查询所有用户 |

### 情侣管理 (`/couple`)
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/couple/search?inviteCode=xxx` | 通过邀请码查找用户 |
| POST | `/couple/bind` | 发起情侣绑定 |
| GET | `/couple/info` | 获取情侣信息 |
| DELETE | `/couple/unbind` | 解除情侣关系 |

### 其他功能模块
- `/post` - 博客文章管理
- `/note` - 情侣留言板
- `/timeline` - 时光轴记录
- `/album` - 相册管理
- `/wishlist` - 愿望清单
- `/activity` - 官方活动
- `/comment` - 评论系统

## 前端路由配置

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | welcome.vue | 欢迎页面 |
| `/login` | Login.vue | 登录/注册页面 |
| `/home` | HomeView.vue | 主页面（单身→情侣模式切换） |
| `/profile` | ProfileView.vue | 个人设置页面 |

## 认证与安全

### 公开接口（无需认证）
- `/user/login`, `/user/register`
- `/swagger-ui/**`, `/v3/api-docs/**`
- `/actuator/health`

### 受保护接口（需要 JWT）
- 其他所有接口都需要 `Authorization: Bearer <token>`

### 安全配置 (`SecurityConfig.java`)
- **会话管理**: STATELESS（无状态）
- **密码加密**: BCrypt
- **CORS**: 配置允许前端域名访问
- **JWT 过滤器**: 在用户名密码过滤器之前执行

## 前后端交互逻辑

### 1. 登录流程
```javascript
// 1. 前端发送登录请求
const response = await axios.post('/user/login', {
  username: 'user',
  password: 'pass'
})

// 2. 存储 token
localStorage.setItem('token', response.data.data.token)

// 3. 后续请求自动携带 token
// axios 拦截器会自动添加 Authorization 头
```

### 2. 获取用户信息
```javascript
// 1. 调用 API
const res = await userApi.getCurrentUser()

// 2. 处理响应
if (res.code === '200') {
  const user = res.data
  // 根据 coupleId 判断是否已绑定
  const isCoupled = user.coupleId !== null
}
```

### 3. 更新心情状态
```javascript
// 1. 切换开关
const isHappy = newValue

// 2. 调用更新接口
const res = await userApi.updateProfile({
  isHappy: isHappy,
  happyText: '编程中...',
  happyEmoji: '💻',
  restingText: '休息中...',
  restingEmoji: '😴'
})
```

### 4. 前端 API 调用规范

所有 API 调用都在 `frontend/src/api/index.js` 中定义：

```javascript
// 用户相关接口
export const userApi = {
  getCurrentUser: () => request({ url: '/user/me', method: 'get' }),
  login: (data) => request({ url: '/user/login', method: 'post', data }),
  updateProfile: (data) => request({ url: '/user/update', method: 'put', data }),
  // ...
}
```

**请求拦截器** (`utils/request.js`)：
- 自动从 localStorage 读取 token
- 自动添加 `Authorization: Bearer <token>` 请求头
- 处理 401 错误，自动跳转登录页

**响应格式统一：**
```json
{
  "code": "200",
  "msg": "成功",
  "data": { ... }
}
```

## 开发注意事项

### 新功能开发步骤
**后端：**
1. 在 `entity/` 创建/更新实体类
2. Mapper 层自动继承 CRUD 方法
3. 在 `service/` 和 `service/impl/` 实现业务逻辑
4. 在 `controller/` 暴露 REST 接口
5. 返回 `Result<T>` 统一响应格式

**前端：**
1. 在 `api/index.js` 添加 API 方法
2. 在组件中调用 API
3. 处理响应数据

### 重要配置
**JWT 配置** (`application.yml`)：
- 密钥: `liupeichengCoupleBlogKeyPleaseMakeItLongerThan32Chars123456`（生产环境请修改！）
- 过期时间: 86400000ms（24小时）

**数据库配置**：
- 默认: root/root（生产环境请修改！）

### 代码生成工具
**MyBatis-Plus 代码生成器** (`CodeGenerator.java`)：
- 可生成 Entity、Mapper、Service、ServiceImpl、Controller
- 自动移除表名前缀 "sys_"
- 运行前需配置数据库连接

### 测试
**后端测试**: `./mvnw test`
**前端测试**: 暂未配置测试框架

## 已实现功能

### 核心功能
✅ 用户注册/登录（JWT 认证）
✅ 邀请码生成与情侣绑定
✅ Happy/Resting 双状态系统
✅ 个人资料管理（含心情配置）
✅ 前后端完整交互流程

### UI 特性
✅ 响应式设计（移动端适配）
✅ 毛玻璃效果卡片
✅ 动态背景（Canvas 动画）
✅ 温馨的配色方案

### 待实现功能
- 博客文章功能
- 相册上传
- 时光轴记录
- 留言板
- 愿望清单
- 评论系统

## 调试技巧

### 后端调试
1. **SQL 日志**: 已开启 MyBatis-Plus SQL 打印
2. **调试接口**: `/user/debug/all` 可查看所有用户
3. **Swagger 文档**: http://localhost:8080/swagger-ui.html

### 前端调试
1. **开发模式**: `npm run dev` 启动热重载
2. **网络请求**: 使用浏览器 DevTools 查看 Network 面板
3. **状态管理**: 使用 Vue DevTools 插件

---

此文档涵盖了项目的核心架构、技术栈、功能特性以及前后端交互的完整流程。开发新功能时请遵循本文档的规范和约定。
