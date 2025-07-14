<template>
  <header class="flex items-center justify-between h-16 px-8 bg-white shadow border-b z-10">
    <div class="flex items-center gap-4">
      <div class="text-2xl font-bold text-blue-700 flex items-center gap-2">
        <span>🍓</span> FarmAI Dashboard
      </div>
      <div class="ml-8">
        <input type="text" placeholder="Search..." class="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-sm" />
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button class="relative text-gray-500 hover:text-blue-600 focus:outline-none">
        <span class="material-icons">notifications</span>
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">1</span>
      </button>
      <span v-if="auth.user" class="text-gray-700 font-medium">{{ auth.user.email }}</span>
      <button @click="toggleTheme" class="text-gray-500 hover:text-blue-600">
        <span class="material-icons">dark_mode</span>
      </button>
      <button v-if="auth.user" @click="logout" class="ml-2 px-3 py-1 rounded bg-gray-100 hover:bg-red-100 text-red-600 font-semibold text-sm">로그아웃</button>
      <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg ml-2">
        <span class="material-icons">person</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
}

async function logout() {
  await auth.signOut();
  router.push('/login');
}
</script>

<style scoped>
/* 완전히 비움: Tailwind만 사용 */
</style> 