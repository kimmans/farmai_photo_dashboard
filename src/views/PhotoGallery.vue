<template>
  <div class="gallery">
    <h2>농장별 사진 갤러리</h2>
    <div v-for="(photos, farmName) in photosByFarm" :key="farmName" class="gallery-group">
      <h3>{{ farmName }}</h3>
      <div class="photo-list">
        <div v-for="photo in photos" :key="photo.id" class="photo-card">
          <img :src="photo.url" :alt="photo.part" />
          <div class="photo-meta">
            <span>{{ photo.part }}</span>
            <span>{{ photo.uploaded_at?.slice(0, 10) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { usePhotosStore } from '../stores/photos';
import { useFarmsStore } from '../stores/farms';

interface Props {
  filteredPhotos?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  filteredPhotos: undefined
});

const photosStore = usePhotosStore();
const farmsStore = useFarmsStore();

onMounted(() => {
  console.log('PhotoGallery: onMounted');
  photosStore.fetchPhotos();
  farmsStore.fetchFarms();
});

watch(() => photosStore.photos, (val) => {
  console.log('PhotoGallery: photosStore.photos changed', val);
});
watch(() => farmsStore.farms, (val) => {
  console.log('PhotoGallery: farmsStore.farms changed', val);
});

const photosByFarm = computed(() => {
  // props로 받은 필터링된 사진이 있으면 사용, 없으면 전체 사진 사용
  const photosToUse = props.filteredPhotos || photosStore.photos;
  
  const groups: Record<string, typeof photosToUse> = {};
  for (const photo of photosToUse) {
    // farm_id로 농장명 찾기
    const farm = farmsStore.farms.find(f => f.id === photo.mission_id || f.id === photo.farm_id);
    const farmName = farm?.name || '알 수 없는 농장';
    if (!groups[farmName]) groups[farmName] = [];
    groups[farmName].push(photo);
  }
  console.log('PhotoGallery: photosByFarm', groups);
  return groups;
});
</script>

<style scoped>
.gallery {
  margin-top: 2rem;
}
.gallery-group {
  margin-bottom: 2rem;
}
.photo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.photo-card {
  width: 120px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.photo-card img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}
.photo-meta {
  font-size: 0.9rem;
  color: #374151;
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style> 