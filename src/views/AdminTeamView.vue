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
  <main class="flex flex-col h-full">
    <div
      class="min-h-[3.5rem] flex gap-3 items-center rounded-lg p-1 mb-1 overflow-x-auto"
    >
      <div
        v-for="team in teams"
        :key="team.id"
        class="py-1 px-3 text-center rounded-lg outline-2 outline-offset-2 outline-[#6C5CE7]"
        :class="[
          currentTeam.id === team.id
            ? 'bg-[#6C5CE7] text-[#222222] text-bold'
            : 'bg-[#222222]',
        ]"
        @click="currentTeam = team"
      >
        <h1 class="whitespace-nowrap">{{ team.name }}</h1>
      </div>
    </div>

    <!-- Container pour l'info équipe avec scroll si nécessaire -->
    <div class="flex-1 bg-[#222222] border-2 border-[#6C5CE7] rounded-lg overflow-y-auto p-1">
      <TeamInfo :team="currentTeam" class="min-h-full" />
    </div>
  </main>
</template>
