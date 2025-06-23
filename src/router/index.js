import { createRouter, createWebHistory } from 'vue-router'
// layout
import AdminLayout from '@/layouts/AdminLayout.vue'
import OperatorLayout from '@/layouts/OperatorLayout.vue'
// views
import AdminDashboard from '@/views/AdminDashboard.vue'
import TeamInfo from '@/views/TeamInfo.vue'
import TeamList from '@/views/TeamList.vue'
import LoginView from '@/views/LoginView.vue'

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
          path: '/admin/dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
        },
        {
          path: '/admin/teams',
          name: 'team-list',
          component: TeamList,
        },
        {
          path: '/admin/teams/:id',
          name: 'team-info',
          component: TeamInfo,
        },
      ],
    },
  ],
})

export default router
