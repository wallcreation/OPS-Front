<script setup>
// Importation des dépendances
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
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

// Récupération des informations de la route et du store
const route = useRoute()
const stores = useAppStore()
const operatorid = route.params.id // ID de l'opérateur depuis l'URL
const operator = stores.getOperatorById(operatorid) // Données de l'opérateur
const team = stores.getTeamById(operator.team_id) // Données de l'équipe de l'opérateur

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
  const [ops, err2] = await safeCall(getOperators())
  if (ops) stores.setOperators(ops)
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
  <!-- Grille principale de la page -->
  <div class="w-full h-full flex flex-col py-1">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1 pb-1">
      <!-- Espace utilisateur : infos, bouton édition, résumé stats/pénalités -->
      <div id="uinfo" class="col-span-2 p-2 bg-surface border border-border rounded-lg">
        <!-- Nom de l'utilisateur et bouton d'édition -->
        <section class="flex justify-between pb-1">
          <h1 class="text-5xl text-primary">{{ operator.fname }} {{ operator.lname }}</h1>
          <!-- Bouton pour ouvrir la modale d'édition -->
          <button class="active:text-primary hover:text-primary" @click="showopedit = true">
            <!-- Icône crayon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </svg>
          </button>
        </section>
        <!-- Email et équipe -->
        <section class="flex items-center px-1 w-full overflow-hidden overflow-x-auto">
          <p class="">{{ operator.email }}</p>
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <RouterLink
            :to="{ name: 'team-info', params: { id: team.id } }"
            class="text-nowrap underline hover:text-primary-dark"
          >
            {{ team.name }}
          </RouterLink>
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <WorkAt :work_at="operator.work_at" />
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p>{{ operator.code }}</p>
          <p v-if="operator.is_locked" class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p v-if="operator.is_locked" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M18 14c.69 0 1.25.56 1.25 1.25V16h-2.5v-.75c0-.69.56-1.25 1.25-1.25m3.25 2v-.75a3.25 3.25 0 0 0-6.5 0V16h-1.251v6.5h9V16zm-9.75 6H2v-2a6 6 0 0 1 6-6h3.5z"
              />
            </svg>
          </p>
        </section>
      </div>
      <!-- Bloc statistiques résumé -->
      <section class="bg-surface p-2 border-2 border-border rounded-lg">
        <div class="flex justify-between mb-1">
          <h1 class="text-primary font-bold underline">Statistiques</h1>
          <!-- Bouton pour ouvrir la modale d'ajout de stat -->
          <button
            class="justify-self-end active:text-primary hover:text-primary"
            @click="showstatadd = true"
          >
            <!-- Icône + -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
              />
            </svg>
          </button>
        </div>
        <!-- Résumé des stats (à compléter) -->
        <section class="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-auto gap-1">
          <div v-for="(data, weeks) in stats_summaries" class="bg-surface flex gap-1 text-sm">
            <h3 class="uppercase font-bold">{{ weeks }}:</h3>
            <p class="text-nowrap text-muted">
              {{ data.total_entry }}
              <sup>{{ data.total_stop }}</sup>
            </p>
          </div>
        </section>
      </section>
      <!-- Bloc pénalités résumé -->
      <section class="bg-surface p-2 border-2 border-border rounded-lg">
        <div class="flex justify-between mb-1">
          <h1 class="text-error font-bold underline">Pénalités</h1>
          <!-- Bouton pour ouvrir la modale d'ajout de pénalité -->
          <button class="active:text-error hover:text-error" @click="showpenality = true">
            <!-- Icône + -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-auto gap-1">
          <div v-for="(amount, weeks) in penalties_summaries" class="bg-surface flex gap-1 text-sm">
            <h3 class="uppercase font-bold">{{ weeks }}:</h3>
            <p class="text-muted">
              {{ amount }}
            </p>
          </div>
        </div>
      </section>
      <section class="hidden md:inline md:col-span-2 bg-surface border-2 border-border rounded-xl">
        <div
          v-if="Object.keys(operator.current_stat || {}).length > 0"
          class="w-full h-full flex items-center justify-center gap-2"
        >
          <div
            v-for="(stats, accountId) in operator.current_stat"
            :key="accountId"
            class="px-2 py-1 flex gap-1 items-center bg-primary/20 rounded-lg"
          >
            <RouterLink
              :to="{ name: 'account-info', params: { id: accountId } }"
              class="font-bold underline"
            >
              {{ stores.getAccountById(accountId)?.name }}:
            </RouterLink>
            <p>{{ stats.entry_start }}</p>
            <sup>{{ stats.stop_start }}</sup>
          </div>
        </div>
        <div v-else class="w-full h-full flex items-center justify-center">
          <p class="px-2 py-1 bg-warning-dark/50 rounded-lg">Aucune stats en cours.</p>
        </div>
      </section>
      <div class="col-span-2">
        <MonthSelector @update:month="monthChanged" class="" />
      </div>
    </div>
    <div class="w-full flex-grow overflow-hidden sm:flex sm:gap-1 space-y-1 sm:space-y-0">
      <!-- Détail des statistiques -->
      <div
        class="h-[50%] sm:h-full w-full md:w-[50%] p-2 overflow-y-auto md:col-span-2 bg-surface border-2 border-border rounded-lg"
      >
        <h2 class="text-xl font-bold">
          <span class="hidden sm:inline">Détail des </span>
          <span class="capitalize md:lowercase">statistiques</span>
        </h2>
        <!-- Affichage des stats par date -->
        <StatDisplay :stats="stats" :stores="stores" />
      </div>
      <!-- Bloc pour le diagramme (à compléter) -->
      <div
        class="h-[50%] sm:h-full w-full md:w-[50%] p-2 overflow-y-auto md:col-span-2 bg-surface border-2 border-border rounded-lg"
      >
        <h2 class="text-xl font-bold">
          <span class="hidden sm:inline">Détail des </span>
          <span class="capitalize md:lowercase">pénalités</span>
        </h2>
        <PenaltyDisplay :penalties="penalties" :stores="stores" />
      </div>
    </div>
  </div>
  <!-- Operator Edit -->
  <OperatorEdit
    v-if="showopedit"
    :operator="operator"
    :stores="stores"
    @close="showopedit = false"
    @updated="reloadOp()"
  />
  <!-- Modale d'ajout de stat -->
  <StatAdd
    v-if="showstatadd"
    :operatorid="operatorid"
    @created="
      getStats({
        operator_id: operatorid,
        date: selectedMonth,
      })
    "
    @close="showstatadd = false"
  />
  <!-- Modale d'ajout de pénalité -->
  <PenaltyAdd
    v-if="showpenality"
    :operatorid="operatorid"
    @created="
      getPenalties({
        operator_id: operatorid,
        date: selectedMonth,
      })
    "
    @close="showpenality = false"
  />

  
</template>
<style scoped>
*::-webkit-scrollbar {
  display: none; /* Hides the scrollbar */
}
</style>
