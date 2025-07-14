<template>
  <div class="stats-grid">
    <div class="stat-card" v-for="stat in stats" :key="stat.label">
      <div class="stat-label">{{ stat.label }}</div>
      <div class="stat-value">{{ stat.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: { label: string; value: number | string }[];
}>();
</script>

<style scoped>
.stats-grid {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.stat-card {
  background: #f3f4f6;
  border-radius: 12px;
  padding: 1.5rem 2.5rem;
  min-width: 160px;
  text-align: center;
  box-shadow: 0 2px 8px #0001;
  transition: transform 0.2s;
}
.stat-card:hover {
  transform: translateY(-4px) scale(1.03);
}
.stat-label {
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.stat-value {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2563eb;
  letter-spacing: 1px;
}
</style> 