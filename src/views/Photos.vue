<template>
  <div class="photos-layout">
    <div class="photos-main">
      <h2>사진 관리</h2>
      <!-- 유저 선택 드롭다운 -->
      <div class="user-select">
        <label for="user-select">유저 선택:</label>
        <select id="user-select" v-model="selectedUserId">
          <option :value="null">전체</option>
          <option
            v-for="user in userTabs"
            :key="user.user_id"
            :value="user.user_id"
          >
            {{ user.name }}<span v-if="user.farmName"> ({{ user.farmName }})</span>
          </option>
        </select>
      </div>
      <!-- 날짜별 필터 UI -->
      <div class="date-filter">
        <label for="date-filter">날짜 선택:</label>
        <input
          id="date-filter"
          type="date"
          v-model="selectedDate"
          @change="onDateChange"
        />
        <button @click="clearDateFilter" class="clear-btn">날짜 초기화</button>
      </div>
      <PhotoTimeline :filtered-photos="filteredPhotos" @select-photo="onSelectPhoto" @dragstart-photo="onDragStartPhoto" />
    </div>
    <div class="detail-panel" v-if="selectedPhoto">
      <img :src="selectedPhoto.url" :alt="selectedPhoto.part" class="detail-image" />
      <div class="meta">
        <h3>사진 상세 정보</h3>
        <ul>
          <li><b>부위:</b> {{ selectedPhoto.part }}</li>
          <li><b>업로드 일시:</b> {{ selectedPhoto.uploaded_at }}</li>
          <li><b>미션 ID:</b> {{ selectedPhoto.mission_id }}</li>
        </ul>
        <button class="ai-btn" @click="analyzePhoto" :disabled="aiLoading">
          {{ aiLoading ? 'AI 분석 중...' : 'AI 분석' }}
        </button>
        <div v-if="aiResult" class="ai-result">
          <b>AI 분석 결과:</b>
          <div>{{ aiResult }}</div>
        </div>
      </div>
    </div>
    <!-- 사진 비교 영역 -->
    <div class="compare-bar" @dragover.prevent @drop="onDropCompare">
      <h3>사진 비교 영역 (드래그해서 추가)</h3>
      <div class="compare-list">
        <div v-for="photo in comparePhotos" :key="photo.id" class="compare-photo">
          <img :src="photo.url" :alt="photo.part" />
          <div class="compare-meta">
            <span>{{ photo.part }}</span>
            <span>{{ photo.uploaded_at?.slice(0, 10) }}</span>
            <button class="remove-btn" @click="removeComparePhoto(photo.id)">&times;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useFarmsStore } from '../stores/farms';
import { usePhotosStore } from '../stores/photos';
import { useMissionsStore } from '../stores/missions';
import { useUsersStore } from '../stores/users';
import { useAuthStore } from '../stores/auth';
import PhotoTimeline from './PhotoTimeline.vue';
import PhotoGallery from './PhotoGallery.vue';

const farmsStore = useFarmsStore();
const photosStore = usePhotosStore();
const missionsStore = useMissionsStore();
const usersStore = useUsersStore();
const authStore = useAuthStore();
const selectedUserId = ref<string | null>(null);
const selectedDate = ref<string>('');
const selectedPhoto = ref<any>(null);
const aiLoading = ref(false);
const aiResult = ref('');
const comparePhotos = ref<any[]>([]);
let dragPhoto: any = null;

onMounted(async () => {
  await Promise.all([
    farmsStore.fetchFarms(),
    photosStore.fetchPhotos(),
    missionsStore.fetchMissions(),
    usersStore.fetchUsers()
  ]);
  // 디버깅 로그 추가
  console.log('authStore.user:', authStore.user);
  console.log('isAdmin:', isAdmin.value);
  console.log('photosStore.photos:', photosStore.photos);
});

const onDateChange = () => {
  console.log('Photos.vue: 날짜 필터 변경', selectedDate.value);
};

const clearDateFilter = () => {
  selectedDate.value = '';
  console.log('Photos.vue: 날짜 필터 초기화');
};

function onSelectPhoto(photo: any) {
  selectedPhoto.value = photo;
  aiResult.value = '';
}

function onDragStartPhoto(photo: any) {
  dragPhoto = photo;
}

function onDropCompare() {
  if (dragPhoto && !comparePhotos.value.find(p => p.id === dragPhoto.id)) {
    comparePhotos.value.push(dragPhoto);
  }
  dragPhoto = null;
}

function removeComparePhoto(id: string) {
  comparePhotos.value = comparePhotos.value.filter(p => p.id !== id);
}

