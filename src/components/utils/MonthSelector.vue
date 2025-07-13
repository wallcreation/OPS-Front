<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

// Définir la locale globale
dayjs.locale('fr')

const emit = defineEmits(['update:month'])

const currentMonth = ref(dayjs())

const formattedMonth = computed(() => {
  return currentMonth.value.format('MMMM YYYY') // ex : juillet 2025
})

function prevMonth() {
  currentMonth.value = currentMonth.value.subtract(1, 'month')
  emit('update:month', currentMonth.value.format('YYYY-MM'))
}

function nextMonth() {
  currentMonth.value = currentMonth.value.add(1, 'month')
  emit('update:month', currentMonth.value.format('YYYY-MM'))
}
const prevLabel = computed(() => {
  const date = currentMonth.value.subtract(1, 'month')
  return {
    full: date.format('MMMM'),
    short: date.format('MMM'),
  }
})

const nextLabel = computed(() => {
  const date = currentMonth.value.add(1, 'month')
  return {
    full: date.format('MMMM'),
    short: date.format('MMM'),
  }
})
</script>

<template>
  <div
    class="p-1 flex items-center justify-between gap-2 bg-surface border-2 border-border rounded-lg"
  >
    <button
      @click="prevMonth"
      class="px-3 py-1 rounded-lg border-2 border-primary hover:bg-primary-dark transition text-text flex items-center gap-1"
    >
      ←
      <span class="hidden sm:inline capitalize">{{ prevLabel.full }}</span>
      <span class="inline sm:hidden capitalize">{{ prevLabel.short }}</span>
    </button>
    <span class="text-lg font-semibold text-text capitalize">{{ formattedMonth }}</span>
    <button
      @click="nextMonth"
      class="px-3 py-1 rounded-lg border-2 border-primary hover:bg-primary-dark transition text-text flex items-center gap-1"
    >
      <span class="hidden sm:inline capitalize">{{ nextLabel.full }}</span>
      <span class="inline sm:hidden capitalize">{{ nextLabel.short }}</span>
      →
    </button>
  </div>
</template>
