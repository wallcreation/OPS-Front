<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { safeCall, getChartData } from '@/api'
import MyChart from '@/components/admin/MyChart.vue'
import MonthSelector from '@/components/utils/MonthSelector.vue'

const selectedMonth = ref(dayjs().format('YYYY-MM'))
const stats = ref([])

const monthChanged = async (month) => {
  selectedMonth.value = month
  const data = {
    date: selectedMonth.value,
  }
  const [res, err] = await safeCall(getChartData(data))
  if (err) console.log("Dashboard error ", err)
  stats.value = res
}

onMounted(async () => {
  monthChanged(selectedMonth.value)
})
</script>

<template>
<div class="w-full h-full flex flex-col gap-2 p-2">
  <div class="flex-grow">
    <MyChart :stats="stats" />
  </div>
  <div class="flex gap-2">
    <div class="flex-grow">
      <MonthSelector :modelValue="selectedMonth" @update:month="monthChanged" />
    </div>
    <button class="p-2 border-2 border-primary rounded-xl hover:bg-primary-dark hover:border-primary-dark">Télécharger la facture</button>
  </div>
</div>
</template>