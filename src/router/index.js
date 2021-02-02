import Vue from 'vue'
import VueRouter from 'vue-router'
// import View from '../views'
import Forum from '../views/Forum'
import AddArtical from '../views/Forum/AddArtical.vue'
import Artical from '../views/Forum/Artical.vue'

import Conversation from '../views/Conversation'
import TimeLine from '../views/TimeLine'
import Login from '../views/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forum',
    name: 'forum',
    component: Forum,
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
