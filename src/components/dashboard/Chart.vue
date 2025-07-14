<template>
  <div class="chart-card">
    <h3>{{ title }}</h3>
    <Bar v-if="type === 'bar'" :data="data as ChartData<'bar'>" :options="options as ChartOptions<'bar'>" />
    <Line v-else :data="data as ChartData<'line'>" :options="options as ChartOptions<'line'>" />
  </div>
</template>

<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';

defineProps<{
  title: string;
  type?: 'bar' | 'line';
  data: ChartData<'bar'> | ChartData<'line'>;
  options?: ChartOptions<'bar'> | ChartOptions<'line'>;
}>();
</script>

<style scoped>
.chart-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  min-width: 320px;
}
h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #2563eb;
}
</style> 