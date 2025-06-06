<script setup>
import { ref } from 'vue'
import TeamCard from './TeamCard.vue'
const props = defineProps({
  teams: {
    type: Array,
    default: [],
  },
})
</script>
<template>
  <div class="bg-[#13223A]/50 rounded-lg mx-2 p-2 text-center">
    <h1 class="text-xl bg-[#7C3AED] p-1 mx-1 my-1 rounded-lg font-bold text-white">Équipes</h1>
    <div v-if="teams.length">
      <div class="flex flex-nowrap overflow-x-auto 1 gap-2 px-2">
        <TeamCard
          v-for="team in teams"
          :key="team.id"
          :name="team.name"
          :ops="team.operators"
          :accounts="team.accounts"
          class="p-2"
        />
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl bg-[#EF4444] p-1 mx-4 my-1 rounded-lg text-white animate-pulse">
        Aucune équipe disponible
      </h1>
    </div>
  </div>
</template>
