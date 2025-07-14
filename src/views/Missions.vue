<template>
  <div>
    <h2>미션 관리</h2>
    <button @click="fetchMissions" :disabled="missionsStore.loading">새로고침</button>
    <div v-if="missionsStore.loading">로딩 중...</div>
    <div v-if="missionsStore.error" style="color:red">{{ missionsStore.error }}</div>
    <table v-if="missionsStore.missions.length">
      <thead>
        <tr>
          <th>유저 ID</th>
          <th>농장 ID</th>
          <th>날짜</th>
          <th>완료</th>
          <th>포인트</th>
          <th>보상</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mission in missionsStore.missions" :key="mission.id">
          <td>{{ mission.user_id }}</td>
          <td>{{ mission.farm_id }}</td>
          <td>{{ mission.date }}</td>
          <td>{{ mission.completed ? 'O' : 'X' }}</td>
          <td>{{ mission.point }}</td>
          <td>{{ mission.reward || '-' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="!missionsStore.loading">미션 없음</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMissionsStore } from '../stores/missions';

const missionsStore = useMissionsStore();

const fetchMissions = () => missionsStore.fetchMissions();

onMounted(() => {
  fetchMissions();
});
</script> 