import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Dashboard from '../views/Dashboard.vue';
import Users from '../views/Users.vue';
import Farms from '../views/Farms.vue';
import Photos from '../views/Photos.vue';
import Missions from '../views/Missions.vue';
import Login from '../components/LoginForm.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
  { path: '/farms', component: Farms, meta: { requiresAuth: true } },
  { path: '/photos', component: Photos, meta: { requiresAuth: true } },
  { path: '/missions', component: Missions, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.user) {
    await auth.fetchUser();
    if (!auth.user) return next('/login');
  }
  next();
});

export default router;
