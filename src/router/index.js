import { createRouter, createWebHistory } from 'vue-router'
// import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login',
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginView,
    // },
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: AdminView,
    },
  ],
})

export default router
