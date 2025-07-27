<script setup>
import { computed, onMounted, ref } from 'vue'
import { getTeams, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import TeamAdd from '@/components/admin/TeamAdd.vue'
import TeamCard from '@/components/admin/TeamCard.vue'
import { useNotificationStore } from '@/stores/notification'
// Variables
const loading = ref(false)
const showTeamAdd = ref(false)
const stores = useAppStore()
const teams = computed(() => stores.teams)

async function foo() {
  const notification = useNotificationStore()
  notification.notify("Mise à jour de la liste des équipes")
  const [res,err] = await safeCall(getTeams())
  if (res) stores.setTeams(res)
}

onMounted(async () => {
  await foo()
})
</script>
<template>
  <div class="w-full h-full p-1 flex flex-col">
    <div class="p-1 flex justify-between items-center rounded-xl">
      <h1 class="text-xl font-bold text-primary-light">Liste des équipes</h1>
      <button
        @click="showTeamAdd = true"
        class="p-1 flex gap-1 border-2 border-primary rounded-lg hover:border-primary-dark hover:border-2 hover:bg-primary-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
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
      class="p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-auto"
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
