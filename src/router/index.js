import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
  import Forget from '../views/Login/Forget'
  import Regist from '../views/Login/Regist'
  import LoginMain from '../views/Login/Main'
  
import Main from '../views/Main'

import Forum from '../views/Forum'
import AdminIndex from '../views/Forum/AdminIndex.vue'
import AdminArticle from '../views/Forum/AdminArticle.vue'
import AddArticle from '../views/Forum/AddArticle.vue'
import Article from '../views/Forum/Article.vue'
import EditArticle from '../views/Forum/EditArticle.vue'

import Conversation from '../views/Conversation'

import personMainPage from '../views/PersonMainPage'
import PersonCollectPage from '../views/PersonCollectPage'


Vue.use(VueRouter);
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path:'/',
    redirect:'/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    children:[
      {
        path: '/login/',
        name: 'main',
        component: LoginMain,
      },
      {
        path: '/login/forget',
        name: 'forget',
        component: Forget,
      },
      {
        path: '/login/regist',
        name: 'regist',
        component: Regist,
      },
    ]
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children:[
      {
        path: '/main/',
        name: 'forum',
        component: Forum,
      },
      {
        path: '/main/adminIndex',
        name: 'adminIndex',
        component: AdminIndex,
      },
      {
        path: '/main/adminArticle/:id',
        name: 'adminArticle',
        component: AdminArticle,
        props:true
      },
      {
        path: '/main/forum',
        name: 'forum',
        component: Forum,
      },
      {
        path:'/main/addArticle',
        name:'addArticle',
        component:AddArticle
      },
      {
        path:'/main/article/:id',
        name:'Article',
        component:Article,
        props:true
      },
      {
        path:'/main/editArticle/:id',
        name:'EditArticle',
        component:EditArticle,
        props:true
      },
      {
        path:'/main/personMainPage/:id',
        name:'personMainPage',
        component:personMainPage,
        props:true
      },
      {
        path:'/main/personCollectPage/:id',
        name:'personCollectPage',
        component:PersonCollectPage,
        props:true
      },
    ]
  },
  {
    path:'/main/addArticle',
    name:'addArticle',
    component:AddArticle
  },
  {
    path:'/main/article/:id',
    name:'Article',
    component:Article,
    props:true
  },
  {
    path: '/conversation',
    name: 'conversation',
    component: Conversation
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
