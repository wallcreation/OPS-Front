<script setup>
import { computed, onMounted, ref } from 'vue'
import { getTeams, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import { useNotificationStore } from '@/stores/notification'

import TeamAdd from '@/components/admin/TeamAdd.vue'
import TeamCard from '@/components/admin/TeamCard.vue'
import 'primeicons/primeicons.css'

// State
const loading = ref(false)
const showTeamAdd = ref(false)
const stores = useAppStore()
const teams = computed(() => stores.teams)

// Data fetch
const fetchTeams = async () => {
  loading.value = true
  const notification = useNotificationStore()
  notification.notify('Mise à jour de la liste des équipes')
  const [res, err] = await safeCall(getTeams())
  if (res) stores.setTeams(res)
  loading.value = false
}

onMounted(fetchTeams)

const refreshTeams = () => {
  fetchTeams()
}
</script>

<template>
  <div class="w-full h-full p-4 space-y-4 text-white bg-zinc-900">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-2xl font-bold text-primary-400">Gestion des équipes</h1>
      <button
        @click="showTeamAdd = true"
        class="flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
      >
        <i class="pi pi-plus"></i>
        <span>Nouvelle équipe</span>
      </button>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="flex-grow flex justify-center items-center py-20">
      <p class="animate-pulse text-zinc-400">Chargement des équipes...</p>
    </div>

    <!-- Team cards -->
    <div
      v-else-if="teams.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4"
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

    <!-- Empty state -->
    <div v-else class="text-center text-zinc-500 py-10">
      <p>Aucune équipe trouvée.</p>
      <p class="text-sm">Cliquez sur "Nouvelle équipe" pour en créer une.</p>
    </div>
  </div>

  <!-- Add team modal -->
  <TeamAdd v-if="showTeamAdd" @close="showTeamAdd = false" @created="refreshTeams()" />
</template>
