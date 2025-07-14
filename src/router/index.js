import { createRouter, createWebHistory } from 'vue-router'
// layout
import AdminLayout from '@/layouts/AdminLayout.vue'
import OperatorLayout from '@/layouts/OperatorLayout.vue'
// views
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import TeamInfo from '@/views/admin/TeamInfo.vue'
import TeamList from '@/views/admin/TeamList.vue'
import LoginView from '@/views/LoginView.vue'
import OperatorInfo from '@/views/admin/OperatorInfo.vue'
import OperatorList from '@/views/admin/OperatorList.vue'
import AccountList from '@/views/admin/AccountList.vue'
import StateLoader from '@/views/admin/StateLoader.vue'
import AccountInfo from '@/views/admin/AccountInfo.vue'

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
      path: '/loader',
      name: 'loader',
      component: StateLoader,
    },
    {
      path: '/admin/',
      component: AdminLayout,
      children: [
        {
          path: '/admin/dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/teams',
          name: 'team-list',
          component: TeamList,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/teams/:id',
          name: 'team-info',
          component: TeamInfo,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/operators',
          name: 'operator-list',
          component: OperatorList,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/operators/:id',
          name: 'operator-info',
          component: OperatorInfo,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/accounts',
          name: 'account-list',
          component: AccountList,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/accounts/:id',
          name: 'account-info',
          component: AccountInfo,
          meta: { requiresAuth: true }
        }
      ],
    },
  ],
})

// 👇 Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token') // ou utilise ton store

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' }) // redirige vers login si non connecté
  } else {
    next()
  }
})


export default router
