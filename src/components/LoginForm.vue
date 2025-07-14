<template>
  <form @submit.prevent="onLogin">
    <input v-model="email" type="email" placeholder="이메일" required />
    <input v-model="password" type="password" placeholder="비밀번호" required />
    <button type="submit" :disabled="auth.loading">로그인</button>
    <div v-if="auth.error" style="color:red">{{ auth.error }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

const onLogin = async () => {
  console.log('로그인 시도:', email.value);
  await auth.signIn(email.value, password.value);
  if (auth.user) {
    console.log('로그인 성공:', auth.user);
    router.push('/'); // 로그인 성공 시 대시보드로 이동
  } else if (auth.error) {
    console.log('로그인 실패:', auth.error);
  }
};

// auth 상태 변화 감지하여 로그 출력 (디버깅용)
watch(() => auth.error, (val) => {
  if (val) console.log('에러 상태 변경:', val);
});
watch(() => auth.user, (val) => {
  if (val) console.log('유저 상태 변경:', val);
});
</script> 