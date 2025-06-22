<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TeamInfo from '@/components/TeamInfo.vue'
const teams = ref([
  {
    id: 1,
    name: 'Team A',
    operators: ['Alice', 'Bob'],
    accounts: ['Account1', 'Account2'],
    key: 'ab12',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 2,
    name: 'Team B',
    operators: ['Charlie', 'David'],
    accounts: ['Account3', 'Account4'],
    key: 'cd34',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 3,
    name: 'Team C',
    operators: ['Eve', 'Frank'],
    accounts: ['Account5', 'Account6'],
    key: 'ef56',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 4,
    name: 'Team D',
    operators: ['Grace', 'Heidi'],
    accounts: ['Account7', 'Account8'],
    key: 'gh78',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 5,
    name: 'Team E',
    operators: ['Ivan', 'Judy'],
    accounts: ['Account9', 'Account10'],
    key: 'ij90',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 6,
    name: 'Team F',
    operators: ['Karl', 'Leo'],
    accounts: ['Account11', 'Account12'],
    key: 'kl12',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 7,
    name: 'Team G',
    operators: ['Mallory', 'Nina'],
    accounts: ['Account13', 'Account14'],
    key: 'mn34',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 8,
    name: 'Team H',
    operators: ['Oscar', 'Peggy'],
    accounts: ['Account15', 'Account16'],
    key: 'op56',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 9,
    name: 'Team I',
    operators: ['Quentin', 'Rupert'],
    accounts: ['Account17', 'Account18'],
    key: 'qr78',
    total_stat: 10990,
    total_penality: 5020,
  },
  {
    id: 10,
    name: 'Team J',
    operators: ['Sybil', 'Trent'],
    accounts: ['Account19', 'Account20'],
    key: 'st90',
    total_stat: 10990,
    total_penality: 5020,
  },
])
const currentTeam = ref(teams.value[0])
</script>
<template>
  <div class="h-full">
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center rounded-lg p-1 mb-1 overflow-x-auto"
    >
      <div
        v-for="team in teams"
        :key="team.id"
        class="flex items-center gap-1 bg-surface py-1 px-3 rounded-lg outline-2 outline-offset-2"
        :class="[
          currentTeam.id === team.id
            ? 'text-bold outline-primary-light'
            : 'outline-border',
        ]"
        @click="currentTeam = team"
      >
        <h1 class="whitespace-nowrap">{{ team.name }}</h1>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"><path fill="currentColor" d="M4 8a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-2.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"/></svg>
        </p>
        <div class="flex items-center">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/></svg>
          </p>
          <p>{{ team.operators.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
