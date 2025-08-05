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
    class="p-1 flex items-center justify-between bg-surface border-2 border-border rounded-xl"
  >
    <button
      @click="prevMonth"
      class="px-2 py-1 rounded-lg border-2 border-primary hover:bg-primary-dark hover:border-primary-dark transition text-text flex items-center gap-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="3" cy="3" r="3" transform="matrix(-1 0 0 1 22 9)"/><path d="M2 12h10M2 12c0 .562.438.99 1.314 1.844L4.971 15.5M2 12c0-.562.438-.99 1.314-1.844L4.97 8.5"/></g></svg>
      <span class="hidden sm:inline capitalize">{{ prevLabel.full }}</span>
      <span class="inline sm:hidden capitalize">{{ prevLabel.short }}</span>
    </button>
    <span class="text-lg font-semibold text-text capitalize">{{ formattedMonth }}</span>
    <button
      @click="nextMonth"
      class="px-2 py-1 rounded-lg border-2 border-primary hover:bg-primary-dark hover:border-primary-dark transition text-text flex items-center gap-1"
    >
      <span class="hidden sm:inline capitalize">{{ nextLabel.full }}</span>
      <span class="inline sm:hidden capitalize">{{ nextLabel.short }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="5" cy="12" r="3"/><path d="M22 12H12m10 0c0 .562-.438.99-1.314 1.844L19.029 15.5M22 12c0-.562-.438-.99-1.314-1.844L19.03 8.5"/></g></svg>
    </button>
  </div>
</template>
