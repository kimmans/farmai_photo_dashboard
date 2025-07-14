import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export interface FarmRow {
  id: string;
  user_id: string;
  name: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export const useFarmsStore = defineStore('farms', {
  state: () => ({
    farms: [] as FarmRow[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchFarms() {
      this.loading = true;
      this.error = null;
      console.log('농장 목록 불러오기 시작');
      const { data, error } = await supabase.from('farms').select('*');
      if (error) {
        this.error = error.message;
        this.farms = [];
        console.log('농장 목록 불러오기 실패:', error.message);
      } else {
        this.farms = data || [];
        console.log('농장 목록 불러오기 성공:', this.farms);
      }
      this.loading = false;
    },
  },
}); 