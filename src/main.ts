import './assets/main.css'
import { supabase } from './services/supabase';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Chart.js 스케일 등록
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

supabase.from('users').select('*').then(console.log);