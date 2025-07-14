<template>
  <div class="timeline">
    <h2>농장 사진</h2>
    <div v-for="(photos, date) in photosByDate" :key="date" class="timeline-group">
      <h3>{{ date }}</h3>
      <div class="photo-list">
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="photo-card"
          @click="onPhotoClick(photo)"
          draggable="true"
          @dragstart="onDragStart(photo)"
        >
          <img :src="photo.url" :alt="photo.part" />
          <div class="photo-meta">
            <span>{{ photo.part }}</span>
            <span>{{ photo.uploaded_at?.slice(11, 16) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePhotosStore } from '../stores/photos';

interface Props {
  filteredPhotos?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  filteredPhotos: undefined
});

const emit = defineEmits(['select-photo', 'dragstart-photo']);

const photosStore = usePhotosStore();

onMounted(() => {
  photosStore.fetchPhotos();
});

const onPhotoClick = (photo: any) => {
  emit('select-photo', photo);
};

const onDragStart = (photo: any) => {
  emit('dragstart-photo', photo);
};

const photosByDate = computed(() => {
  // props로 받은 필터링된 사진이 있으면 사용, 없으면 전체 사진 사용
  const photosToUse = props.filteredPhotos || photosStore.photos;
  
  const groups: Record<string, typeof photosToUse> = {};
  for (const photo of photosToUse) {
    const date = (photo.uploaded_at || '').slice(0, 10);
    if (!groups[date]) groups[date] = [];
    groups[date].push(photo);
  }
  // 최신 날짜가 위로 오도록 정렬
  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
  );
});
</script>

<style scoped>
.timeline {
  margin-top: 2rem;
}
.timeline-group {
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