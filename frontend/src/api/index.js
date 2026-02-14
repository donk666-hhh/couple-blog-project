import request from '@/utils/request'

// 用户相关接口
export const userApi = {
  // 获取当前用户信息
  getCurrentUser: () => {
    return request({
      url: '/user/me',
      method: 'get'
    })
  },

  // 用户登录
  login: (data) => {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  // 用户注册
  register: (data) => {
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  },

  // 更新用户资料
  updateProfile: (data) => {
    return request({
      url: '/user/update',
      method: 'put',
      data: {
        nickname: data.nickname,
        avatar: data.avatar,
        cityCode: data.cityCode,
        cityName: data.cityName,
        happyText: data.happyText,
        happyEmoji: data.happyEmoji,
        restingText: data.restingText,
        restingEmoji: data.restingEmoji,
        isHappy: data.isHappy
      }
    })
  },

  // 修改密码
  changePassword: (oldPassword, newPassword) => {
    return request({
      url: '/user/change-password',
      method: 'post',
      data: { oldPassword, newPassword }
    })
  },

  // 上传头像
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request({
      url: '/user/upload-avatar',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000  // 文件上传需要更长超时时间：60秒
    })
  }
}

// 情侣相关接口
export const coupleApi = {
  // 查找用户（通过邀请码）
  searchUser: (inviteCode) => {
    return request({
      url: '/couple/search',
      method: 'get',
      params: { inviteCode }
    })
  },

  // 发起情侣绑定
  bindCouple: (inviteCode) => {
    return request({
      url: '/couple/bind',
      method: 'post',
      data: { inviteCode }
    })
  },

  // 获取情侣信息
  getCoupleInfo: () => {
    return request({
      url: '/couple/info',
      method: 'get'
    })
  },

  // 解除情侣关系
  unbindCouple: () => {
    return request({
      url: '/couple/unbind',
      method: 'delete'
    })
  }
}

// 帖子相关接口
export const postApi = {
  // 获取帖子列表
  getPostList: (params) => {
    return request({
      url: '/post/list',
      method: 'get',
      params
    })
  },

  // 创建帖子
  createPost: (data) => {
    return request({
      url: '/post',
      method: 'post',
      data
    })
  }
}

// 相册相关接口
export const albumApi = {
  // 上传照片到 OSS
  uploadPhoto: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request({
      url: '/album/upload',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000  // 文件上传需要更长超时时间：60秒
    })
  },

  // 获取相册列表
  getAlbumList: (params) => {
    return request({
      url: '/album/list',
      method: 'get',
      params
    })
  },

  // V2.0.1: 按分区获取照片 (category: all/timeline/wishlist)
  getByCategory: (category) => {
    return request({
      url: `/album/category/${category}`,
      method: 'get'
    })
  },

  // V2.0.1: 根据来源获取照片
  getBySourceId: (sourceId) => {
    return request({
      url: `/album/source/${sourceId}`,
      method: 'get'
    })
  },

  // V2.0.1: 保存照片到数据库
  savePhoto: (data) => {
    return request({
      url: '/album/save',
      method: 'post',
      data
    })
  },

  // 删除单张照片（按ID）
  deletePhoto: (id) => {
    return request({
      url: `/album/delete/${id}`,
      method: 'delete'
    })
  },

  // V2.0.1: 根据来源删除照片（批量级联删除）
  deleteBySource: (sourceId, sourceType) => {
    return request({
      url: `/album/source/${sourceId}/${sourceType}`,
      method: 'delete'
    })
  },

  // V2.0.1: 获取时光轴相册分组（文件夹视图）
  getTimelineGroups: () => {
    return request({
      url: '/album/groups',
      method: 'get',
      params: { type: 'timeline' }
    })
  },

  // V2.0.1: 获取愿望清单相册分组（文件夹视图）
  getWishlistGroups: () => {
    return request({
      url: '/album/groups',
      method: 'get',
      params: { type: 'wishlist' }
    })
  }
}

// 时光轴相关接口
export const timelineApi = {
  // 获取时光轴列表
  getTimeline: () => {
    return request({
      url: '/timeline/list',
      method: 'get'
    })
  },

  // 上传时光轴图片
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request({
      url: '/timeline/upload',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000  // 文件上传需要更长超时时间：60秒
    })
  },

  // 创建时光轴事件（保存到数据库）
  createEvent: (data) => {
    return request({
      url: '/timeline/save',  // 后端接口改为 /save
      method: 'post',
      data
    })
  },

  // 更新时光轴事件
  updateEvent: (id, data) => {
    return request({
      url: `/timeline/update/${id}`,
      method: 'put',
      data
    })
  },

  // 删除时光轴事件
  deleteEvent: (id) => {
    return request({
      url: `/timeline/delete/${id}`,
      method: 'delete'
    })
  }
}

// 愿望清单相关接口
export const wishlistApi = {
  // 获取愿望清单
  getWishlist: (coupleId) => {
    return request({
      url: '/wishlist/list',
      method: 'get',
      params: { coupleId }
    })
  },

  // 创建愿望
  createWishlist: (data) => {
    return request({
      url: '/wishlist/save',
      method: 'post',
      data
    })
  },

  // 更新愿望
  updateWishlist: (data) => {
    return request({
      url: '/wishlist/update',
      method: 'put',
      data
    })
  },

  // 删除愿望
  deleteWishlist: (id) => {
    return request({
      url: `/wishlist/delete/${id}`,
      method: 'delete'
    })
  },

  // V2.0.1: 上传愿望实现照片
  uploadProofPhotos: (id, photoUrls) => {
    return request({
      url: `/wishlist/${id}/proof`,
      method: 'post',
      data: { photoUrls }
    })
  },

  // V2.0.1: 关联时间轴里程碑
  linkToTimeline: (id, timelineId) => {
    return request({
      url: `/wishlist/${id}/milestone`,
      method: 'put',
      data: { timelineId }
    })
  },

  // V2.0.1: 取消时间轴里程碑关联
  unlinkTimeline: (id) => {
    return request({
      url: `/wishlist/${id}/milestone`,
      method: 'delete'
    })
  }
}

// 留言板相关接口
export const noteApi = {
  // 发送留言
  sendNote: (data) => {
    return request({
      url: '/note/send',
      method: 'post',
      data
    })
  },

  // 更新留言
  updateNote: (data) => {
    return request({
      url: '/note/update',
      method: 'put',
      data
    })
  },

  // 获取留言列表
  getNoteList: (coupleId) => {
    return request({
      url: '/note/list',
      method: 'get',
      params: { coupleId }
    })
  },

  // 获取未读留言
  getUnreadNotes: (coupleId, userId) => {
    return request({
      url: '/note/unread',
      method: 'get',
      params: { coupleId, userId }
    })
  },

  // 标记为已读
  markAsRead: (id) => {
    return request({
      url: `/note/read/${id}`,
      method: 'put'
    })
  },

  // 删除留言
  deleteNote: (id) => {
    return request({
      url: `/note/${id}`,
      method: 'delete'
    })
  },

  // 设置首页置顶
  pinToHome: (id) => {
    return request({
      url: `/note/pin/${id}`,
      method: 'put'
    })
  },

  // 取消首页置顶
  unpinFromHome: (id) => {
    return request({
      url: `/note/unpin/${id}`,
      method: 'put'
    })
  }
}
