import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../layouts/LoginLayout.vue')
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('../layouts/BaseLayout.vue')
  // },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileHome.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/testTer')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
