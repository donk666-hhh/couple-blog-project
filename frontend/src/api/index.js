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
      headers: { 'Content-Type': 'multipart/form-data' }
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
  // 获取相册列表
  getAlbumList: (params) => {
    return request({
      url: '/album/list',
      method: 'get',
      params
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
      headers: { 'Content-Type': 'multipart/form-data' }
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
