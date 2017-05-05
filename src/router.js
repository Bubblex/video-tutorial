import React from 'react'
import { Router, Route } from 'dva/router'

import HomePage from './routes/home/index'
import AccountLoginPage from './routes/account/login/index'
import AccountRegisterPage from './routes/account/register/index'

import UserInfoPage from './routes/user/info/index'
import UserIndexPage from './routes/user/index/index'
import UserVideoPage from './routes/user/video/index'
import UserArticlePage from './routes/user/article/index'
import UserLikePage from './routes/user/like/index'
import UserLikeVideoPage from './routes/user/likevideo/index'
import UserCommentPage from './routes/user/comment/index'
import UserChangepwd from './routes/user/changepwd/index'
import UserFollow from './routes/user/follow/index'
import UserStar from './routes/user/star/index'

import ReleaseVideoPage from './routes/release/video/index'
import ReleaseArticlePage from './routes/release/article/index'

import VedioListPage from './routes/video/list/index'
import VedioDetailPage from './routes/video/detail/index'

import ArticleListPage from './routes/article/list/index'
import ArticleDetailPage from './routes/article/detail/index'

import AdminUserIndexPage from './routes/admin/user/index/index'
import AdminArticleIndexPage from './routes/admin/article/index/index'
import AdminVideoIndexPage from './routes/admin/video/index/index'
import AdminCommentVideoPage from './routes/admin/comment/video/index'
import AdminCommentArticlePage from './routes/admin/comment/article/index'
import AdminLogin from './routes/admin/login'
import AdminDashboard from './routes/admin/dashboard'

import ExampleLogin from './routes/example/login'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* 主页*/}
      <Route path='/' component={HomePage} />

      {/* 个人主页*/}
      <Route path='/user' component={UserIndexPage} />
      {/* 个人资料*/}
      <Route path='/user/info' component={UserInfoPage} />
      {/* 我的视频*/}
      <Route path='/user/video' component={UserVideoPage} />
      {/* 我的文章*/}
      <Route path='/user/article' component={UserArticlePage} />
      {/* 我的收藏*/}
      <Route path='/user/like' component={UserLikePage} />
      {/* 我的文章收藏*/}
      <Route path='/user/likevideo' component={UserLikeVideoPage} />
      {/* 我的关注*/}
      <Route path='/user/star' component={UserStar} />
      {/* 我的粉丝*/}
      <Route path='/user/follow' component={UserFollow} />
      {/* 我的评论*/}
      <Route path='/user/comment' component={UserCommentPage} />
      {/* 修改密码*/}
      <Route path='/user/changepwd' component={UserChangepwd} />

      {/* 发布视频*/}
      <Route path='/release/video' component={ReleaseVideoPage} />
      {/* 发布文章*/}
      <Route path='/release/article' component={ReleaseArticlePage} />

      {/* 视频列表*/}
      <Route path='/video/list' component={VedioListPage} />
      {/* 视频详情*/}
      <Route path='/video/detail' component={VedioDetailPage} />

      {/* 文章列表*/}
      <Route path='/article/list' component={ArticleListPage} />
      {/* 文章详情*/}
      <Route path='/article/detail' component={ArticleDetailPage} />

      {/* 登录*/}
      <Route path='/account/login' component={AccountLoginPage} />
      {/* 注册*/}
      <Route path='/account/register' component={AccountRegisterPage} />

      <Route path='/admin' component={AdminDashboard}>
        <Route path='user' component={AdminUserIndexPage} />
        <Route path='article' component={AdminArticleIndexPage} />
        <Route path='video' component={AdminVideoIndexPage} />
      </Route>

      <Route path='/admin/login' component={AdminLogin} />

      {/* 视频评论管理*/}
      <Route path='/admin/comment/video' component={AdminCommentVideoPage} />
      {/* 文章评论管理*/}
      <Route path='/admin/comment/article' component={AdminCommentArticlePage} />

      <Route path='/example/login' component={ExampleLogin} />
    </Router>
  )
}

export default RouterConfig
