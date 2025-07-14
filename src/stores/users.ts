import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export interface UserRow {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  point?: number;
  created_at?: string;
  updated_at?: string;
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as UserRow[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      console.log('사용자 목록 불러오기 시작');
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        this.error = error.message;
        this.users = [];
        console.log('사용자 목록 불러오기 실패:', error.message);
      } else {
        this.users = data || [];
        console.log('사용자 목록 불러오기 성공:', this.users);
      }
      this.loading = false;
    },
  },
}); 