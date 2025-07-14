<script setup>
import { computed, onMounted, ref } from 'vue'
import { getTeams, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import TeamAdd from '@/components/admin/TeamAdd.vue'
import TeamCard from '@/components/admin/TeamCard.vue'
// Variables
const loading = ref(false)
// const teams = ref([])
const showTeamAdd = ref(false)
const stores = useAppStore()
const teams = computed(() => stores.teams)

onMounted(async () => {
  // await foo()
})
</script>
<template>
  <div class="w-full h-full p-1 flex flex-col">
    <div
      class="p-2 flex justify-between items-center border-1 border-border bg-surface rounded-lg"
    >
      <h1 class="text-xl font-bold text-primary">Liste des équipes</h1>
      <button
        @click="showTeamAdd = true"
        class="p-1 flex gap-1 hover:text-primary hover:border-2 hover:rounded-lg hover:border-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M12.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m5 .5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-13 2a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6 9.25C6 8.56 6.56 8 7.25 8h5.5a1.25 1.25 0 0 1 1.23 1.024a5.5 5.5 0 0 0-3.73 8.968A4 4 0 0 1 6 14zm8.989-.229c1.139.1 2.178.548 3.011 1.236V9.25C18 8.56 17.44 8 16.75 8h-2.129c.2.298.33.646.367 1.021M5 9.25c0-.463.14-.892.379-1.25H3.25C2.56 8 2 8.56 2 9.25V13a3 3 0 0 0 3.404 2.973A5 5 0 0 1 5 14zm14 5.25a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z"
          />
        </svg>
        <span class="hidden sm:inline">Ajouter</span>
      </button>
    </div>
    <div v-if="loading" class="flex-grow p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des équipes...</p>
    </div>
    <div
      v-else
      class="flex-grow p-2 grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-auto"
    >
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :id="team.id"
        :name="team.name"
        :operators="stores.getOperatorsByTeamId(team.id)"
        :accounts="stores.getAccountsByTeamId(team.id)"
      />
    </div>
  </div>
  <!-- Add team modal -->
  <TeamAdd v-if="showTeamAdd" @close="showTeamAdd = false" />
</template>
