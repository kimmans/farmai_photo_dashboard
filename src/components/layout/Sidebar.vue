<template>
  <div class="bg-red-500 h-4 w-full mb-2"></div> <!-- Tailwind 적용 테스트용: 빨간색 바 -->
  <aside class="h-screen w-64 bg-[#1a2745] text-white shadow-xl flex flex-col py-8 px-4 z-20">
    <div class="mb-10 flex items-center gap-2 px-2">
      <span class="text-2xl">🍓</span>
      <span class="text-xl font-bold tracking-wide">FarmAI</span>
    </div>
    <nav class="flex-1">
      <ul class="space-y-2">
        <li>
          <router-link to="/" class="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-white hover:bg-[#22305a] hover:text-blue-200" active-class="bg-[#2e3b5e] text-blue-300 font-bold">
            <span class="material-icons text-blue-300">dashboard</span> 대시보드
          </router-link>
        </li>
        <li>
          <router-link to="/users" class="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-white hover:bg-[#22305a] hover:text-blue-200" active-class="bg-[#2e3b5e] text-blue-300 font-bold">
            <span class="material-icons text-blue-300">people</span> 사용자 관리
          </router-link>
        </li>
        <li>
          <router-link to="/farms" class="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-white hover:bg-[#22305a] hover:text-blue-200" active-class="bg-[#2e3b5e] text-blue-300 font-bold">
            <span class="material-icons text-blue-300">agriculture</span> 농장 관리
          </router-link>
        </li>
        <li>
          <router-link to="/photos" class="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-white hover:bg-[#22305a] hover:text-blue-200" active-class="bg-[#2e3b5e] text-blue-300 font-bold">
            <span class="material-icons text-blue-300">photo_library</span> 사진 관리
          </router-link>
        </li>
        <li>
          <router-link to="/missions" class="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-white hover:bg-[#22305a] hover:text-blue-200" active-class="bg-[#2e3b5e] text-blue-300 font-bold">
            <span class="material-icons text-blue-300">assignment_turned_in</span> 미션 관리
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* 완전히 비움: Tailwind만 사용 */
</style> 