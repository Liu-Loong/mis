import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import layout from '../layout/layout.vue'
import test from "@/views/test.vue";
import test2 from "@/views/test2.vue";
const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect:"/home",//重定向
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
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/test2',
    component: test2
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
