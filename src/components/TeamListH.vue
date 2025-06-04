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
  <div class="bg-[#13223A]/50 rounded-lg w-full mx-5">
    <h1 class="text-xl text-white">Équipes</h1>
    <div v-if="teams.length">
      <div class="grid grid-cols-6 grid-rows-2 gap-2 px-4">
        <TeamCard
          v-for="team in teams"
          :key="team.id"
          :name="team.name"
          :ops="team.operators"
          :accounts="team.accounts"
        />
      </div>
    </div>
    <div v-else>
      <p class="text-white text-center p-4">Aucune équipe disponible</p>
    </div>
  </div>
</template>