async function analyzePhoto() {
  if (!selectedPhoto.value) return;
  aiLoading.value = true;
  aiResult.value = '';

  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const imageUrl = selectedPhoto.value.url;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert agricultural image analyst. Analyze the following farm photo and describe any issues, diseases, or notable features you see. Respond in Korean.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: '이 딸기 농장의 사진을 딸기 전문가로서 분석해줘. 딸기 농장 관련 사진이 아니면 분석하지마' },
              { type: 'image_url', image_url: { url: imageUrl } }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    aiResult.value = data.choices?.[0]?.message?.content || '분석 결과를 가져올 수 없습니다.';
  } catch (e) {
    aiResult.value = 'AI 분석 중 오류가 발생했습니다.';
  } finally {
    aiLoading.value = false;
  }
}

// 유저별(이름+농장명) 탭 데이터 생성
const userTabs = computed(() => {
  // farms와 users를 조합
  if (isAdmin.value) {
    return usersStore.users.map(user => {
      const farm = farmsStore.farms.find(f => f.user_id === user.id);
      return {
        user_id: user.id,
        name: user.name || user.email || '이름없음',
        farmName: farm ? farm.name : ''
      };
    });
  } else {
    // user 본인만
    const user = usersStore.users.find(u => u.id === myUserId.value);
    if (!user) return [];
    const farm = farmsStore.farms.find(f => f.user_id === user.id);
    return [{
      user_id: user.id,
      name: user.name || user.email || '이름없음',
      farmName: farm ? farm.name : ''
    }];
  }
});

const isAdmin = computed(() => authStore.user?.role === 'admin');
const myUserId = computed(() => authStore.user?.id);

// farms 필터링
const myFarms = computed(() => {
  if (isAdmin.value) return farmsStore.farms;
  return farmsStore.farms.filter(farm => farm.user_id === myUserId.value);
});

// farm_id 목록
const myFarmIds = computed(() => myFarms.value.map(farm => farm.id));

// 사진 필터링 (user_id 기반, mission 매핑 포함)
const filteredPhotos = computed(() => {
  let filtered = photosStore.photos;

  // 권한 기반 user_id 필터링
  if (!isAdmin.value) {
    filtered = filtered.filter(photo => {
      // 사진 row에 user_id가 있으면 바로 비교
      if ((photo as any).user_id) return (photo as any).user_id === myUserId.value;
      // 없으면 mission_id → missions에서 user_id로 매핑
      const mission = missionsStore.missions.find(m => m.id === photo.mission_id);
      return mission && mission.user_id === myUserId.value;
    });
  }

  if (selectedUserId.value) {
    filtered = filtered.filter(photo => {
      const mission = missionsStore.missions.find(m => m.id === photo.mission_id);
      return mission && mission.user_id === selectedUserId.value;
    });
  }

  if (selectedDate.value) {
    filtered = filtered.filter(photo =>
      (photo.uploaded_at || '').slice(0, 10) === selectedDate.value
    );
  }

  console.log('Photos.vue: 필터링된 사진', {
    selectedUserId: selectedUserId.value,
    selectedDate: selectedDate.value,
    totalPhotos: photosStore.photos.length,
    filteredPhotos: filtered.length
  });

  return filtered;
});
</script>

<style scoped>
.user-select {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.user-select label {
  font-weight: 500;
  color: #374151;
}
.user-select select {
  padding: 0.4rem 1.2rem;
  border: 1px solid #2563eb;
  border-radius: 6px;
  font-size: 1rem;
  color: #2563eb;
  background: #fff;
  font-weight: 500;
  cursor: pointer;
}
.date-filter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}
.date-filter label {
  font-weight: 500;
  color: #374151;
}
.date-filter input {
  padding: 0.4rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.9rem;
}
.clear-btn {
  padding: 0.4rem 1rem;
  border: 1px solid #dc2626;
  background: #fff;
  color: #dc2626;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.clear-btn:hover {
  background: #dc2626;
  color: #fff;
}
.photos-layout {
  display: flex;
  gap: 2rem;
}
.photos-main {
  flex: 2;
}
.detail-panel {
  flex: 1;
  background: #f9fafb;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 12px #0001;
  min-width: 320px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detail-image {
  max-width: 320px;
  max-height: 240px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px #0002;
}
.meta {
  width: 100%;
}
.meta ul {
  list-style: none;
  padding: 0;
}
.meta li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.ai-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.ai-btn:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
.ai-result {
  margin-top: 1rem;
  background: #e0e7ff;
  color: #1e293b;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
}
.compare-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f1f5f9;
  border-top: 2px solid #cbd5e1;
  padding: 1rem 2rem 1.5rem 2rem;
  z-index: 100;
}
.compare-list {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}
.compare-photo {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding: 0.7rem 1rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}
.compare-photo img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.compare-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.remove-btn {
  background: none;
  border: none;
  color: #dc2626;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 0.2rem;
}
</style> 