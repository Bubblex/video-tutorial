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
