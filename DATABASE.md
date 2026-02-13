# 情侣博客平台 - 数据库设计文档

> 本文档详细描述了情侣博客平台的数据库架构、表结构和字段说明。

## 数据库概述

**数据库名称**: `couple_blog`

**字符集**: `utf8mb4`

**排序规则**: `utf8mb4_unicode_ci`

**表前缀**: `sys_`

**核心表数量**: 9 张

---

## 数据库初始化

### 创建数据库
```sql
CREATE DATABASE couple_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 导入完整表结构
```bash
mysql -u root -p couple_blog < backend/couple-blog-backend/sql.txt
```

---

## 数据表详情

### 1. sys_user (用户表)

存储用户账户信息和心情状态配置。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 主键ID |
| username | varchar(50) | NOT NULL UNIQUE | - | 登录账号 |
| password | varchar(100) | NOT NULL | - | 登录密码 (BCrypt加密) |
| nickname | varchar(50) | NULL | - | 用户昵称 |
| avatar | varchar(500) | NULL | - | 头像URL |
| couple_id | bigint | NULL | - | 关联的情侣ID (NULL=单身) |
| status | tinyint | DEFAULT 1 | 1 | 状态: 1正常, 0禁用 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 注册时间 |
| authorities | varchar(255) | DEFAULT 'ROLE_USER' | 'ROLE_USER' | 用户权限列表 |
| invite_code | varchar(20) | UNIQUE | - | 邀请码 (用于情侣绑定) |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 (0=未删除,1=已删除) |
| city_code | varchar(20) | NULL | - | 城市编码 (用于天气API) |
| city_name | varchar(50) | NULL | - | 城市名称 |
| happy_text | varchar(50) | DEFAULT 'Coding...' | 'Coding...' | Happy状态文字 |
| happy_emoji | varchar(10) | DEFAULT '?' | '?' | Happy状态Emoji |
| resting_text | varchar(50) | DEFAULT 'Sleeping...' | 'Sleeping...' | Resting状态文字 |
| resting_emoji | varchar(10) | DEFAULT '?' | '?' | Resting状态Emoji |
| mood_text | varchar(50) | DEFAULT 'Coding...' | 'Coding...' | 当前状态文字 (兼容字段) |
| mood_emoji | varchar(20) | DEFAULT '?' | '?' | 当前状态Emoji (兼容字段) |
| is_happy | tinyint(1) | DEFAULT 1 | 1 | 心情开关: 1=Happy模式, 0=Resting模式 |

**索引:**
- PRIMARY KEY (`id`)
- UNIQUE KEY `uk_username` (`username`)
- UNIQUE KEY `invite_code` (`invite_code`)
- INDEX `couple_id` (`couple_id`)

---

### 2. sys_couple (情侣关系表)

存储情侣绑定关系和情侣空间配置。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 情侣ID |
| user_id_a | bigint | NOT NULL | - | 一方用户ID |
| user_id_b | bigint | NOT NULL | - | 另一方用户ID |
| couple_name | varchar(100) | DEFAULT '我们的温馨小窝' | '我们的温馨小窝' | 空间名称 |
| start_date | date | NULL | - | 恋爱纪念日 |
| bg_image | varchar(500) | NULL | - | 情侣空间背景图 |
| status | tinyint | DEFAULT 1 | 1 | 状态: 1=热恋中, 0=已解除 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 绑定时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**索引:**
- PRIMARY KEY (`id`)
- INDEX `user_id_a` (`user_id_a`)
- INDEX `user_id_b` (`user_id_b`)

---

### 3. sys_post (帖子笔记表)

存储用户发布的博客文章/动态。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 帖子ID |
| user_id | bigint | NOT NULL | - | 发帖人ID |
| couple_id | bigint | NULL | - | 归属情侣ID (NULL=个人贴) |
| title | varchar(100) | NOT NULL | - | 帖子标题 (V2.1新增) |
| content | text | NULL | - | 文字内容 |
| cover_img | varchar(500) | NOT NULL | - | 封面图 (用于首页展示) |
| image_urls | json | NULL | - | 多张配图JSON数组 ["a.jpg", "b.jpg"] |
| permission | tinyint | DEFAULT 0 | 0 | 权限: 0=公开, 1=仅情侣, 2=仅自己 |
| activity_id | bigint | NULL | - | 关联的活动ID |
| like_count | int | DEFAULT 0 | 0 | 点赞数 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 发布时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**索引:**
- PRIMARY KEY (`id`)
- INDEX `user_id` (`user_id`)
- INDEX `couple_id` (`couple_id`)
- INDEX `activity_id` (`activity_id`)

---

### 4. sys_note (情侣留言板/冰箱贴)

存储情侣间的留言和便签。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 留言ID |
| couple_id | bigint | NOT NULL | - | 情侣ID |
| sender_id | bigint | NOT NULL | - | 发送者ID |
| content | varchar(1000) | NOT NULL | - | 留言内容 (支持HTML) |
| bg_image | varchar(255) | NULL | - | 便签背景图/颜色风格 |
| is_read | tinyint(1) | DEFAULT 0 | 0 | 对方是否已读 |
| mood | varchar(20) | NULL | - | 心情贴纸 (Emoji) |
| is_hidden | tinyint(1) | DEFAULT 0 | 0 | 是否为刮刮乐 (0否 1是) |
| is_on_home | tinyint(1) | DEFAULT 0 | 0 | 是否置顶到首页 (0否 1是) |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 留言时间 |
| deleted | tinyint(1) | DEFAULT 0 | 0 | 逻辑删除 |

**便签颜色说明**：
- `yellow` - 羊皮纸黄 (#FDF6E3)
- `pink` - 脏粉 (#FCE4EC)
- `blue` - 冰川蓝 (#E1F5FE)
- `green` - 抹茶绿 (#E8F5E9)

**索引:**
- PRIMARY KEY (`id`)
- INDEX `couple_id` (`couple_id`)
- INDEX `sender_id` (`sender_id`)

---

### 5. sys_timeline (恋爱时光轴)

存储情侣的重要时刻和里程碑事件。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 事件ID |
| couple_id | bigint | NOT NULL | - | 情侣ID |
| title | varchar(100) | NOT NULL | - | 事件标题 (如: 第一次牵手) |
| event_date | date | NOT NULL | - | 发生日期 |
| type | varchar(20) | DEFAULT 'love' | 'love' | 事件类型: love/travel/food/milestone/gift/cat |
| description | text | NULL | - | 事件描述 |
| image_url | varchar(500) | NULL | - | 纪念图片 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 创建时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**事件类型说明:**
- `love` - 恋爱相关 (💖 粉色)
- `travel` - 旅行记录 (✈️ 蓝色)
- `food` - 美食记录 (🍜 橙色)
- `milestone` - 重要里程碑 (🎯 金色)
- `gift` - 礼物记录 (🎁 紫色)
- `cat` - 宠物相关 (🐱 青色)

**索引:**
- PRIMARY KEY (`id`)
- INDEX `couple_id` (`couple_id`)
- INDEX `event_date` (`event_date`)

---

### 6. sys_album (情侣相册)

存储情侣上传的照片。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 照片ID |
| couple_id | bigint | NOT NULL | - | 情侣ID |
| url | varchar(500) | NOT NULL | - | 照片地址 |
| album_name | varchar(50) | DEFAULT '默认相册' | '默认相册' | 相册分类 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 上传时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**索引:**
- PRIMARY KEY (`id`)
- INDEX `couple_id` (`couple_id`)

---

### 7. sys_wishlist (愿望清单)

存储情侣的共同愿望和目标。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 愿望ID |
| couple_id | bigint | NOT NULL | - | 情侣ID |
| title | varchar(50) | NOT NULL | - | 愿望标题 (如: Mac mini M5) |
| icon | varchar(20) | DEFAULT '⭐️' | '⭐️' | 愿望图标Emoji |
| content | varchar(500) | NULL | - | 详细描述/备注 |
| target_amount | decimal(10,2) | DEFAULT 0.00 | 0.00 | 目标金额/总进度 |
| current_amount | decimal(10,2) | DEFAULT 0.00 | 0.00 | 当前已存金额/当前进度 |
| status | tinyint | DEFAULT 0 | 0 | 状态: 0=未实现, 1=已实现 |
| proof_img | varchar(500) | NULL | - | 还愿照片 |
| type | tinyint | DEFAULT 0 | 0 | 类型: 0=存钱罐(买东西), 1=约定/计划 |
| target_date | datetime | NULL | - | 目标日期 (用于倒计时) |
| current_progress | int | DEFAULT 0 | 0 | 手动进度 (针对非金额类愿望) |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 创建时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**索引:**
- PRIMARY KEY (`id`)
- INDEX `couple_id` (`couple_id`)

---

### 8. sys_activity (官方活动表)

存储官方发布的活动和挑战。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 活动ID |
| title | varchar(200) | NOT NULL | - | 活动标题 |
| description | varchar(1000) | NULL | - | 活动描述/规则 |
| cover_img | varchar(500) | NULL | - | 活动Banner/海报 |
| start_time | datetime | NULL | - | 开始时间 (V2.1新增) |
| end_time | datetime | NULL | - | 结束时间 (V2.1新增) |
| status | tinyint | DEFAULT 1 | 1 | 状态: 1=进行中, 0=已结束 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 创建时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**索引:**
- PRIMARY KEY (`id`)

---

### 9. sys_comment (评论表)

存储用户对帖子的评论。

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | bigint | PRIMARY KEY AUTO_INCREMENT | - | 评论ID |
| post_id | bigint | NOT NULL | - | 关联帖子ID |
| user_id | bigint | NOT NULL | - | 评论人ID |
| content | varchar(500) | NOT NULL | - | 评论内容 |
| create_time | datetime | DEFAULT CURRENT_TIMESTAMP | - | 评论时间 |
| deleted | tinyint | DEFAULT 0 | 0 | 逻辑删除 |

**索引:**
- PRIMARY KEY (`id`)
- INDEX `post_id` (`post_id`)
- INDEX `user_id` (`user_id`)

---

## 表关系图 (ER关系)

```
┌─────────────┐
│  sys_user   │
└──────┬──────┘
       │ couple_id
       ↓
