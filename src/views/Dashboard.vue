<template>
  <div style="min-height: 100vh; background-color: #f9fafb; padding: 1.5rem">
    <div
      style="max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem"
    >
      <!-- 상단 통계 카드들 - 4개 한 줄 -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem">
        <div
          v-for="(stat, index) in statList"
          :key="stat.label"
          style="
            background: white;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
          "
        >
          <div style="display: flex; align-items: center; gap: 1rem">
            <div
              :style="[
                'width: 3rem; height: 3rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;',
                index === 0 ? 'background-color: #dcfce7;' : '',
                index === 1 ? 'background-color: #dbeafe;' : '',
                index === 2 ? 'background-color: #f3e8ff;' : '',
                index === 3 ? 'background-color: #fed7aa;' : '',
              ]"
            >
              <svg
                :style="[
                  'width: 1.5rem; height: 1.5rem;',
                  index === 0 ? 'color: #16a34a;' : '',
                  index === 1 ? 'color: #2563eb;' : '',
                  index === 2 ? 'color: #9333ea;' : '',
                  index === 3 ? 'color: #ea580c;' : '',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="index === 0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                ></path>
                <path
                  v-if="index === 1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
                <path
                  v-if="index === 2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
                <path
                  v-if="index === 3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div>
              <p style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0">
                {{ stat.value }}
              </p>
              <p style="font-size: 0.875rem; color: #6b7280; margin: 0">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 차트 선택 버튼 -->
      <div style="display: flex; justify-content: center; margin-bottom: 1rem">
        <div
          style="
            display: flex;
            gap: 0.5rem;
            background-color: #f3f4f6;
            padding: 0.25rem;
            border-radius: 0.5rem;
          "
        >
          <button
            :style="[
              'padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; border: none; cursor: pointer;',
              chartMode === 'month'
                ? 'background-color: white; color: #111827; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);'
                : 'background-color: transparent; color: #6b7280;',
            ]"
            @click="chartMode = 'month'"
          >
            월별
          </button>
          <button
            :style="[
              'padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; border: none; cursor: pointer;',
              chartMode === 'day'
                ? 'background-color: white; color: #111827; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);'
                : 'background-color: transparent; color: #6b7280;',
            ]"
            @click="chartMode = 'day'"
          >
            일별
          </button>
        </div>
      </div>

      <!-- 3개 차트를 한 줄에 배치 -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem">
        <!-- 사용자 증가 차트 -->
        <div
          style="
            background: white;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1rem;
            "
          >
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0">
              사용자 증가
            </h3>
            <div style="font-size: 0.875rem; color: #6b7280">
              {{ chartMode === 'month' ? '월별' : '일별' }}
            </div>
          </div>
          <div style="height: 16rem">
            <Chart
              :title="chartMode === 'month' ? '월별 사용자 증가' : '일별 사용자 증가'"
              type="line"
              :data="chartMode === 'month' ? userGrowthData : userGrowthDailyData"
            />
          </div>
        </div>

        <!-- 미션 완료율 차트 -->
        <div
          style="
            background: white;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1rem;
            "
          >
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0">
              미션 완료율
            </h3>
            <div style="font-size: 0.875rem; color: #6b7280">
              {{ chartMode === 'month' ? '월별' : '일별' }}
            </div>
          </div>
          <div style="height: 16rem">
            <Chart
              :title="chartMode === 'month' ? '월별 미션 완료율' : '일별 미션 완료율'"
              type="bar"
              :data="chartMode === 'month' ? missionCompleteData : missionCompleteDailyData"
            />
          </div>
        </div>

        <!-- 사진 업로드 차트 -->
        <div
          style="
            background: white;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1rem;
            "
          >
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0">
              사진 업로드
            </h3>
            <div style="font-size: 0.875rem; color: #6b7280">
              {{ chartMode === 'month' ? '월별' : '일별' }}
            </div>
          </div>
          <div style="height: 16rem">
            <Chart
              :title="chartMode === 'month' ? '월별 사진 업로드' : '일별 사진 업로드'"
              type="bar"
              :data="chartMode === 'month' ? photoUploadData : photoUploadDailyData"
            />
          </div>
        </div>
      </div>

      <!-- 미참여 유저 섹션 -->
      <div
        style="
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          overflow: hidden;
        "
      >
        <div style="padding: 1.5rem; border-bottom: 1px solid #f3f4f6">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0">
            지난 7일간 일별 미션 미참여 유저
          </h3>
        </div>
        <div style="padding: 1.5rem">
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <div
              v-for="row in inactiveUsersByDay"
              :key="row.date"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem;
                border-radius: 0.5rem;
                border: 1px solid #f3f4f6;
                transition: background-color 0.15s;
              "
            >
              <div style="display: flex; align-items: center; gap: 1rem">
                <div
                  style="
                    width: 2.5rem;
                    height: 2.5rem;
                    background-color: #dbeafe;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <svg
                    style="width: 1.25rem; height: 1.25rem; color: #2563eb"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p style="font-size: 0.875rem; font-weight: 500; color: #111827; margin: 0">
                    {{ formatDate(row.date) }}
                  </p>
                  <p style="font-size: 0.875rem; color: #6b7280; margin: 0">
                    <span v-if="row.users.length">
                      <span v-for="(user, idx) in row.users" :key="user.id">
                        {{ user.name }}<span v-if="user.farms !== '-'">({{ user.farms }})</span
                        ><span v-if="idx < row.users.length - 1">, </span>
                      </span>
                    </span>
                    <span v-else style="color: #9ca3af; font-style: italic">미참여 유저 없음</span>
                  </p>
                </div>
              </div>
              <div style="font-size: 0.875rem; color: #6b7280">{{ row.users.length }}명</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '../stores/users'
