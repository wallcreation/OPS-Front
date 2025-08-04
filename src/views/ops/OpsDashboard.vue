<script setup>
import dayjs from 'dayjs'
import { computed, onMounted, ref,  } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useOperatorStore } from '@/stores/operator'
import { safeCall, getOpsStats, getOpsPenalties, operatorMe } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import StatDisplay from '@/components/ops/StatDisplay.vue'
import PenaltyDisplay from '@/components/ops/PenaltyDisplay.vue'
import WorkAt from '@/components/utils/WorkAt.vue'
import { useNotificationStore } from '@/stores/notification'
import { deleteOpsCurrentStat } from '@/api'
const notification = useNotificationStore()
const sessionStore = useSessionStore()
const stores = useOperatorStore()
const selectedMonth = ref(dayjs().format('YYYY-MM'))
const profile = computed(() => sessionStore.user)
const statsres = ref({})
const statssum = ref({})
const penaltiesres = ref({})
const penaltiessum = ref({})
const currentStatSelected = ref(null)

// Functions
async function monthChanged(month) {
  notification.notify('Chargement des données', 'info')
  selectedMonth.value = month
  const data = {
    date: selectedMonth.value,
  }
  // Appel API sécurisé pour récupérer les stats
  const [res, err] = await safeCall(getOpsStats(data))
  if (err) {
    console.error('Error fetching stats:', err)
    return
  }
  statsres.value = res.stats
  statssum.value = res.summary
  const [penRes, penErr] = await safeCall(getOpsPenalties(data))
  if (penErr) {
    console.error('Error fetching penalties:', penErr)
    return
  }
  penaltiesres.value = penRes.penalties
  penaltiessum.value = penRes.summary
}

async function me() {
  const [res, err] = await safeCall(operatorMe())
  if (err) {
    console.error('Error fetching me:', err)
    return
  }
  sessionStore.user.value = res
}

async function selectCurrentStat(accountId) {
  currentStatSelected.value = accountId
}

