<script setup>
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
const route = useRoute()
const stores = useAppStore()
const accountid = route.params.id // ID du compte depuis l'URL
const account = stores.getAccountById(accountid) // Données du compte
const team = stores.getTeamById(account.team_id) // Données de l'équipe du compte
const operators = stores.getOperatorsByTeamId(team.id) // Données de l'opérateur du compte

// Gestion des états réactifs
const stats = ref({}) // Stocke les statistiques récupérées
const selectedMonth = ref(dayjs().format('YYYY-MM')) // Mois sélectionné (par défaut : mois courant)

// Fonction appelée lors du changement de mois
const monthChanged = async (month) => {
  selectedMonth.value = month
  const data = {
    operator_id: operatorid,
    date: selectedMonth.value,
  }
  // Appel API sécurisé pour récupérer les stats
  const [res, err] = await safeCall(getOperatorStats(data))
  console.log('Selected month:', selectedMonth.value)
  if (err) {
    console.error('Error fetching stats:', err)
    return
  }
  stats.value = res
}


</script>
<template>
  <div class="w-full h-full flex flex-col py-1">
    <!-- Info -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-1">
      <section class="col-span-2 sm:col-span-3 bg-surface p-2 rounded-lg border-2 border-border">
        <h1 class="text-5xl text-primary">{{ account.name }}</h1>
        <RouterLink
          :to="{ name: 'team-info', params: { id: team.id } }"
          class="underline hover:text-primary-dark"
        >
          {{ team.name }}
        </RouterLink>
      </section>
      <!-- Stat summaary -->
      <section class="col-span-2 sm:col-span-1 bg-surface p-2 rounded-lg border-2 border-border">
        <h2 class="font-bold text-primary">Statistiques</h2>
      </section>
      <section></section>
    </div>
    <!-- Stat -->
    <div class="flex-grow"></div>
  </div>
</template>
