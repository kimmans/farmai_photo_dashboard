import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export interface PhotoRow {
  id: string;
  mission_id: string;
  part: string;
  url: string;
  uploaded_at?: string;
  ai_analysis?: any;
}

export const usePhotosStore = defineStore('photos', {
  state: () => ({
    photos: [] as PhotoRow[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchPhotos() {
      this.loading = true;
      this.error = null;
      console.log('사진 목록 불러오기 시작');
      const { data, error } = await supabase.from('mission_photos').select('*');
      if (error) {
        this.error = error.message;
        this.photos = [];
        console.log('사진 목록 불러오기 실패:', error.message);
      } else {
        this.photos = data || [];
        console.log('사진 목록 불러오기 성공:', this.photos);
      }
      this.loading = false;
    },
  },
}); 