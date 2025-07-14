<template>
  <div>
    <h2>농장 관리</h2>
    <button @click="fetchFarms" :disabled="farmsStore.loading">새로고침</button>
    <div v-if="farmsStore.loading">로딩 중...</div>
    <div v-if="farmsStore.error" style="color:red">{{ farmsStore.error }}</div>
    <table v-if="farmsStore.farms.length">
      <thead>
        <tr>
          <th>농장명</th>
          <th>위치</th>
          <th>소유자 ID</th>
          <th>생성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="farm in farmsStore.farms" :key="farm.id">
          <td>{{ farm.name }}</td>
          <td>{{ farm.location }}</td>
          <td>{{ farm.user_id }}</td>
          <td>{{ farm.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="!farmsStore.loading">농장 없음</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useFarmsStore } from '../stores/farms';

const farmsStore = useFarmsStore();

const fetchFarms = () => farmsStore.fetchFarms();

onMounted(() => {
  fetchFarms();
});
</script> 