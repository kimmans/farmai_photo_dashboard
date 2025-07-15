<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e293b">사용자 관리</h2>
      <button
        @click="fetchUsers"
        :disabled="usersStore.loading"
        style="
          padding: 0.5rem 1rem;
          background-color: #1e293b;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        "
        :style="usersStore.loading ? 'opacity: 0.5; cursor: not-allowed;' : ''"
        onmouseover="if (!usersStore.loading) this.style.backgroundColor='#334155'"
        onmouseout="if (!usersStore.loading) this.style.backgroundColor='#1e293b'"
      >
        새로고침
      </button>
    </div>

    <div
      v-if="usersStore.loading"
      style="display: flex; align-items: center; justify-content: center; padding: 3rem 0"
    >
      <div style="color: #64748b">로딩 중...</div>
    </div>

    <div
      v-if="usersStore.error"
      style="
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 0.5rem;
        padding: 1rem;
        color: #dc2626;
      "
    >
      {{ usersStore.error }}
    </div>

    <div
      v-if="usersStore.users.length"
      style="
        background: white;
        border-radius: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #f1f5f9;
        overflow: hidden;
      "
    >
      <table style="width: 100%; min-width: 100%">
        <thead>
          <tr style="background-color: #f8fafc">
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              이메일
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              이름
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              포인트
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              가입일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in usersStore.users"
            :key="user.id"
            style="border-bottom: 1px solid #f1f5f9; transition: background-color 0.15s"
            onmouseover="this.style.backgroundColor='#f8fafc'"
            onmouseout="this.style.backgroundColor='transparent'"
          >
            <td style="padding: 1rem 1.5rem; color: #334155">{{ user.email }}</td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ user.name }}</td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ user.point }}</td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ user.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="!usersStore.loading"
      style="text-align: center; padding: 3rem 0; color: #64748b"
    >
      사용자 없음
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '../stores/users'

const usersStore = useUsersStore()

const fetchUsers = () => usersStore.fetchUsers()

onMounted(() => {
  fetchUsers()
})
</script>
