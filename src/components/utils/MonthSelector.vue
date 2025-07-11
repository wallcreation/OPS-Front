<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const emit = defineEmits(['update:month'])

const currentMonth = ref(dayjs())

const formattedMonth = computed(() => {
  return currentMonth.value.format('MMMM YYYY')
})

function prevMonth() {
  currentMonth.value = currentMonth.value.subtract(1, 'month')
  emit('update:month', currentMonth.value.format('YYYY-MM'))
}

function nextMonth() {
  currentMonth.value = currentMonth.value.add(1, 'month')
  emit('update:month', currentMonth.value.format('YYYY-MM'))
}
</script>
<template>
  <div class="p-1 flex items-center justify-between gap-2 bg-surface border-2 border-border rounded-lg">
    <button @click="prevMonth" class="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600">←</button>
    <span class="text-lg font-semibold">{{ formattedMonth }}</span>
    <button @click="nextMonth" class="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600">→</button>
  </div>
</template>
