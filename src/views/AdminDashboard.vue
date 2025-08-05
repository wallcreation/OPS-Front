<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getdashboard, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import TeamAdd from '@/components/admin/TeamAdd.vue'
const store = useAppStore()
const data = ref({
  teams: computed(() => store.teams),
  operators: computed(() => store.operators),
  accounts: computed(() => store.accounts),
})
const loading = ref(false)
const error = ref(false)
const reload = ref(false)
const showTeamAdd = ref(false)
const showOperatorAdd = ref(false)
const showAccountAdd = ref(false)
const isDarkMode = ref(false)

// Détection du mode système
// const systemDarkMode = computed(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

// Appliquer le mode sombre en fonction du système
// watch(systemDarkMode, (newVal) => {
//   isDarkMode.value = newVal
// })

// const toggleDarkMode = () => {
//   isDarkMode.value = !isDarkMode.value
//   // Sauvegarder dans le localStorage
//   localStorage.setItem('darkMode', isDarkMode.value.toString())
// }

// Charger le mode sombre sauvegardé
// onMounted(() => {
//   const savedDarkMode = localStorage.getItem('darkMode')
//   if (savedDarkMode !== null) {
//     isDarkMode.value = JSON.parse(savedDarkMode)
//   } else {
//     isDarkMode.value = systemDarkMode.value
//   }
// })

const foo = async () => {
  reload.value = false
  const [res, err] = await safeCall(getdashboard())
  if (err) {
    console.log('err: ', err)
    if (err.code === 1003) {
      error.value = true
    } else {
      reload.value = true
    }
  } else {
    // Mise à jour du store Pinia
    store.setTeams(res.teams)
    store.setOperators(res.operators)
    store.setAccounts(res.accounts)

    loading.value = false
  }
}

onMounted(async () => {
  // await foo()
})
</script>

<template>
  <div class="min-h-screen w-full px-40 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Toggle Dark Mode -->
    <div class="fixed top-4 right-4">
      <!-- <button 
        @click="toggleDarkMode" 
        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      >
        <svg v-if="isDarkMode" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 1.536l-.105-.105A5.5 5.5 0 0018 10.5H12v-2a2 2 0 00-2-2 1 1 0 00-1-1H6a2 2 0 00-2 2v2h1a1 1 0 001 1 3.5 3.5 0 003.5 3.5z"/>
        </svg>
        <svg v-else class="w-6 h-6 text-gray-600 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </button> -->
    </div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold pt-10 text-gray-900 dark:text-gray-100">Tableau de bord administrateur</h1>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Teams Card -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700 cursor-pointer"
            @click="showTeamAdd = true">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <h3 class="ml-3 text-lg font-medium text-gray-900 dark:text-gray-100">Équipes</h3>
          </div>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ data.teams.length }}</div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">Gérer vos équipes</p>
        </div>
      </div>

      <!-- Operators Card -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <h3 class="ml-3 text-lg font-medium text-gray-900 dark:text-gray-100">Opérateurs</h3>
          </div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ data.operators.length }}</div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">Gérer vos opérateurs</p>
        </div>
      </div>

      <!-- Accounts Card -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <h3 class="ml-3 text-lg font-medium text-gray-900 dark:text-gray-100">Comptes</h3>
          </div>
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ data.accounts.length }}</div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">Gérer vos comptes</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 px-4 py-3 rounded relative mt-4"
         role="alert">
      <strong class="font-bold">Erreur !</strong>
      <span class="block sm:inline">Une erreur est survenue lors du chargement des données.</span>
    </div>

    <!-- Add team modal -->
    <TeamAdd v-if="showTeamAdd" @created="teamAdd" @close="showTeamAdd = false" />
  </div>
</template>
