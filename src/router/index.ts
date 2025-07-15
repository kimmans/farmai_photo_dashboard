import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Farms from '../views/Farms.vue'
import Photos from '../views/Photos.vue'
import Missions from '../views/Missions.vue'
import Login from '../components/LoginForm.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/farms', component: Farms, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/photos', component: Photos, meta: { requiresAuth: true } },
  { path: '/missions', component: Missions, meta: { requiresAuth: true, requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // 인증이 필요한 페이지인 경우
  if (to.meta.requiresAuth && !auth.user) {
    await auth.fetchUser()
    if (!auth.user) return next('/login')
  }

  // admin 권한이 필요한 페이지인 경우
  if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
    return next('/') // admin이 아니면 대시보드로 리다이렉트
  }

  next()
})

export default router
