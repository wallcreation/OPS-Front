<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import { deleteStat, getAccountStats, safeCall } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import StatDisplayAccount from '@/components/admin/StatDisplayAccount.vue'
import { useNotificationStore } from '@/stores/notification'
const route = useRoute()
const stores = useAppStore()
const notification = useNotificationStore()
const accountid = route.params.id // ID du compte depuis l'URL
const account = stores.getAccountById(accountid) // Données du compte

// Gestion des états réactifs
const stats = ref({}) // Stocke les statistiques récupérées
const summary = ref({})
const selectedMonth = ref(dayjs().format('YYYY-MM')) // Mois sélectionné (par défaut : mois courant)

// Fonction appelée lors du changement de mois
const monthChanged = async (month) => {
  notification.notify("Chargement des statistiques.")
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
  stats.value = res.stats
  summary.value = res.summary

}

const statDeleted = async (id) => {
  const [res,err] = await safeCall(deleteStat(id))
  monthChanged(selectedMonth.value)
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
        </div>
      </section>
      <!-- Stat summaary -->
      <section class="col-span-2 sm:col-span-none bg-surface p-2 rounded-lg border-2 border-border">
        <h1 class="col-span-2 text-primary font-bold underline">Statistiques</h1>
        <!-- Résumé des stats (à compléter) -->
        <section class="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-auto gap-1">
          <div v-for="(data, weeks) in summary" class="bg-surface flex gap-1 text-sm">
            <h3 class="uppercase font-bold">{{ weeks }}:</h3>
            <p class="text-nowrap">
              {{ data.total_entry }}
              <sup>{{ data.total_stop }}</sup>
            </p>
          </div>
        </section>
      </section>
      <!-- Month selector -->
       <MonthSelector :modelValue="selectedMonth" @update:month="monthChanged" class="col-span-2 sm:col-span-4" />
    </div>
    <!-- Stat -->
    <div class="flex-grow overflow-y-hidden sm:flex sm:gap-1 space-y-1 sm:space-y-0">
      <div v-if="stats" class="w-full h-full p-2 overflow-y-auto bg-surface border-2 border-border rounded-lg">
        <StatDisplayAccount :stats="stats" :stores="stores" :notification="notification" @deleted="statDeleted" />
      </div>
      <p v-else class="text-muted">Aucune statistique disponible pour ce mois.</p>
    </div>
  </div>
</template>
