import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
  import Forget from '../views/Login/Forget'
  import Regist from '../views/Login/Regist'
  import LoginMain from '../views/Login/Main'
  
import Main from '../views/Main'

import Forum from '../views/Forum'
import AddArtical from '../views/Forum/AddArtical.vue'
import Artical from '../views/Forum/Artical.vue'

import Conversation from '../views/Conversation'
import TimeLine from '../views/TimeLine'


Vue.use(VueRouter)

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
        path: '/main/forum',
        name: 'forum',
        component: Forum,
      },
    ]
  },
  {
    path:'/addArtical',
    name:'addArtical',
    component:AddArtical
  },
  {
    path:'/artical:id',
    name:'Artical',
    component:Artical
  },
  {
    path: '/conversation',
    name: 'conversation',
    component: Conversation
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: TimeLine
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
