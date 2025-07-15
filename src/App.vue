<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/layout/Header.vue'
import Sidebar from './components/layout/Sidebar.vue'

const route = useRoute()

// 로그인 페이지인지 확인
const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <div
    style="
      display: flex;
      height: 100vh;
      width: 100vw;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    "
  >
    <!-- 로그인 페이지가 아닐 때만 사이드바 표시 -->
    <Sidebar v-if="!isLoginPage" />

    <div
      style="display: flex; flex-direction: column; flex: 1; min-width: 0; margin: 0; padding: 0"
    >
      <!-- 로그인 페이지가 아닐 때만 헤더 표시 -->
      <Header v-if="!isLoginPage" />

      <main
        :style="
          isLoginPage
            ? 'flex: 1; overflow-y: auto; padding: 0; margin: 0; background-color: #f9fafb'
            : 'flex: 1; overflow-y: auto; padding: 0; margin: 0; background-color: #f9fafb'
        "
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
/* 전역 스타일: 여백 제거 및 기본 설정 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

#app {
  margin: 0;
  padding: 0;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