import { useFarmsStore } from '../stores/farms'
import { usePhotosStore } from '../stores/photos'
import { useMissionsStore } from '../stores/missions'
import Chart from '../components/dashboard/Chart.vue'

const usersStore = useUsersStore()
const farmsStore = useFarmsStore()
const photosStore = usePhotosStore()
const missionsStore = useMissionsStore()

onMounted(() => {
  usersStore.fetchUsers()
  farmsStore.fetchFarms()
  photosStore.fetchPhotos()
  missionsStore.fetchMissions()
})

const statList = computed(() => [
  { label: '전체 사용자', value: usersStore.users.length },
  { label: '전체 농장', value: farmsStore.farms.length },
  { label: '전체 미션', value: missionsStore.missions.length },
  { label: '전체 사진', value: photosStore.photos.length },
])

const chartMode = ref<'month' | 'day'>('month')

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })
}

function getLast6Months() {
  const arr = []
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    arr.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return arr
}
const months = getLast6Months()

function getLastNDays(n = 7) {
  const arr: string[] = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    arr.push(d.toISOString().slice(0, 10))
  }
  return arr
}
const days = getLastNDays(7)

const userGrowthData = computed(() => {
  const counts = months.map(
    (month) => usersStore.users.filter((u) => (u.created_at || '').slice(0, 7) === month).length,
  )
  return {
    labels: months,
    datasets: [
      {
        label: '신규 사용자 수',
        data: counts,
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        borderColor: '#3b82f6',
        fill: true,
      },
    ],
  }
})

const userGrowthDailyData = computed(() => {
  const counts = days.map(
    (day) => usersStore.users.filter((u) => (u.created_at || '').slice(0, 10) === day).length,
  )
  return {
    labels: days,
    datasets: [
      {
        label: '신규 사용자 수',
        data: counts,
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        borderColor: '#3b82f6',
        fill: true,
      },
    ],
  }
})

const missionCompleteData = computed(() => {
  const total = months.map(
    (month) => missionsStore.missions.filter((m) => (m.date || '').slice(0, 7) === month).length,
  )
  const completed = months.map(
    (month) =>
      missionsStore.missions.filter((m) => (m.date || '').slice(0, 7) === month && m.completed)
        .length,
  )
  return {
    labels: months,
    datasets: [
      {
        label: '완료 미션 수',
        data: completed,
        backgroundColor: '#10b981',
      },
      {
        label: '전체 미션 수',
        data: total,
        backgroundColor: '#f59e0b',
      },
    ],
  }
})

const missionCompleteDailyData = computed(() => {
  const total = days.map(
    (day) => missionsStore.missions.filter((m) => (m.date || '').slice(0, 10) === day).length,
  )
  const completed = days.map(
    (day) =>
      missionsStore.missions.filter((m) => (m.date || '').slice(0, 10) === day && m.completed)
        .length,
  )
  return {
    labels: days,
    datasets: [
      {
        label: '완료 미션 수',
        data: completed,
        backgroundColor: '#10b981',
      },
      {
        label: '전체 미션 수',
        data: total,
        backgroundColor: '#f59e0b',
      },
    ],
  }
})

const photoUploadData = computed(() => {
  const counts = months.map(
    (month) => photosStore.photos.filter((p) => (p.uploaded_at || '').slice(0, 7) === month).length,
  )
  return {
    labels: months,
    datasets: [
      {
        label: '업로드 사진 수',
        data: counts,
        backgroundColor: '#6366f1',
      },
    ],
  }
})

const photoUploadDailyData = computed(() => {
  const counts = days.map(
    (day) => photosStore.photos.filter((p) => (p.uploaded_at || '').slice(0, 10) === day).length,
  )
  return {
    labels: days,
    datasets: [
      {
        label: '업로드 사진 수',
        data: counts,
        backgroundColor: '#6366f1',
      },
    ],
  }
})

function getLast7Days() {
  const arr: string[] = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    arr.push(d.toISOString().slice(0, 10))
  }
  return arr
}
const last7Days = getLast7Days()

const inactiveUsersByDay = computed(() => {
  return last7Days.map((date) => {
    const participatedUserIds = new Set(
      missionsStore.missions.filter((m) => m.date === date).map((m) => m.user_id),
    )
    const inactiveUsers = usersStore.users.filter((u) => !participatedUserIds.has(u.id))
    const usersWithFarm = inactiveUsers.map((user) => {
      const farms = farmsStore.farms.filter((f) => f.user_id === user.id)
      return {
        id: user.id,
        name: user.name || '-',
        farms: farms.map((f) => f.name).join(', ') || '-',
      }
    })
    return {
      date,
      users: usersWithFarm,
    }
  })
})
</script>

<style scoped>
/* 추가 스타일 없음 */
</style>
