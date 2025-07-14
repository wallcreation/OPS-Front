<script setup>
// Importation des dépendances
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { getOperatorStats, getOperatorPenalties, safeCall } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import OperatorEdit from '@/components/admin/OperatorEdit.vue'
import PenaltyDisplay from '@/components/admin/PenaltyDisplay.vue'
import StatDisplay from '@/components/admin/StatDisplay.vue'

// Récupération des informations de la route et du store
const route = useRoute()
const stores = useAppStore()
const operatorid = route.params.id // ID de l'opérateur depuis l'URL
const operator = stores.getOperatorById(operatorid) // Données de l'opérateur
const team = stores.getTeamById(operator.team_id) // Données de l'équipe de l'opérateur

// Gestion des états réactifs
const stats = ref({}) // Stocke les statistiques récupérées
const penalties = ref({}) // Stocke les pénalités récupérées
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

  // Appel API sécurisé pour récupérer les pénalités
  const [penRes, penErr] = await safeCall(getOperatorPenalties(data))
  if (penErr) {
    console.error('Error fetching penalties:', penErr)
    return
  }
  penalties.value = penRes
}

// Etats pour la gestion des modales et du type de champ mot de passe
const passtype = ref('password') // Type du champ mot de passe (text/password)
const showopedit = ref(false) // Affichage du modal d'édition opérateur
const showstatadd = ref(false) // Affichage du modal d'ajout de stat
const showpenality = ref(false) // Affichage du modal d'ajout de pénalité

// Fonction pour ajouter une stat (ferme la modale)
const addStat = () => {
  console.log('Ajouter stat !')
  showstatadd.value = false
}

// Fonction pour ajouter une pénalité (ferme la modale)
const addPenality = () => {
  console.log('Ajouter stat !')
  showpenality.value = false
}

// Au montage du composant, on charge les stats du mois courant
onMounted(() => {
  monthChanged(selectedMonth.value)
})
</script>
<template>
  <!-- Grille principale de la page -->
  <div class="w-full h-full flex flex-col py-1">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1 pb-1">
      <!-- Espace utilisateur : infos, bouton édition, résumé stats/pénalités -->
      <div class="col-span-2 p-2 bg-surface border-2 border-border rounded-lg">
        <!-- Nom de l'utilisateur et bouton d'édition -->
        <section class="flex justify-between pb-1">
          <h1 class="text-5xl">{{ operator.fname }} {{ operator.lname }}</h1>
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
        <section class="flex gap-1 px-1">
          <p>{{ operator.email }}</p>
          <p class="text-primary">●</p>
          <RouterLink :to="{ name: 'team-info', params: { id: team.id } }" class="underline hover:text-primary-dark">
            {{ team.name }}
          </RouterLink>
        </section>
      </div>
      <!-- Bloc statistiques résumé -->
      <section class="grid grid-cols-3 bg-surface p-2 border-2 border-border rounded-lg">
        <h1 class="col-span-2 text-primary font-bold underline">Statistiques</h1>
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
        <!-- Résumé des stats (à compléter) -->
        <div class="col-span-3">Stat summary here Stat summary here</div>
      </section>
      <!-- Bloc pénalités résumé -->
      <section class="grid grid-cols-3 bg-surface p-2 border-2 border-border rounded-lg">
        <h1 class="col-span-2 text-error font-bold underline">Pénalités</h1>
        <!-- Bouton pour ouvrir la modale d'ajout de pénalité -->
        <button
          class="justify-self-end active:text-error hover:text-error"
          @click="showpenality = true"
        >
          <!-- Icône + -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
            />
          </svg>
        </button>
        <div class="col-span-3">Penalty summary here Stat summary here</div>
      </section>
      <div class="col-span-2 md:col-span-4">
        <MonthSelector @update:month="monthChanged" class="" />
      </div>
    </div>
    <div class="w-full flex-grow overflow-hidden sm:flex sm:gap-1 space-y-1 sm:space-y-0">
      <!-- Détail des statistiques -->
      <div
        class="h-[50%] sm:h-full w-full md:w-[50%] p-2 overflow-y-auto md:col-span-2 bg-surface border-2 border-border rounded-lg"
      >
        <h2 class="text-xl font-bold">
          <span class="hidden sm:inline">Détail des</span>
          Statistiques
        </h2>
        <!-- Affichage des stats par date -->
        <StatDisplay :stats="stats" :stores="stores" />
      </div>
      <!-- Bloc pour le diagramme (à compléter) -->
      <div
        class="h-[50%] sm:h-full w-full md:w-[50%] p-2 overflow-y-auto md:col-span-2 bg-surface border-2 border-border rounded-lg"
      >
        <h2 class="text-xl font-bold">Détail des Pénalités</h2>
        <PenaltyDisplay :penalties="penalties" :stores="stores" />
      </div>
    </div>
  </div>
  <!-- Operator Edit -->
  <OperatorEdit v-if="showopedit" :operator="operator" @close="showopedit = false" />
  <!-- Modale d'ajout de stat -->
  <div
    v-if="showstatadd"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <h2 class="text-xl font-bold text-text mb-4">Ajouter une stat</h2>
      <form class="grid gap-3">
        <!-- Champ montant -->
        <input
          type="number"
          placeholder="Montant"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <div class="flex justify-end gap-3 mt-2">
          <!-- Bouton pour ajouter la stat -->
          <button
            class="text-primary hover:border-b-2 hover:border-primary-light"
            @click.prevent="addStat"
          >
            Ajouter
          </button>
          <!-- Bouton pour fermer la modale -->
          <button
            class="text-error hover:border-b-2 hover:border-error"
            @click="showstatadd = false"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Modale d'ajout de pénalité -->
  <div
    v-if="showpenality"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <h2 class="text-xl font-bold text-text mb-4">Ajouter une pénalité</h2>
      <form class="grid gap-3">
        <!-- Champ raison -->
        <input
          type="text"
          placeholder="Raison"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <!-- Champ montant -->
        <input
          type="number"
          placeholder="Montant"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <div class="flex justify-end gap-3 mt-2">
          <!-- Bouton pour ajouter la pénalité -->
          <button
            class="text-primary hover:border-b-2 hover:border-primary-light"
            @click.prevent="addPenality"
          >
            Ajouter
          </button>
          <!-- Bouton pour fermer la modale -->
          <button
            class="text-error hover:border-b-2 hover:border-error"
            @click="showpenality = false"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
