<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import { getAccountStats, safeCall } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import StatDisplay from '@/components/admin/StatDisplay.vue'
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
    account_id: account.id,
    date: selectedMonth.value,
  }
  // Appel API sécurisé pour récupérer les stats
  const [res, err] = await safeCall(getAccountStats(data))
  console.log('Selected month:', selectedMonth.value)
  if (err) {
    console.error('Error fetching stats:', err)
    return
  }
  stats.value = res
}

// Au montage du composant, on charge les stats du mois courant
onMounted(() => {
  monthChanged(selectedMonth.value)
})
</script>
<template>
  <div class="w-full h-full flex flex-col py-1">
    <!-- Info -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 pb-1">
      <section class="col-span-2 sm:col-span-2 bg-surface p-2 rounded-lg border-2 border-border">
        <h1 class="text-5xl text-primary">{{ account.name }}</h1>
        <div class="flex gap-1 pt-1">
          <RouterLink
            :to="{ name: 'team-info', params: { id: team.id } }"
            class="underline hover:text-primary-dark"
          >
            {{ team.name }}
          </RouterLink>
          <RouterLink
            v-for="operator in operators"
            :key="operator.id"
            :to="{ name: 'operator-info', params: { id: operator.id } }"
            class="underline hover:text-primary-dark"
          >
            <span class="hidden sm:inline">{{ operator.lname }}</span>
            {{ operator.fname }}
          </RouterLink>
        </div>
      </section>
      <!-- Stat summaary -->
      <section class="col-span-2 sm:col-span-none bg-surface p-2 rounded-lg border-2 border-border">
        <h2 class="font-bold text-primary">Statistiques</h2>
      </section>
      <!-- Month selector -->
       <MonthSelector :modelValue="selectedMonth" @update:month="monthChanged" class="col-span-2 sm:col-span-4" />
    </div>
    <!-- Stat -->
    <div class="flex-grow overflow-y-hidden sm:flex sm:gap-1 space-y-1 sm:space-y-0">
      <div v-for="operator in operators" :key="operator.id" class="w-full sm:w-[50%] h-[50%] sm:h-full p-2 overflow-y-auto bg-surface border-2 border-border rounded-lg">
        <h3 class="text-primary font-bold">{{ operator.fname }} {{ operator.lname }}</h3>
        <StatDisplay :stats="stats[operator.id]" :stores="stores" />
      </div>
    </div>
  </div>
</template>
