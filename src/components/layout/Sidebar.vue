<template>
  <div
    style="
      height: 100vh;
      width: 80px;
      background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
      border-radius: 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 0;
      position: relative;
      z-index: 20;
    "
  >
    <!-- 로고 -->
    <div
      style="
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
        overflow: hidden;
      "
    >
      <img
        src="../../assets/character.png"
        alt="Farm AI Character"
        style="width: 32px; height: 32px; object-fit: contain; border-radius: 8px"
      />
    </div>

    <!-- 네비게이션 -->
    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 24px">
      <!-- 대시보드 -->
      <router-link
        to="/"
        style="
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          text-decoration: none;
        "
        class="nav-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      </router-link>

      <!-- 사용자 관리 (admin만) -->
      <router-link
        v-if="isAdmin"
        to="/users"
        style="
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          text-decoration: none;
        "
        class="nav-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </router-link>

      <!-- 농장 관리 (admin만) -->
      <router-link
        v-if="isAdmin"
        to="/farms"
        style="
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          text-decoration: none;
        "
        class="nav-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </router-link>

      <!-- 사진 관리 -->
      <router-link
        to="/photos"
        style="
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          text-decoration: none;
        "
        class="nav-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
          />
        </svg>
      </router-link>

      <!-- 미션 관리 (admin만) -->
      <router-link
        v-if="isAdmin"
        to="/missions"
        style="
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          text-decoration: none;
        "
        class="nav-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </router-link>
    </div>

    <!-- 프로필 -->
    <div
      style="
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <span style="color: white; font-size: 14px; font-weight: bold">FAI</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

// admin 권한 확인
const isAdmin = computed(() => authStore.user?.role === 'admin')
</script>

<style scoped>
.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-btn.router-link-active {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
