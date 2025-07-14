<template>
  <div>
    <h2>사용자 관리</h2>
    <button @click="fetchUsers" :disabled="usersStore.loading">새로고침</button>
    <div v-if="usersStore.loading">로딩 중...</div>
    <div v-if="usersStore.error" style="color:red">{{ usersStore.error }}</div>
    <table v-if="usersStore.users.length">
      <thead>
        <tr>
          <th>이메일</th>
          <th>이름</th>
          <th>포인트</th>
          <th>가입일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersStore.users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.point }}</td>
          <td>{{ user.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="!usersStore.loading">사용자 없음</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '../stores/users';

const usersStore = useUsersStore();

const fetchUsers = () => usersStore.fetchUsers();

onMounted(() => {
  fetchUsers();
});
</script> 