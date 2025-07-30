<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useOperatorStore } from '@/stores/operator'
import { safeCall, getOpsStats, getOpsPenalties } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import StatDisplay from '@/components/ops/StatDisplay.vue'
import PenaltyDisplay from '@/components/ops/PenaltyDisplay.vue'
import WorkAt from '@/components/utils/WorkAt.vue'

const sessionStore = useSessionStore()
const stores = useOperatorStore()
const selectedMonth = ref(dayjs().format('YYYY-MM'))
const profile = sessionStore.user
const statsres = ref({})
const statssum = ref({})
const penaltiesres = ref({})
const penaltiessum = ref({})
const monthChanged = async (month) => {
  console.log('month: ', month)
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

onMounted(async () => {
  await monthChanged(selectedMonth.value)
  await stores.fetchAllAccounts()
})
</script>
<template>
  <div class="w-full h-full flex flex-col py-1">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-1 pb-1">
      <section class="md:col-span-2 p-2 bg-surface rounded-lg border-2 border-border">
        <h1 class="text-5xl text-primary">{{ profile.lname }} {{ profile.fname }}</h1>
        <div class="flex gap-1">
          <p>{{ profile.email }}</p>
          <p class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.2" />
                <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
              </g>
            </svg>
          </p>
          <p>{{ profile.team_name }}</p>
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
        </div>
      </section>
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
      <section class="bg-surface p-2 border-2 border-border rounded-lg">
        <div class="flex justify-between mb-1">
          <h1 class="text-error font-bold underline">Pénalités</h1>
        </div>
        <div class="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-auto gap-1">
          <div v-for="(amount, weeks) in penaltiessum" class="bg-surface flex gap-1 text-sm">
            <h3 class="uppercase font-bold">{{ weeks }}:</h3>
            <p>
              {{ amount }}
            </p>
          </div>
        </div>
      </section>
      <section class="md:col-span-2 p-2 bg-surface rounded-lg border-2 border-border">
        Stats en cours
      </section>
      <div class="md:col-span-2">
        <MonthSelector @update:month="monthChanged" />
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
</template>
