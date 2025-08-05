<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Enregistre les composants de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  stats: {
    type: Array,
    required: true,
    default: () => []
  }
})

// Préparation des données pour le chart
import { computed } from 'vue'

const labels = computed(() => props.stats.map(stat => stat.name))
const totals = computed(() => props.stats.map(stat => stat.total))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Total mensuel',
      data: totals.value,
      backgroundColor: '#0EA5E9',
      borderRadius: 8,
      barThickness: 30,
    }
  ]
}))
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#F1F5F9'
      }
    },
    title: {
      display: true,
      text: 'Totaux par opérateur',
      color: '#F1F5F9',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#F1F5F9' },
      grid: { color: '#334155' }
    },
    y: {
      ticks: { color: '#F1F5F9' },
      grid: { color: '#334155' }
    }
  }
}
</script>

<template>
  <div class="h-full w-full p-4 rounded-2xl border-2 border-border bg-surface">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