┌─────────────┐
│ sys_couple  │
└──────┬──────┘
       │
       ├── couple_id ──→ sys_post
       ├── couple_id ──→ sys_note
       ├── couple_id ──→ sys_timeline
       ├── couple_id ──→ sys_album
       └── couple_id ──→ sys_wishlist

┌─────────────┐
│  sys_post   │
└──────┬──────┘
       │ activity_id
       ↓
┌─────────────┐
│sys_activity │
└─────────────┘

┌─────────────┐
│  sys_post   │
└──────┬──────┘
       │ post_id
       ↓
┌─────────────┐
│ sys_comment │
└─────────────┘
```

## 通用字段说明

### 逻辑删除 (deleted)
- `0` = 未删除 (正常记录)
- `1` = 已删除 (软删除)

### 状态字段 (status)
不同表中的 status 有不同含义：
- **sys_user**: 1=正常, 0=禁用
- **sys_couple**: 1=热恋中, 0=已解除
- **sys_activity**: 1=进行中, 0=已结束
- **sys_wishlist**: 0=未实现, 1=已实现

### 时间字段
- `create_time` - 记录创建时间 (通常自动设置为 CURRENT_TIMESTAMP)
- `start_time` / `end_time` - 活动时间范围
- `event_date` / `target_date` - 特定事件日期

## 数据库命名规范

### 表名
- 统一前缀: `sys_`
- 使用下划线分隔: `sys_user`, `sys_couple`

### 字段名
- 使用下划线分隔: `user_id`, `couple_id`, `invite_code`
- 布尔值使用 `is_` 前缀: `is_happy`, `is_read`

### 实体类映射
- Java 实体类使用驼峰命名: `SysUser`, `SysCouple`
- MyBatis-Plus 自动转换: `user_id` → `userId`

---

> 文档版本: v1.0
> 最后更新: 2026-02-12
> 对应 SQL 文件: `backend/couple-blog-backend/sql.txt`