async function deleteCurrentStat() {
  const [res, err] = await safeCall(deleteOpsCurrentStat(currentStatSelected.value))
  if (err) {
    console.error('Error deleting stat:', err)
    return
  }
  notification.notify('Stat supprimé.', 'success')
  currentStatSelected.value = null
  await me()
}
onMounted(async () => {
  await me()
  await monthChanged(selectedMonth.value)
  await stores.fetchAllAccounts()
})
</script>
<template>
  <div class="w-full h-full flex flex-col py-1">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1 pb-1">
      <section class="col-span-2 p-2 bg-surface rounded-lg border-2 border-border">
        <h1 class="text-5xl text-primary">
          {{ profile.lname }}
          <span class="hidden sm:inline">{{ profile.fname }}</span>
        </h1>
        <div class="w-full px-1 flex gap-1 items-center overflow-hidden overflow-x-auto">
          <p>{{ profile.email }}</p>
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p class="text-nowrap">{{ profile.team_name }}</p>
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <WorkAt :work_at="profile.work_at" />
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p>{{ profile.code }}</p>
          <p v-if="profile.is_locked" class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p v-if="profile.is_locked" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M18 14c.69 0 1.25.56 1.25 1.25V16h-2.5v-.75c0-.69.56-1.25 1.25-1.25m3.25 2v-.75a3.25 3.25 0 0 0-6.5 0V16h-1.251v6.5h9V16zm-9.75 6H2v-2a6 6 0 0 1 6-6h3.5z"
              />
            </svg>
          </p>
        </div>
      </section>
      <div class="col-span-2 grid grid-cols-2 gap-1">
        <section class="bg-surface p-2 border-2 border-border rounded-lg">
          <div class="flex justify-between mb-1">
            <h1 class="text-primary font-bold underline">Statistiques</h1>
          </div>
          <!-- Résumé des stats (à compléter) -->
          <section class="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-auto gap-1">
            <div v-for="(data, weeks) in statssum" class="bg-surface flex gap-1 text-sm">
              <h3 class="uppercase font-bold">{{ weeks }}:</h3>
              <p class="text-nowrap">
                {{ data.total_entry }}
                <sup>{{ data.total_stop }}</sup>
              </p>
            </div>
          </section>
        </section>
        <section class="bg-surface p-2 border-2 border-border rounded-lg overflow-hidden">
          <div class="flex justify-between mb-1">
            <h1 class="text-error font-bold underline">Pénalités</h1>
          </div>
          <div class="flex flex-nowrap sm:flex-wrap sm:overflow-auto gap-1 overflow-x-auto">
            <div v-for="(amount, weeks) in penaltiessum" class="bg-surface flex gap-1 text-sm">
              <h3 class="uppercase font-bold">{{ weeks }}:</h3>
              <p>
                {{ amount }}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div class="col-span-2 md:col-span-4 grid grid-cols-2 gap-1">
        <section class="bg-surface rounded-lg border-2 border-border p-1">
          <div
            v-if="Object.keys(profile.current_stat || {}).length > 0"
            class="w-full h-full flex items-center justify-center gap-2"
          >
            <div
              v-for="(stats, accountId) in profile.current_stat"
              :key="accountId"
              @click="selectCurrentStat(accountId)"
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
        <div class="">
          <MonthSelector @update:month="monthChanged" />
        </div>
      </div>
    </div>
    <div class="w-full flex-grow overflow-hidden sm:flex sm:gap-1 space-y-1 sm:space-y-0">
      <div
        class="h-[50%] sm:h-full w-full md:w-[50%] p-2 overflow-y-auto md:col-span-2 bg-surface border-2 border-border rounded-lg"
      >
        <h2 class="text-xl font-bold">
          <span class="hidden sm:inline">Détail des </span>
          <span class="capitalize md:lowercase">statistiques</span>
        </h2>
        <!-- Affichage des stats par date -->
        <StatDisplay :stats="statsres" :stores="stores" />
      </div>
      <div
        class="h-[50%] sm:h-full w-full md:w-[50%] p-2 overflow-y-auto md:col-span-2 bg-surface border-2 border-border rounded-lg"
      >
        <h2 class="text-xl font-bold">
          <span class="hidden sm:inline">Détail des </span>
          <span class="capitalize md:lowercase">pénalités</span>
        </h2>
        <PenaltyDisplay :penalties="penaltiesres" :stores="stores" />
      </div>
    </div>
  </div>
  <!-- Display selected current stat with a button to delete it -->
  <div
    v-if="currentStatSelected"
    class="fixed inset-0 backdrop-blur-md flex flex-col items-center justify-center z-50"
  >
    <div class="bg-surface p-2 border-2 border-primary rounded-lg">
      <div class="flex items-center justify-between w-full">
        <h2 class="text-primary text-xl font-bold">Statistiques en cours</h2>
        <button @click="currentStatSelected = null" class="text-error hover:text-error-dark text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
            />
          </svg>
        </button>
      </div>
      <div class="m-2 grid grid-cols-1 sm:grid-cols-2 gap-1 items-center">
        <p>
          Compte :
          <span class="font-semibold">
            {{ stores.getAccountById(currentStatSelected)?.name }}
          </span>
        </p>
        <p>
          Débuté le :
          <span class="font-semibold">
            {{ new Date(profile.current_stat[currentStatSelected].created_at).toLocaleString() }}
          </span>
        </p>
        <p>
          Entrant :
          <span class="font-semibold">
            {{ profile.current_stat[currentStatSelected].entry_start }}
          </span>
        </p>
        <p>
          Stop :
          <span class="font-semibold">
            {{ profile.current_stat[currentStatSelected].stop_start }}
          </span>
        </p>
        <button @click="deleteCurrentStat" class="sm:col-span-2 px-2 py-1 border-2 border-error rounded-lg hover:bg-error-dark hover:border-error-dark">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
*::-webkit-scrollbar {
  display: none;
}
</style>
