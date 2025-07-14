import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export interface MissionRow {
  id: string;
  user_id: string;
  farm_id: string;
  date: string;
  completed: boolean;
  reward?: string;
  point?: number;
  created_at?: string;
}

export const useMissionsStore = defineStore('missions', {
  state: () => ({
    missions: [] as MissionRow[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchMissions() {
      this.loading = true;
      this.error = null;
      console.log('미션 목록 불러오기 시작');
      const { data, error } = await supabase.from('missions').select('*');
      if (error) {
        this.error = error.message;
        this.missions = [];
        console.log('미션 목록 불러오기 실패:', error.message);
      } else {
        this.missions = data || [];
        console.log('미션 목록 불러오기 성공:', this.missions);
      }
      this.loading = false;
    },
  },
}); 