<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { updateStore, safeCall, getChartData } from '@/api'
import MyChart from '@/components/admin/MyChart.vue'
import MonthSelector from '@/components/utils/MonthSelector.vue'
const store = useAppStore()
const stats = ref([])
const data = ref({
  teams: computed(() => store.teams),
  operators: computed(() => store.operators),
  accounts: computed(() => store.accounts),
})


onMounted(async () => {
  updateStore(store)
})
</script>

<template>
<div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
  <div class="md:col-span-2 flex flex-col items-center justify-center bg-surface border-2 border-border rounded-xl">
    <h1 class="text-primary text-5xl font-bold">{{ data.teams.length }}</h1>
    <p>Équipes</p>
  </div>
  <div class="flex flex-col items-center justify-center bg-surface border-2 border-border rounded-xl">
    <h1 class="text-primary text-5xl font-bold">{{ data.operators.length }}</h1>
    <p>Opérateurs</p>
  </div>
  <div class="flex flex-col items-center justify-center bg-surface border-2 border-border rounded-xl">
    <h1 class="text-primary text-5xl font-bold">{{ data.accounts.length }}</h1>
    <p>Comptes</p>
  </div>
</div>
</template>

<style scoped>
</style>
