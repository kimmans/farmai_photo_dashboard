<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f9fafb;
    "
  >
    <div
      style="
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        padding: 2rem;
        width: 100%;
        max-width: 400px;
      "
    >
      <!-- 상단 구분선 -->
      <div style="height: 1px; background-color: #111827; margin-bottom: 2rem"></div>

      <!-- 딸기 아이콘 -->
      <div style="text-align: center; margin-bottom: 1.5rem">
        <div style="font-size: 2rem; margin-bottom: 1rem">🍓</div>
      </div>

      <!-- 제목 -->
      <div style="text-align: center; margin-bottom: 2rem">
        <h1 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem">
          스마트베리 대시보드
        </h1>
      </div>

      <form @submit.prevent="onLogin" style="display: flex; flex-direction: column; gap: 1.5rem">
        <div>
          <label
            for="email"
            style="
              display: block;
              font-size: 0.875rem;
              font-weight: 500;
              color: #111827;
              margin-bottom: 0.5rem;
            "
            >이메일</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="이메일을 입력하세요"
            required
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #d1d5db;
              border-radius: 0.375rem;
              background-color: #f9fafb;
              font-size: 0.875rem;
              outline: none;
              transition: border-color 0.2s;
            "
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#d1d5db'"
          />
        </div>

        <div>
          <label
            for="password"
            style="
              display: block;
              font-size: 0.875rem;
              font-weight: 500;
              color: #111827;
              margin-bottom: 0.5rem;
            "
            >비밀번호</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #d1d5db;
              border-radius: 0.375rem;
              background-color: #f9fafb;
              font-size: 0.875rem;
              outline: none;
              transition: border-color 0.2s;
            "
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#d1d5db'"
          />
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          style="
            width: 100%;
            padding: 0.75rem;
            background-color: #6b7280;
            color: white;
            border: 1px solid #111827;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          "
          :style="auth.loading ? 'opacity: 0.5; cursor: not-allowed;' : ''"
          onmouseover="if (!auth.loading) this.style.backgroundColor='#4b5563'"
          onmouseout="if (!auth.loading) this.style.backgroundColor='#6b7280'"
        >
          {{ auth.loading ? '로그인 중...' : '로그인' }}
        </button>

        <div
          v-if="auth.error"
          style="
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 0.5rem;
            padding: 1rem;
            color: #dc2626;
            font-size: 0.875rem;
          "
        >
          {{ auth.error }}
          <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #9ca3af">
            문의: 02-782-7834 <br />
            주식회사 팜러닝
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()

const onLogin = async () => {
  console.log('로그인 시도:', email.value)
  await auth.signIn(email.value, password.value)
  if (auth.user) {
    console.log('로그인 성공:', auth.user)
    router.push('/') // 로그인 성공 시 대시보드로 이동
  } else if (auth.error) {
    console.log('로그인 실패:', auth.error)
  }
}

// auth 상태 변화 감지하여 로그 출력 (디버깅용)
watch(
  () => auth.error,
  (val) => {
    if (val) console.log('에러 상태 변경:', val)
  },
)
watch(
  () => auth.user,
  (val) => {
    if (val) console.log('유저 상태 변경:', val)
  },
)
</script>
