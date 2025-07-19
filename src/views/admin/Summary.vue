<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { safeCall, getChartData, downloadFacture, generateFacture } from '@/api'
import MyChart from '@/components/admin/MyChart.vue'
import MonthSelector from '@/components/utils/MonthSelector.vue'

const selectedMonth = ref(dayjs().format('YYYY-MM'))
const stats = ref([])
const isLoading = ref(false)
const status = ref("Générer la facture")

const monthChanged = async (month) => {
  selectedMonth.value = month
  const data = {
    date: selectedMonth.value,
  }
  const [res, err] = await safeCall(getChartData(data))
  if (err) console.log('Dashboard error ', err)
  stats.value = res
}

const getFacture = async () => {
  isLoading.value = true
  status.value = "Génération..."
  const data = {
    date: selectedMonth.value,
  }
  const [genRes,genErr] = await safeCall(generateFacture(data))
  status.value = "Téléchargement..."
  const [res,err] = await safeCall(downloadFacture(genRes))
  isLoading.value = false
  status.value = "Générer la facture"
}

onMounted(async () => {
  monthChanged(selectedMonth.value)
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2 p-2">
    <div class="md:flex-grow">
      <MyChart :stats="stats" />
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-grow">
        <MonthSelector :modelValue="selectedMonth" @update:month="monthChanged" />
      </div>
      <button
        @click="getFacture"
        :disabled="isLoading"
        :class="isLoading ? 'animate-pulse' : ''"
        class="p-2 border-2 border-primary rounded-xl hover:bg-primary-dark hover:border-primary-dark"
      >
        {{ status }}
      </button>
    </div>
  </div>
</template>
