<script setup>
import { computed, ref, onMounted } from 'vue'
import { updateStore, safeCall, getChartData } from '@/api'
import MyChart from '@/components/admin/MyChart.vue'
import MonthSelector from '@/components/utils/MonthSelector.vue'


onMounted(async () => {
  const [res, err] = await safeCall(getChartData())
  if (err) console.log("Dashboard error ", err)
  stats.value = res
  console.log("res ", res)
})
</script>

<template>
<div class="w-full h-full flex flex-col gap-2 p-2">
  <div class="flex-grow">
    <MyChart :stats="stats" />
  </div>
  <div class="flex gap-2">
    <div class="flex-grow">
      <MonthSelector />
    </div>
    <button class="p-2 border-2 border-primary rounded-xl hover:bg-primary-dark hover:border-primary-dark">Télécharger la facture</button>
  </div>
</div>
</template>