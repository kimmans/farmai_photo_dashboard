<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Sidebar from './components/layout/Sidebar.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <div class="flex h-screen w-screen bg-gray-50">
    <Sidebar />
    <div class="flex flex-col flex-1 min-w-0">
      <Header />
      <main class="flex-1 overflow-y-auto p-8 bg-gray-50">
        <router-view />
      </main>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<style scoped>
/* 완전히 비움: Tailwind만 사용 */
</style>
