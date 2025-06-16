<script setup>
import TeamCard from './TeamCard.vue'
import { ref } from 'vue'
const teams = ref([
  { id: 1, name: 'Team A', operators: ['Alice', 'Bob'], accounts: ['Account1', 'Account2'] },
  { id: 2, name: 'Team B', operators: ['Charlie', 'David'], accounts: ['Account3', 'Account4'] },
  { id: 3, name: 'Team C', operators: ['Eve', 'Frank'], accounts: ['Account5', 'Account6'] },
  { id: 4, name: 'Team D', operators: ['Grace', 'Heidi'], accounts: ['Account7', 'Account8'] },
  { id: 5, name: 'Team E', operators: ['Ivan', 'Judy'], accounts: ['Account9', 'Account10'] },
  { id: 6, name: 'Team F', operators: ['Karl', 'Leo'], accounts: ['Account11', 'Account12'] },
  { id: 7, name: 'Team G', operators: ['Mallory', 'Nina'], accounts: ['Account13', 'Account14'] },
  { id: 8, name: 'Team H', operators: ['Oscar', 'Peggy'], accounts: ['Account15', 'Account16'] },
  { id: 9, name: 'Team I', operators: ['Quentin', 'Rupert'], accounts: ['Account17', 'Account18'] },
  { id: 10, name: 'Team J', operators: ['Sybil', 'Trent'], accounts: ['Account19', 'Account20'] },
])
</script>
<template>
  <main class="p-1 w-5/6">
    <div class="w-full flex rounded-lg border-1 border-[#6C5CE7] overflow-x-auto">
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :name="team.name"
        :operators="team.operators"
        :accounts="team.accounts"
        class="m-1 rounded-lg"
      />
    </div>
  </main>
</template>
