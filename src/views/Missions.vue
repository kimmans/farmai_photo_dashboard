<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e293b">미션 관리</h2>
      <button
        @click="fetchMissions"
        :disabled="missionsStore.loading"
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
        :style="missionsStore.loading ? 'opacity: 0.5; cursor: not-allowed;' : ''"
        onmouseover="if (!missionsStore.loading) this.style.backgroundColor='#334155'"
        onmouseout="if (!missionsStore.loading) this.style.backgroundColor='#1e293b'"
      >
        새로고침
      </button>
    </div>

    <div
      v-if="missionsStore.loading"
      style="display: flex; align-items: center; justify-content: center; padding: 3rem 0"
    >
      <div style="color: #64748b">로딩 중...</div>
    </div>

    <div
      v-if="missionsStore.error"
      style="
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 0.5rem;
        padding: 1rem;
        color: #dc2626;
      "
    >
      {{ missionsStore.error }}
    </div>

    <div
      v-if="missionsStore.missions.length"
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
              유저 ID
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              농장 ID
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              날짜
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              완료
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              포인트
            </th>
            <th style="padding: 1rem 1.5rem; text-align: left; color: #475569; font-weight: 600">
              보상
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="mission in missionsStore.missions"
            :key="mission.id"
            style="border-bottom: 1px solid #f1f5f9; transition: background-color 0.15s"
            onmouseover="this.style.backgroundColor='#f8fafc'"
            onmouseout="this.style.backgroundColor='transparent'"
          >
            <td style="padding: 1rem 1.5rem; color: #334155">{{ mission.user_id }}</td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ mission.farm_id }}</td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ mission.date }}</td>
            <td style="padding: 1rem 1.5rem">
              <span
                :style="mission.completed ? 'color: #059669;' : 'color: #dc2626;'"
                style="font-weight: 500"
              >
                {{ mission.completed ? 'O' : 'X' }}
              </span>
            </td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ mission.point }}</td>
            <td style="padding: 1rem 1.5rem; color: #334155">{{ mission.reward || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="!missionsStore.loading"
      style="text-align: center; padding: 3rem 0; color: #64748b"
    >
      미션 없음
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMissionsStore } from '../stores/missions'

const missionsStore = useMissionsStore()

const fetchMissions = () => missionsStore.fetchMissions()

onMounted(() => {
  fetchMissions()
})
</script>
