<template>
  <div style="display: flex; height: 100vh; background-color: #f9fafb">
    <!-- 왼쪽 사진 타임라인 -->
    <div style="flex: 1; padding: 1.5rem; overflow-y: auto">
      <h2 style="font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: 1.5rem">
        농장 사진
      </h2>
      <div v-for="(photos, date) in photosByDate" :key="date" style="margin-bottom: 2rem">
        <h3 style="font-size: 1.125rem; font-weight: 500; color: #374151; margin-bottom: 1rem">
          {{ date }}
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem">
          <div
            v-for="photo in photos"
            :key="photo.id"
            style="
              width: 120px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
              background: #fff;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              transition: all 0.2s;
            "
            :class="{ selected: selectedPhoto?.id === photo.id }"
            @click="onPhotoClick(photo)"
            @dblclick="addToCompare(photo)"
            draggable="true"
            @dragstart="onDragStart(photo)"
          >
            <img
              :src="photo.url"
              :alt="photo.part"
              style="width: 100%; height: 80px; object-fit: cover"
            />
            <div
              style="
                font-size: 0.9rem;
                color: #374151;
                padding: 0.3rem 0.5rem;
                display: flex;
                justify-content: space-between;
                width: 100%;
              "
            >
              <span>{{ photo.part }}</span>
              <span>{{ photo.uploaded_at?.slice(11, 16) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 우측 상세 보기 -->
    <div
      style="
        width: 400px;
        background: white;
        border-left: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
      "
    >
      <!-- 상세 사진 -->
      <div style="flex: 1; padding: 1.5rem; border-bottom: 1px solid #e5e7eb">
        <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 1rem">
          상세 사진
        </h3>
        <div v-if="selectedPhoto" style="text-align: center">
          <img
            :src="selectedPhoto.url"
            :alt="selectedPhoto.part"
            style="max-width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px"
          />
          <div style="margin-top: 1rem; text-align: left">
            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem">
              <strong>부위:</strong> {{ selectedPhoto.part }}
            </p>
            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem">
              <strong>업로드 시간:</strong> {{ formatDateTime(selectedPhoto.uploaded_at) }}
            </p>
            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem">
              <strong>농장:</strong> {{ selectedPhoto.farm_name || 'N/A' }}
            </p>
          </div>
        </div>
        <div
          v-else
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 300px;
            color: #9ca3af;
            font-size: 0.875rem;
          "
        >
          사진을 선택해주세요
        </div>
      </div>
    </div>
  </div>

  <!-- 하단 사진 비교 영역 -->
  <div
    v-if="comparePhotos.length > 0"
    style="
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #e5e7eb;
      padding: 1rem;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      z-index: 100;
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
      <h3 style="font-size: 1rem; font-weight: 600; color: #111827">
        사진 비교 ({{ comparePhotos.length }})
      </h3>
      <button
        @click="clearCompare"
        style="
          padding: 0.5rem 1rem;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
        "
      >
        비교 초기화
      </button>
    </div>
    <div style="display: flex; gap: 1rem; overflow-x: auto">
      <div
        v-for="photo in comparePhotos"
        :key="photo.id"
        style="
          min-width: 120px;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          position: relative;
        "
      >
        <img
          :src="photo.url"
          :alt="photo.part"
          style="width: 120px; height: 80px; object-fit: cover"
        />
        <button
          @click="removeFromCompare(photo)"
          style="
            position: absolute;
            top: 4px;
            right: 4px;
            width: 20px;
            height: 20px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 12px;
            cursor: pointer;
          "
        >
          ×
        </button>
        <div
          style="font-size: 0.75rem; color: #374151; padding: 0.25rem 0.5rem; text-align: center"
        >
          {{ photo.part }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePhotosStore } from '../stores/photos'

interface Photo {
  id: string
  mission_id: string
  url: string
  part: string
  uploaded_at?: string
  farm_name?: string
  ai_analysis?: Record<string, unknown>
}

interface Props {
  filteredPhotos?: Photo[]
}

const props = withDefaults(defineProps<Props>(), {
  filteredPhotos: undefined,
})

const emit = defineEmits(['select-photo', 'dragstart-photo'])

const photosStore = usePhotosStore()
const selectedPhoto = ref<Photo | null>(null)
const comparePhotos = ref<Photo[]>([])

onMounted(() => {
  photosStore.fetchPhotos()
})

const onPhotoClick = (photo: Photo) => {
  selectedPhoto.value = photo
  emit('select-photo', photo)
}

const onDragStart = (photo: Photo) => {
  emit('dragstart-photo', photo)
}

const addToCompare = (photo: Photo) => {
  if (!comparePhotos.value.find((p) => p.id === photo.id)) {
    comparePhotos.value.push(photo)
  }
}

const removeFromCompare = (photo: Photo) => {
  comparePhotos.value = comparePhotos.value.filter((p) => p.id !== photo.id)
}

const clearCompare = () => {
  comparePhotos.value = []
}

const formatDateTime = (dateTime?: string) => {
  if (!dateTime) return 'N/A'
  const date = new Date(dateTime)
  return date.toLocaleString('ko-KR')
}

const photosByDate = computed(() => {
  // props로 받은 필터링된 사진이 있으면 사용, 없으면 전체 사진 사용
  const photosToUse = props.filteredPhotos || photosStore.photos

  const groups: Record<string, typeof photosToUse> = {}
  for (const photo of photosToUse) {
    const date = (photo.uploaded_at || '').slice(0, 10)
    if (!groups[date]) groups[date] = []
    groups[date].push(photo)
  }
  // 최신 날짜가 위로 오도록 정렬
  return Object.fromEntries(Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0])))
})
</script>

<style scoped>
.selected {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
}

.photo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
</style>
