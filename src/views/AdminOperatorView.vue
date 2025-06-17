<script setup>
import { ref } from 'vue'
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
</script>
<template>
  <main class="flex flex-col h-full">
    <div class="flex items-center gap-2 p-1 mb-2 overflow-x-auto">
      <div
        v-for="operator in operators"
        :key="operator.id"
        class="py-1 px-3 text-nowrap outline outline-2 outline-[#00B894] rounded-lg"
      >
        <h1>{{ operator.lname }} {{ operator.fname }}</h1>
      </div>
    </div>
  </main>
</template>
