import { createRouter, createWebHistory } from 'vue-router'
// layout
import AdminLayout from '@/layouts/AdminLayout.vue'
import OperatorLayout from '@/layouts/OperatorLayout.vue'
// views
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import AdminOperatorView from '@/views/AdminOperatorView.vue'
import AdminTeamView from '@/views/AdminTeamView.vue'

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
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboardView,
        },
        {
          path: 'teams',
          name: 'admin-teams',
          component: AdminTeamView,
        },
        {
          path: 'operators',
          name: 'admin-operators',
          component: AdminOperatorView,
        }
      ],
    },
  ],
})

export default router
