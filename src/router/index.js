import { createRouter, createWebHistory } from 'vue-router'
// layout
import AdminLayout from '@/layouts/AdminLayout.vue'
import OperatorLayout from '@/layouts/OperatorLayout.vue'
// views
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import TeamView from '@/views/TeamView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin/',
      component: AdminLayout,
      children : [
        {
          path: '',
          name: 'admin-dashboard',
          component: AdminDashboard
        }
      ]
    },
  ],
})

export default router
