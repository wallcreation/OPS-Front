<script setup>
import OperatorInfo from '@/components/OperatorInfo.vue'
import { ref } from 'vue'
// stat, date, start:int, end:int, total:int, stop_start:int, stop_end:int, stop_total:int
const stats = ref([
    { id: 1, date: '2023-10-01', start: 8, end: 16, total: 8, stop_start: 12, stop_end: 14, stop_total: 2 },
    { id: 2, date: '2023-10-02', start: 9, end: 17, total: 8, stop_start: 13, stop_end: 15, stop_total: 2 },
    { id: 3, date: '2023-10-03', start: 10, end: 18, total: 8, stop_start: 14, stop_end: 16, stop_total: 2 },
    { id: 4, date: '2023-10-04', start: 11, end: 19, total: 8, stop_start: 15, stop_end: 17, stop_total: 2 },
    { id: 5, date: '2023-10-05', start: 12, end: 20, total: 8, stop_start: 16, stop_end: 18, stop_total: 2 },
    { id: 6, date: '2023-10-06', start: 13, end: 21, total: 8, stop_start: 17, stop_end: 19, stop_total: 2 },
    { id: 7, date: '2023-10-07', start: 14, end: 22, total: 8, stop_start: 18, stop_end: 20, stop_total: 2 },
    { id: 8, date: '2023-10-08', start: 15, end: 23, total: 8, stop_start: 19, stop_end: 21, stop_total: 2 },
    { id: 9, date: '2023-10-09', start: 16, end: 24, total: 8, stop_start: 20, stop_end: 22, stop_total: 2 },
    { id: 10, date: '2023-10-10', start: 17, end: 25, total: 8, stop_start: 21, stop_end: 23, stop_total: 2 },
    { id: 11, date: '2023-10-11', start: 18, end: 26, total: 8, stop_start: 22, stop_end: 24, stop_total: 2 },
    { id: 12, date: '2023-10-12', start: 19, end: 27, total: 8, stop_start: 23, stop_end: 25, stop_total: 2 },
    { id: 13, date: '2023-10-13', start: 20, end: 28, total: 8, stop_start: 24, stop_end: 26, stop_total: 2 },
    { id: 14, date: '2023-10-14', start: 21, end: 29, total: 8, stop_start: 25, stop_end: 27, stop_total: 2 },
    { id: 15, date: '2023-10-15', start: 22, end: 30, total: 8, stop_start: 26, stop_end: 28, stop_total: 2 },
    { id: 16, date: '2023-10-16', start: 23, end: 31, total: 8, stop_start: 27, stop_end: 29, stop_total: 2 },
    { id: 17, date: '2023-10-17', start: 24, end: 1, total: 8, stop_start: 28, stop_end: 30, stop_total: 2 },
    { id: 18, date: '2023-10-18', start: 25, end: 2, total: 8, stop_start: 29, stop_end: 31, stop_total: 2 },
    { id: 19, date: '2023-10-19', start: 26, end: 3, total: 8, stop_start: 30, stop_end: 1, stop_total: 2 },
    { id: 20, date: '2023-10-20', start: 27, end: 4, total: 8, stop_start: 31, stop_end: 2, stop_total: 2 },
    { id: 21, date: '2023-10-21', start: 28, end: 5, total: 8, stop_start: 1, stop_end: 3, stop_total: 2 },
    { id: 22, date: '2023-10-22', start: 29, end: 6, total: 8, stop_start: 2, stop_end: 4, stop_total: 2 },
    { id: 23, date: '2023-10-23', start: 30, end: 7, total: 8, stop_start: 3, stop_end: 5, stop_total: 2 },
    { id: 24, date: '2023-10-24', start: 31, end: 8, total: 8, stop_start: 4, stop_end: 6, stop_total: 2 },
    { id: 25, date: '2023-10-25', start: 1, end: 9, total: 8, stop_start: 5, stop_end: 7, stop_total: 2 },
    { id: 26, date: '2023-10-26', start: 2, end: 10, total: 8, stop_start: 6, stop_end: 8, stop_total: 2 },
    { id: 27, date: '2023-10-27', start: 3, end: 11, total: 8, stop_start: 7, stop_end: 9, stop_total: 2 },
    { id: 28, date: '2023-10-28', start: 4, end: 12, total: 8, stop_start: 8, stop_end: 10, stop_total: 2 },
    { id: 29, date: '2023-10-29', start: 5, end: 13, total: 8, stop_start: 9, stop_end: 11, stop_total: 2 },
    { id: 30, date: '2023-10-30', start: 6, end: 14, total: 8, stop_start: 10, stop_end: 12, stop_total: 2 },
    { id: 31, date: '2023-10-31', start: 7, end: 15, total: 8, stop_start: 11, stop_end: 13, stop_total: 2 },
])
const penalty = ref([
    { id: 1, date: '2023-10-01', reason: 'Late start', amount: 50 },
    { id: 2, date: '2023-10-02', reason: 'Early stop', amount: 30 },
    { id: 3, date: '2023-10-03', reason: 'Missed break', amount: 20 },
    { id: 4, date: '2023-10-04', reason: 'Late start', amount: 50 },
    { id: 5, date: '2023-10-05', reason: 'Early stop', amount: 30 },
    { id: 6, date: '2023-10-06', reason: 'Missed break', amount: 20 },
    { id: 7, date: '2023-10-07', reason: 'Late start', amount: 50 },
    { id: 8, date: '2023-10-08', reason: 'Early stop', amount: 30 },
    { id: 9, date: '2023-10-09', reason: 'Missed break', amount: 20 },
    { id: 10, date: '2023-10-10', reason: 'Late start', amount: 50 },
    { id: 11, date: '2023-10-11', reason: 'Early stop', amount: 30 },
    { id: 12, date: '2023-10-12', reason: 'Missed break', amount: 20 },
    { id: 13, date: '2023-10-13', reason: 'Late start', amount: 50 },
    { id: 14, date: '2023-10-14', reason: 'Early stop', amount: 30 },
    { id: 15, date: '2023-10-15', reason: 'Missed break', amount: 20 },
    { id: 16, date: '2023-10-16', reason: 'Late start', amount: 50 },
    { id: 17, date: '2023-10-17', reason: 'Early stop', amount: 30 },
    { id: 18, date: '2023-10-18', reason: 'Missed break', amount: 20 },
    { id: 19, date: '2023-10-19', reason: 'Late start', amount: 50 },
    { id: 20, date: '2023-10-20', reason: 'Early stop', amount: 30 },
    { id: 21, date: '2023-10-21', reason: 'Missed break', amount: 20 },
    { id: 22, date: '2023-10-22', reason: 'Late start', amount: 50 },
    { id: 23, date: '2023-10-23', reason: 'Early stop', amount: 30 },
    { id: 24, date: '2023-10-24', reason: 'Missed break', amount: 20 },
    { id: 25, date: '2023-10-25', reason: 'Late start', amount: 50 },
    { id: 26, date: '2023-10-26', reason: 'Early stop', amount: 30 },
    { id: 27, date: '2023-10-27', reason: 'Missed break', amount: 20 },
    { id: 28, date: '2023-10-28', reason: 'Late start', amount: 50 },
    { id: 29, date: '2023-10-29', reason: 'Early stop', amount: 30 },
    { id: 30, date: '2023-10-30', reason: 'Missed break', amount: 20 },
    { id: 31, date: '2023-10-31', reason: 'Late start', amount: 50 },
])
const operators = ref([
  { id: 1, fname: 'Alice', lname: 'Smith', team: 'Team A', workat: 'day' },
  { id: 2, fname: 'Bob', lname: 'Johnson', team: 'Team A', workat: 'night' },
  { id: 3, fname: 'Charlie', lname: 'Brown', team: 'Team B', workat: 'day' },
  { id: 4, fname: 'David', lname: 'Williams', team: 'Team B', workat: 'night' },
  { id: 5, fname: 'Eve', lname: 'Jones', team: 'Team C', workat: 'day' },
  { id: 6, fname: 'Frank', lname: 'Garcia', team: 'Team C', workat: 'night' },
  { id: 7, fname: 'Grace', lname: 'Martinez', team: 'Team D', workat: 'day' },
  { id: 8, fname: 'Heidi', lname: 'Hernandez', team: 'Team D', workat: 'night' },
  { id: 9, fname: 'Ivan', lname: 'Lopez', team: 'Team E', workat: 'day' },
  { id: 10, fname: 'Judy', lname: 'Gonzalez', team: 'Team E', workat: 'night' },
])
const currentOperator = ref(operators.value[0])
</script>
<template>
  <main class="flex flex-col h-full">
    <div class="min-h-[3.5rem] flex items-center gap-3 p-1 mb-1 overflow-x-auto">
      <div
        v-for="operator in operators"
        :key="operator.id"
        class="py-1 px-3 text-nowrap outline-2 outline-[#00B894] rounded-lg"
      >
        <h1>{{ operator.lname }} {{ operator.fname }}</h1>
      </div>
    </div>
    <div
      class="flex-1 bg-[#222222] border-2 border-[#00B894] rounded-lg gap-2 p-2 overflow-y-auto h-full p-1"
    >
      <OperatorInfo :operator="currentOperator" :stats="stats" :penalty="penalty"/>
    </div>
  </main>
</template>
