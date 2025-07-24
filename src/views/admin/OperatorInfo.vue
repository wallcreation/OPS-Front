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
const stats_summaries = ref({})
const penalties = ref({}) // Stocke les pénalités récupérées
const penalties_summaries = ref({})
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
  if (err) {
    console.error('Error fetching stats:', err)
    return
  }
  stats.value = res.stats
  stats_summaries.value = res.summary

  // Appel API sécurisé pour récupérer les pénalités
  const [penRes, penErr] = await safeCall(getOperatorPenalties(data))
  if (penErr) {
    console.error('Error fetching penalties:', penErr)
    return
  }
  penalties.value = penRes.penalties
  penalties_summaries.value = penRes.summary
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
        <section class="flex items-center px-1">
          <p class="hidden md:inline">{{ operator.email }}</p>
          <p class="hidden md:inline text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <RouterLink
            :to="{ name: 'team-info', params: { id: team.id } }"
            class="underline hover:text-primary-dark"
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
          <p class="flex">
            <svg
              v-if="operator.work_at === 'Jour'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <defs>
                <linearGradient
                  id="meteoconsHazeDayFill0"
                  x1="17.3"
                  x2="89.3"
                  y1="43.1"
                  y2="167.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#d4d7dd" />
                  <stop offset=".5" stop-color="#d4d7dd" />
                  <stop offset="1" stop-color="#bec1c6" />
                </linearGradient>
                <linearGradient
                  id="meteoconsHazeDayFill1"
                  x1="107.3"
                  x2="179.3"
                  y1="-8.8"
                  y2="115.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill2"
                  x1="174.8"
                  x2="246.8"
                  y1="-47.8"
                  y2="76.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill3"
                  x2="89.3"
                  y1="-4.9"
                  y2="119.8"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill4"
                  x1="107.3"
                  x2="179.3"
                  y1="-56.9"
                  y2="67.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill5"
                  x1="174.8"
                  x2="246.8"
                  y1="-95.8"
                  y2="28.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill6"
                  x1="150"
                  x2="234"
                  y1="119.2"
                  y2="264.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#fbbf24" />
                  <stop offset=".5" stop-color="#fbbf24" />
                  <stop offset="1" stop-color="#f59e0b" />
                </linearGradient>
                <symbol id="meteoconsHazeDayFill7" viewBox="0 0 384 384">
                  <circle
                    cx="192"
                    cy="192"
                    r="84"
                    fill="url(#meteoconsHazeDayFill6)"
                    stroke="#f8af18"
                    stroke-miterlimit="10"
                    stroke-width="6"
                  />
                  <path
                    fill="none"
                    stroke="#fbbf24"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="24"
                    d="M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7"
                  >
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 192 192; 45 192 192"
                    />
                  </path>
                </symbol>
                <symbol id="meteoconsHazeDayFill8" viewBox="0 0 264 72">
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill0)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 60h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill1)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 60h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill2)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 60h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="-24 0; 24 0; -24 0"
                    />
                  </g>
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill3)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 12h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill4)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 12h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill5)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 12h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="24 0; -24 0; 24 0"
                    />
                  </g>
                </symbol>
                <clipPath id="meteoconsHazeDayFill9">
                  <path fill="none" d="M0 0h512v306H0z" />
                </clipPath>
              </defs>
              <g clip-path="url(#meteoconsHazeDayFill9)">
                <use
                  width="384"
                  height="384"
                  href="#meteoconsHazeDayFill7"
                  transform="translate(64 100)"
                />
              </g>
              <use
                width="264"
                height="72"
                href="#meteoconsHazeDayFill8"
                transform="translate(124 336)"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <defs>
                <linearGradient
                  id="meteoconsHazeNightFill0"
                  x1="17.3"
                  x2="89.3"
                  y1="43.1"
                  y2="167.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#d4d7dd" />
                  <stop offset=".5" stop-color="#d4d7dd" />
                  <stop offset="1" stop-color="#bec1c6" />
                </linearGradient>
                <linearGradient
                  id="meteoconsHazeNightFill1"
                  x1="107.3"
                  x2="179.3"
                  y1="-8.8"
                  y2="115.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill2"
                  x1="174.8"
                  x2="246.8"
                  y1="-47.8"
                  y2="76.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill3"
                  x2="89.3"
                  y1="-4.9"
                  y2="119.8"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill4"
                  x1="107.3"
                  x2="179.3"
                  y1="-56.9"
                  y2="67.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill5"
                  x1="174.8"
                  x2="246.8"
                  y1="-95.8"
                  y2="28.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill6"
                  x1="54.3"
                  x2="187.2"
                  y1="29"
                  y2="259.1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#86c3db" />
                  <stop offset=".5" stop-color="#86c3db" />
                  <stop offset="1" stop-color="#5eafcf" />
                </linearGradient>
                <symbol id="meteoconsHazeNightFill7" viewBox="0 0 270 270">
                  <path
                    fill="url(#meteoconsHazeNightFill6)"
                    stroke="#72b9d5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="6"
                    d="M252.3 168.6A133.4 133.4 0 0 1 118 36.2A130.5 130.5 0 0 1 122.5 3A133 133 0 0 0 3 134.6C3 207.7 63 267 137.2 267c62.5 0 114.8-42.2 129.8-99.2a135.6 135.6 0 0 1-14.8.8Z"
                  >
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="-15 135 135; 9 135 135; -15 135 135"
                    />
                  </path>
                </symbol>
                <symbol id="meteoconsHazeNightFill8" viewBox="0 0 264 72">
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill0)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 60h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill1)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 60h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill2)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 60h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="-24 0; 24 0; -24 0"
                    />
                  </g>
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill3)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 12h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill4)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 12h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill5)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 12h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="24 0; -24 0; 24 0"
                    />
                  </g>
                </symbol>
                <clipPath id="meteoconsHazeNightFill9">
                  <path fill="none" d="M0 0h512v306H0z" />
                </clipPath>
              </defs>
              <g clip-path="url(#meteoconsHazeNightFill9)">
                <use
                  width="270"
                  height="270"
                  href="#meteoconsHazeNightFill7"
                  transform="translate(121 121)"
                />
              </g>
              <use
                width="264"
                height="72"
                href="#meteoconsHazeNightFill8"
                transform="translate(124 336)"
              />
            </svg>
          </p>
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p>{{ operator.code }}</p>
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
            <p class="text-nowrap">
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
            <p>
              {{ amount }}
            </p>
          </div>
        </div>
      </section>
      <div class="hidden md:inline md:col-span-2 bg-surface border-2 border-border rounded-xl text-center">
        Stats en cours
      </div>
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
  />
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
