import { createRouter, createWebHistory } from 'vue-router'
import layout from '../layout/layout.vue'
const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect:"/student",//重定向
    children:[
      {
        path:'home',
        name:'Home',
        component:() => import('../views/HomeView.vue')
      },
      {
        path:'teacher',
        name:'Teacher',
        component:() => import('../views/Teacher.vue')
      },
      {
        path: 'student',
        name: 'Student',
        component:() => import('../views/Student.vue')
      },
      {
        path: 'notice',
        name: 'Notice',
        component:() => import('../views/Notice.vue')
      },
      {
        path: 'curriculum',
        name: 'Curriculum',
        component:() => import('../views/Curriculum.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
