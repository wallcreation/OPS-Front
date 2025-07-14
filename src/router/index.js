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
import AccountInfo from '@/views/admin/AccountInfo.vue'
import OpsDashboard from '@/views/ops/OpsDashboard.vue'

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
          meta: { requiresAuth: true, role: 'admin'}
        },
        {
          path: '/admin/teams',
          name: 'team-list',
          component: TeamList,
          meta: { requiresAuth: true, role: 'admin'}
        },
        {
          path: '/admin/teams/:id',
          name: 'team-info',
          component: TeamInfo,
          meta: { requiresAuth: true, role: 'admin'}
        },
        {
          path: '/admin/operators',
          name: 'operator-list',
          component: OperatorList,
          meta: { requiresAuth: true, role: 'admin'}
        },
        {
          path: '/admin/operators/:id',
          name: 'operator-info',
          component: OperatorInfo,
          meta: { requiresAuth: true, role: 'admin'}
        },
        {
          path: '/admin/accounts',
          name: 'account-list',
          component: AccountList,
          meta: { requiresAuth: true, role: 'admin'}
        },
        {
          path: '/admin/accounts/:id',
          name: 'account-info',
          component: AccountInfo,
          meta: { requiresAuth: true, role: 'admin'}
        }
      ],
    },
    {
      path: '/ops/',
      component: OperatorLayout,
      children: [
        {
          path: '/ops/dashboard',
          name: 'ops-dashboard',
          component: OpsDashboard,
          meta: { requiresAuth: true, role: 'operator' }
        }
      ]
    },
  ],
})

// 👇 Global Navigation Guard
import { useSessionStore } from '@/stores/session'

router.beforeEach((to, from, next) => {
  const session = useSessionStore()
  const isLoggedIn = !!session.token

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si l'utilisateur n'est pas connecté mais que la route est protégée
    next({ name: 'login' })
  } else if (to.meta.role && session.role !== to.meta.role) {
    // Si l'utilisateur n'a pas le bon rôle
    next({ name: 'login' }) // Tu peux créer une page 401 ou rediriger ailleurs
  } else {
    next()
  }
})
export default router