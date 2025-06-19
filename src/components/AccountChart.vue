<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
})

// Extraire les données
const operatorNames = props.account.stats.op.map(op => op.name)
const operatorAmounts = props.account.stats.op.map(op => op.amount)

const chartData = {
  labels: operatorNames,
  datasets: [
    {
      label: 'Messages envoyés',
      backgroundColor: '#E84393',
      data: operatorAmounts,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#fff',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#fff' },
      grid: { color: '#444' },
    },
    y: {
      ticks: { color: '#fff' },
      grid: { color: '#444' },
    },
  },
}
</script>

<template>
  <div class="h-64 w-1/2 mx-auto mt-5">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
