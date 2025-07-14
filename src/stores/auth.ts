import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async signIn(email: string, password: string) {
      this.loading = true;
      this.error = null;
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        this.error = error.message;
        this.user = null;
      } else {
        // users 테이블에서 role 가져오기
        const { data: userRow } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
        this.user = { ...data.user, role: userRow?.role || 'user' };
      }
      this.loading = false;
    },
    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
    },
    async fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: userRow } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
        this.user = { ...data.user, role: userRow?.role || 'user' };
      } else {
        this.user = null;
      }
    }
  }
}); 