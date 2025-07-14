<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in statList" :key="stat.label" class="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
        <div class="text-gray-500 text-sm mb-1">{{ stat.label }}</div>
        <div class="text-3xl font-bold text-blue-700">{{ stat.value }}</div>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="text-lg font-semibold text-gray-700">통계 차트</div>
        <div class="flex gap-2">
          <button :class="['px-3 py-1 rounded', chartMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700']" @click="chartMode = 'month'">월별</button>
          <button :class="['px-3 py-1 rounded', chartMode === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700']" @click="chartMode = 'day'">일별</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Chart :title="chartMode === 'month' ? '월별 사용자 증가' : '일별 사용자 증가'" type="line" :data="chartMode === 'month' ? userGrowthData : userGrowthDailyData" />
        <Chart :title="chartMode === 'month' ? '월별 미션 완료율' : '일별 미션 완료율'" type="bar" :data="chartMode === 'month' ? missionCompleteData : missionCompleteDailyData" />
        <Chart :title="chartMode === 'month' ? '월별 사진 업로드' : '일별 사진 업로드'" type="bar" :data="chartMode === 'month' ? photoUploadData : photoUploadDailyData" />
      </div>
    </div>
    <div class="bg-white rounded-xl shadow p-6">
      <div class="text-lg font-semibold text-gray-700 mb-4">지난 7일간 일별 미션 미참여 유저</div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-50 text-gray-500 font-semibold">날짜</th>
              <th class="px-4 py-2 bg-gray-50 text-gray-500 font-semibold">이름(농장명)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in inactiveUsersByDay" :key="row.date" class="border-b last:border-0">
              <td class="px-4 py-2">{{ row.date }}</td>
              <td class="px-4 py-2">
                <span v-if="row.users.length">
                  <span v-for="(user, idx) in row.users" :key="user.id">
                    {{ user.name }}<span v-if="user.farms !== '-'">({{ user.farms }})</span><span v-if="idx < row.users.length - 1">, </span>
                  </span>
                </span>
                <span v-else>없음</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUsersStore } from '../stores/users';
import { useFarmsStore } from '../stores/farms';
import { usePhotosStore } from '../stores/photos';
import { useMissionsStore } from '../stores/missions';
import Stats from '../components/dashboard/Stats.vue';
import Chart from '../components/dashboard/Chart.vue';

const usersStore = useUsersStore();
const farmsStore = useFarmsStore();
const photosStore = usePhotosStore();
const missionsStore = useMissionsStore();

onMounted(() => {
  usersStore.fetchUsers();
  farmsStore.fetchFarms();
  photosStore.fetchPhotos();
  missionsStore.fetchMissions();
});

const statList = computed(() => [
  { label: '전체 사용자', value: usersStore.users.length },
  { label: '전체 농장', value: farmsStore.farms.length },
  { label: '전체 미션', value: missionsStore.missions.length },
  { label: '전체 사진', value: photosStore.photos.length },
  {
    label: '총 포인트',
    value: usersStore.users.reduce((sum, u) => sum + (u.point || 0), 0),
  },
]);

const chartMode = ref<'month' | 'day'>('month');

function getLast6Months() {
  const arr = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    arr.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return arr;
}
const months = getLast6Months();

function getLastNDays(n = 7) {
  const arr: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}
const days = getLastNDays(7);

const userGrowthData = computed(() => {
  const counts = months.map(month =>
    usersStore.users.filter(u => (u.created_at || '').slice(0, 7) === month).length
  );
  return {
    labels: months,
    datasets: [
      {
        label: '신규 사용자 수',
        data: counts,
        backgroundColor: '#2563eb88',
        borderColor: '#2563eb',
        fill: true,
      },
    ],
  };
});
const userGrowthDailyData = computed(() => {
  const counts = days.map(day =>
    usersStore.users.filter(u => (u.created_at || '').slice(0, 10) === day).length
  );
  return {
    labels: days,
    datasets: [
      {
        label: '신규 사용자 수',
        data: counts,
        backgroundColor: '#2563eb88',
        borderColor: '#2563eb',
        fill: true,
      },
    ],
  };
});

const missionCompleteData = computed(() => {
  const total = months.map(month =>
    missionsStore.missions.filter(m => (m.date || '').slice(0, 7) === month).length
  );
  const completed = months.map(month =>
    missionsStore.missions.filter(
      m => (m.date || '').slice(0, 7) === month && m.completed
    ).length
  );
  return {
    labels: months,
    datasets: [
      {
        label: '완료 미션 수',
        data: completed,
        backgroundColor: '#10b981cc',
      },
      {
        label: '전체 미션 수',
        data: total,
        backgroundColor: '#f59e42cc',
      },
    ],
  };
});
const missionCompleteDailyData = computed(() => {
  const total = days.map(day =>
    missionsStore.missions.filter(m => (m.date || '').slice(0, 10) === day).length
  );
  const completed = days.map(day =>
    missionsStore.missions.filter(
      m => (m.date || '').slice(0, 10) === day && m.completed
    ).length
  );
  return {
    labels: days,
    datasets: [
      {
        label: '완료 미션 수',
        data: completed,
        backgroundColor: '#10b981cc',
      },
      {
        label: '전체 미션 수',
        data: total,
        backgroundColor: '#f59e42cc',
      },
    ],
  };
});

const photoUploadData = computed(() => {
  const counts = months.map(month =>
    photosStore.photos.filter(p => (p.uploaded_at || '').slice(0, 7) === month).length
  );
  return {
    labels: months,
    datasets: [
      {
        label: '업로드 사진 수',
        data: counts,
        backgroundColor: '#6366f1cc',
      },
    ],
  };
});
const photoUploadDailyData = computed(() => {
  const counts = days.map(day =>
    photosStore.photos.filter(p => (p.uploaded_at || '').slice(0, 10) === day).length
  );
  return {
    labels: days,
    datasets: [
      {
        label: '업로드 사진 수',
        data: counts,
        backgroundColor: '#6366f1cc',
      },
    ],
  };
});

function getLast7Days() {
  const arr: string[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}
const last7Days = getLast7Days();

const inactiveUsersByDay = computed(() => {
  return last7Days.map(date => {
    const participatedUserIds = new Set(
      missionsStore.missions
        .filter(m => m.date === date)
        .map(m => m.user_id)
    );
    const inactiveUsers = usersStore.users.filter(
      u => !participatedUserIds.has(u.id)
    );
    // 각 유저의 농장명 배열 추가
    const usersWithFarm = inactiveUsers.map(user => {
      const farms = farmsStore.farms.filter(f => f.user_id === user.id);
      return {
        id: user.id,
        name: user.name || '-',
        farms: farms.map(f => f.name).join(', ') || '-',
      };
    });
    return {
      date,
      users: usersWithFarm,
    };
  });
});
</script>

<style scoped>
.charts-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}
.chart-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.chart-toggle button {
  padding: 0.4rem 1.2rem;
  border: 1px solid #2563eb;
  background: #fff;
  color: #2563eb;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.chart-toggle button.active {
  background: #2563eb;
  color: #fff;
}
.inactive-users {
  margin-top: 2rem;
}
.inactive-users table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.inactive-users th, .inactive-users td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  text-align: left;
}
.inactive-users th {
  background: #f3f4f6;
}
</style> 