<script setup>
// Importation des dépendances
import dayjs from 'dayjs'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { getOperatorStats, getOperatorPenalties, safeCall, getOperator, getOperators } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import OperatorEdit from '@/components/admin/OperatorEdit.vue'
import PenaltyDisplay from '@/components/admin/PenaltyDisplay.vue'
import StatDisplay from '@/components/admin/StatDisplay.vue'
import WorkAt from '@/components/utils/WorkAt.vue'
import PenaltyAdd from '@/components/admin/PenaltyAdd.vue'
import StatAdd from '@/components/admin/StatAdd.vue'
import 'primeicons/primeicons.css'

// Récupération des informations de la route et du store
const route = useRoute()
const stores = useAppStore()
const operatorid = route.params.id // ID de l'opérateur depuis l'URL
const operator = computed(() => stores.getOperatorById(operatorid)) // Données de l'opérateur
const team = computed(() => stores.getTeamById(operator.value.team_id)) // Données de l'équipe de l'opérateur

// Gestion des états réactifs
const stats = ref({}) // Stocke les statistiques récupérées
const stats_summaries = ref({})
const penalties = ref({}) // Stocke les pénalités récupérées
const penalties_summaries = ref({})
const selectedMonth = ref(dayjs().format('YYYY-MM')) // Mois sélectionné (par défaut : mois courant)
// Etats pour la gestion des modales et du type de champ mot de passe
const passtype = ref('password') // Type du champ mot de passe (text/password)
const showopedit = ref(false) // Affichage du modal d'édition opérateur
const showstatadd = ref(false) // Affichage du modal d'ajout de stat
const showpenality = ref(false) // Affichage du modal d'ajout de pénalité

async function getPenalties() {
  // Appel API sécurisé pour récupérer les pénalités
  const data = {
    operator_id: operatorid,
    date: selectedMonth.value,
  }
  const [penRes, penErr] = await safeCall(getOperatorPenalties(data))
  if (penErr) {
    console.error('Error fetching penalties:', penErr)
    return
  }
  penalties.value = penRes.penalties
  penalties_summaries.value = penRes.summary
}

async function getStats() {
  // Appel API sécurisé pour récupérer les stats
  const data = {
    operator_id: operatorid,
    date: selectedMonth.value,
  }
  const [res, err] = await safeCall(getOperatorStats(data))
  if (err) {
    console.error('Error fetching stats:', err)
    return
  }
  stats.value = res.stats
  stats_summaries.value = res.summary
}

// Fonction appelée lors du changement de mois
async function monthChanged(month) {
  selectedMonth.value = month
  await getStats()
  await getPenalties()
}

async function reloadOp() {
  await stores.fetchOperatorById(operatorid)
}

// Fonction pour ajouter une pénalité (ferme la modale)
function addPenality() {
  console.log('Ajouter stat !')
  showpenality.value = false
}

// Au montage du composant, on charge les stats du mois courant
onMounted(async () => {
  await reloadOp()
  await monthChanged(selectedMonth.value)
})
</script>
<template>
  <div class="w-full h-full flex flex-col p-10">
    <!-- Espace utilisateur -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_0.5fr_1fr] gap-4 pb-4">
      <div id="uinfo" class="col-span-1 md:col-span-2 lg:col-span-1 p-4 bg-surface border border-border rounded-lg shadow-lg ">
        <section class="flex justify-between items-center pb-3 mt-2">
          <div class="flex items-center gap-2">
            <i class="pi pi-user" size="40" color="primary"/>
            <h1 class="text-3xl sm:text-4xl text-primary font-semibold">{{ operator.fname }} {{ operator.lname }}</h1>
          </div>
          <button class="hover:text-primary transition-colors" @click="showopedit = true">
            <i class="pi pi-pencil" size="24" color="primary"/>
          </button>
        </section>

        <section class="flex flex-wrap items-center gap-4 text-sm text-muted">
          <i class="pi pi-envelope" size="24" color="primary"/>
          <p>{{ operator.email }}</p>
          <i class="pi pi-id-card" size="24" color="primary"/>
          <p>{{ operator.code }}</p>
          <RouterLink :to="{ name: 'team-info', params: { id: team.id } }" class="text-primary hover:text-primary-dark text-base">
            {{ team.name }}
          </RouterLink>
          <WorkAt :work_at="operator.work_at" />
        </section>
      </div>

      <!-- Bloc Statistiques Résumé -->
      <section class="bg-surface p-4 border-2 border-border rounded-lg shadow-lg h-[150px]">
        <div class="flex justify-between items-center mb-3">
          <h1 class="text-primary font-bold text-xl">Statistiques</h1>
          <button class="hover:text-primary transition-colors" @click="showstatadd = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" />
            </svg>
          </button>
        </div>
        <section class="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-auto">
          <div v-for="(data, weeks) in stats_summaries" class="bg-surface text-sm p-2 rounded-lg shadow-md flex items-center gap-2">
            <h3 class="uppercase font-semibold text-muted">{{ weeks }}:</h3>
            <p class="text-muted">{{ data.total_entry }}<sup>{{ data.total_stop }}</sup></p>
          </div>
        </section>
      </section>

      <!-- Bloc Pénalités Résumé -->
      <section class="bg-surface p-4 border-2 border-border rounded-lg shadow-lg h-[150px]">
        <div class="flex justify-between items-center mb-3">
          <h1 class="text-error font-bold text-xl">Pénalités</h1>
          <button class="hover:text-error transition-colors" @click="showpenality = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" />
            </svg>
          </button>
        </div>
        <section class="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-auto">
          <div v-for="(amount, weeks) in penalties_summaries" class="bg-surface text-sm p-2 rounded-lg shadow-md flex items-center gap-2">
            <h3 class="uppercase font-semibold text-muted">{{ weeks }}:</h3>
            <p class="text-muted">{{ amount }}</p>
          </div>
        </section>
      </section>

    </div>
    <!-- Sélecteur de mois -->
    <section class="my-6">
      <MonthSelector @update:month="monthChanged" class="p-4 bg-surface border-2 border-border rounded-lg shadow-lg" />
    </section>

    <!-- Détails des Statistiques et Pénalités -->
    <div class="w-full flex flex-col sm:flex-row sm:gap-4 space-y-4 sm:space-y-0">
      <div class="h-full w-full sm:w-1/2 p-4 bg-surface border-2 border-border rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-primary">Détail des statistiques</h2>
        <StatDisplay :stats="stats" :stores="stores" />
      </div>
      <div class="h-full w-full sm:w-1/2 p-4 bg-surface border-2 border-border rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-error">Détail des pénalités</h2>
        <PenaltyDisplay :penalties="penalties" :stores="stores" />
      </div>
    </div>

    <!-- Modales -->
    <OperatorEdit v-if="showopedit" :operator="operator" :stores="stores" @close="showopedit = false" @updated="reloadOp()" />
    <StatAdd v-if="showstatadd" :operatorid="operatorid" @created="getStats()" @close="showstatadd = false" />
    <PenaltyAdd v-if="showpenality" :operatorid="operatorid" @created="getPenalties()" @close="showpenality = false" />
  </div>
</template>

<!-- <style scoped>
*::-webkit-scrollbar {
  display: none; 
}
</style> -->
