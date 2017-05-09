const PREFIX = '/api'

// 1.1上传静态文件
export const API_UPLOAD = `${PREFIX}/upload`

// 2.1登录
export const API_LOGIN = `${PREFIX}/account/login`

// 2.2注册
export const API_REGISTER = `${PREFIX}/account/register`

// 2.3重置密码
export const API_ACCOUNT_RESET = `${PREFIX}/account/reset`

// 3.1.1用户完整信息
export const API_USER_INFO = `${PREFIX}/user/info`

// 3.1.2申请成为讲师
export const API_APPLY_LECTURER = `${PREFIX}/apply/lecturer`

// 3.1.3获取用户公开数据
export const API_USER_BASIC = `${PREFIX}/user/basic`

// 3.1.4修改个人资料
export const API_ACCOUNT_UPDATE = `${PREFIX}/account/update`

// 3.2.1关注列表
export const API_STARS = `${PREFIX}/stars`

// 3.2.2粉丝列表
export const API_FOLLOWERS = `${PREFIX}/followers`

// 3.2.3关注某个用户
export const API_FOLLOW = `${PREFIX}/follow`

// 3.2.4取消关注某个用户
export const API_UNFOLLOW = `${PREFIX}/unfollow`

// 3.3.1获取文章分类
export const API_ARTICLE_TYPE = `${PREFIX}/article/type`

// 3.3.2文章列表
export const API_ARTICLE_LIST = `${PREFIX}/article/list`

// 3.3.3获取文章详情
export const API_ARTICLE_DETAIL = `${PREFIX}/article/detail`

// 3.3.4收藏文章
export const API_ARTICLE_COLLECT = `${PREFIX}/article/collect`

// 3.3.5取消收藏文章
export const API_ARTICLE_CANCEL = `${PREFIX}/article/cancel`

// 3.3.6发布一篇文章
export const API_ARTICLE_RELEASE = `${PREFIX}/article/release`

// 3.3.7删除一篇文章
export const API_ARTICLE_DELETE = `${PREFIX}/article/delete`

// 3.4.1视频列表
export const API_VIDEO_LIST = `${PREFIX}/video/list`

// 3.4.2 视频详情
export const API_VIDEO_DETAIL = `${PREFIX}/video/detail`

// 3.4.3 收藏视频
export const API_VIDEO_COLLECT = `${PREFIX}/video/collect`

// 3.4.4 取消收藏视频
export const API_VIDEO_CANCEL = `${PREFIX}/video/cancel`

// 3.4.5 发布 / 修改视频
export const API_VIDEO_RELEASE = `${PREFIX}/video/release`

// 3.4.6 删除一条视频
export const API_VIDEO_DELETE = `${PREFIX}/video/delete`

// 3.5.1 消息列表
export const API_MESSAGE_LIST = `${PREFIX}/message/list`

// 3.5.2 阅读消息
export const API_MESSAGE_READ = `${PREFIX}/message/read`

// 3.5.3 删除消息
export const API_MESSAGE_DELETE = `${PREFIX}/message/delete`

// 4.1.1 管理员登录
export const API_ADMIN_LOGIN = `${PREFIX}/admin/login`

// 4.1.2 获取用户列表
export const API_ADMIN_FETCH_USER_LIST = `${PREFIX}/admin/user/list`

// 4.1.3 禁用用户账户
export const API_ADMIN_DISABLE_USER = `${PREFIX}/admin/user/disable`

// 4.1.4 获取文章列表
export const API_ADMIN_FETCH_ARTICLE_LIST = `${PREFIX}/admin/article/list`

// 4.1.5 启用 / 禁用文章
export const API_ADMIN_DISABLE_ARTICLE = `${PREFIX}/admin/article/disable`

// 4.1.6 获取视频列表
export const API_ADMIN_FETCH_VIDEO_LIST = `${PREFIX}/admin/video/list`

// 4.1.7 启用 / 禁用视频
export const API_ADMIN_DISABLE_VIDEO = `${PREFIX}/admin/video/disable`

// 4.1.8 获取待认证用户
export const API_ADMIN_FETCH_USER_CERTIFICATION_LIST = `${PREFIX}/admin/user/certification/list`

// 4.1.9 认证用户
export const API_ADMIN_USER_CERTIFICATION = `${PREFIX}/admin/user/certification`

// 4.1.10 获取视频待审核列表
export const API_ADMIN_FETCH_VIDEO_REVIEW_LIST = `${PREFIX}/admin/video/review/list`

// 4.1.11 审核视频
export const API_ADMIN_VIDEO_REVIEW = `${PREFIX}/admin/video/review`
