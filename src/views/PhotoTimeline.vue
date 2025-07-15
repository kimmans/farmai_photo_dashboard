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
            <button
              @click="analyzePhoto"
              :disabled="aiLoading"
              style="
                width: 100%;
                padding: 0.5rem 1rem;
                background-color: #2563eb;
                color: white;
                border: none;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-bottom: 1rem;
              "
              :style="aiLoading ? 'background-color: #9ca3af; cursor: not-allowed;' : ''"
            >
              {{ aiLoading ? 'AI 분석 중...' : 'AI 분석' }}
            </button>
            <div
              v-if="aiResult"
              style="
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                padding: 1rem;
                font-size: 0.875rem;
                color: #374151;
                line-height: 1.5;
              "
            >
              <div style="font-weight: 600; margin-bottom: 0.5rem">AI 분석 결과:</div>
              <div>{{ aiResult }}</div>
            </div>
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
const aiLoading = ref(false)
const aiResult = ref('')

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

async function analyzePhoto() {
  if (!selectedPhoto.value) return
  aiLoading.value = true
  aiResult.value = ''

  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    const imageUrl = selectedPhoto.value.url

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert agricultural image analyst. Analyze the following farm photo and describe any issues, diseases, or notable features you see. Respond in Korean.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '이 사진이 어떤 사진인지 알려줘. 딸기나 잎, 줄기, 병해충, 온실 사진이 아니면 나랑 장난하니? 라고 말해줘',
              },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    aiResult.value = data.choices?.[0]?.message?.content || '분석 결과를 가져올 수 없습니다.'
  } catch (error) {
    console.error('AI 분석 오류:', error)
    aiResult.value = 'AI 분석 중 오류가 발생했습니다.'
  } finally {
    aiLoading.value = false
  }
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
