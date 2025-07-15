<template>
  <header
    style="
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 4rem;
      padding: 0 1.5rem;
      background-color: white;
      border-bottom: 1px solid #f3f4f6;
      z-index: 10;
    "
  >
    <!-- 우측 사용자 정보 -->
    <div style="display: flex; align-items: center; gap: 1rem">
      <span v-if="auth.user" style="color: #374151; font-size: 0.875rem">{{
        auth.user.email
      }}</span>
      <button
        v-if="auth.user"
        @click="logout"
        style="
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background-color: #f3f4f6;
          color: #dc2626;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        "
      >
        로그아웃
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  await auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
/* 완전히 비움: Tailwind만 사용 */
</style>
