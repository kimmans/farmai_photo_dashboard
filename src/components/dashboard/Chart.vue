<template>
  <div class="w-full h-full">
    <Bar v-if="type === 'bar'" :data="data as ChartData<'bar'>" :options="chartOptions" />
    <Line v-else :data="data as ChartData<'line'>" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

defineProps<{
  title: string
  type?: 'bar' | 'line'
  data: ChartData<'bar'> | ChartData<'line'>
  options?: ChartOptions<'bar'> | ChartOptions<'line'>
}>()

const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
  },
}
</script>

<style scoped>
/* 완전히 비움: Tailwind만 사용 */
</style>
