import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'homePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path:'/newsDetail',
    name:'newsDetail',
    component: () => import('../views/NewsDetail.vue')
  },
  {
    path:'/login',
    name:'login',
    component: () => import('../views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
