<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { getTeamStats, getTeamPenalties, safeCall } from '@/api'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import TeamEdit from '@/components/admin/TeamEdit.vue'
import PenaltyDisplay from '@/components/admin/PenaltyDisplay.vue'
import StatDisplay from '@/components/admin/StatDisplay.vue'

const route = useRoute()
const stores = useAppStore()
const teamid = Number(route.params.id)
const team = stores.getTeamById(teamid)
const teamOperators = stores.getOperatorsByTeamId(teamid)
const operatorIds = teamOperators.map((op) => op.id)
const teamAccounts = stores.getAccountsByTeamId(teamid)

const stats = ref({})
const penalties = ref({})
const selectedMonth = ref(dayjs().format('YYYY-MM'))
const showedit = ref(false)

// Onglet actif pour les opérateurs, par défaut le premier
const activeOperatorId = ref(operatorIds[0] || teamOperators[0]?.id)

const monthChanged = async (month) => {
  selectedMonth.value = month
  const data = {
    team_id: teamid,
    date: selectedMonth.value,
  }

  const [res, err] = await safeCall(getTeamStats(data))
  if (err) {
    console.error('Error fetching stats:', err)
    return
  }
  stats.value = res

  const [penRes, penErr] = await safeCall(getTeamPenalties(data))
  if (penErr) {
    console.error('Error fetching penalties:', penErr)
    return
  }
  penalties.value = penRes
}

onMounted(async () => {
  await monthChanged(selectedMonth.value)
})
</script>

<template>
  <div class="w-full h-full flex flex-col py-1">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1 pb-1">
      <section
        class="col-span-2 p-2 flex gap-2 justify-between bg-surface rounded-lg border-2 border-border"
      >
        <h1 class="text-5xl text-primary">{{ team.name }}</h1>
        <button @click="showedit = true" class="active:text-primary hover:text-primary">
          <!-- icône d'édition -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
            />
          </svg>
        </button>
      </section>

      <!-- Onglets des opérateurs -->
      <section
        class="col-span-2 p-2 grid grid-cols-2 gap-1 border-2 border-border rounded-lg bg-surface"
      >
        <h2 class="col-span-2 text-xl font-bold text-primary">Opérateurs</h2>
        <div v-for="operator in teamOperators" :key="operator.id" class="flex gap-1 items-center">
          <RouterLink
            :to="{ name: 'operator-info', params: { id: operator.id } }"
            class="underline hover:text-primary"
          >
            {{ operator.fname }} <span class="hidden sm:inline">{{ operator.lname }}</span>
          </RouterLink>
          <button
            :class="[
              'px-3 py-1 rounded-xl text-sm font-medium transition-colors duration-200',
              'border-2',
              activeOperatorId === operator.id
                ? 'border-primary bg-primary text-white shadow-soft'
                : 'border-border text-muted hover:bg-surface hover:border-primary hover:text-primary-light',
            ]"
            @click="activeOperatorId = operator.id"
          >
            {{ operator.name }}
          </button>
        </div>
      </section>
      <MonthSelector
        :modelValue="selectedMonth"
        @update:month="monthChanged"
        class="col-span-2 md:col-span-4"
      />
    </div>
    <div
      class="h-full overflow-hidden flex-grow md:col-span-4 sm:flex sm:gap-1 space-y-1 sm:space-y-0"
    >
      <!-- Contenu onglet actif -->
      <section
        class="w-full sm:w-[50%] h-[50%] sm:h-full p-2 overflow-y-auto bg-surface border-2 border-border rounded-lg"
      >
        <h3 class="font-bold text-xl">
          Statistiques
          <span class="hidden sm:inline">
            de
            {{ stores.getOperatorById(activeOperatorId)?.fname }}
            {{ stores.getOperatorById(activeOperatorId)?.lname }}
          </span>
        </h3>
        <StatDisplay :stats="stats[activeOperatorId]" :stores="stores" />
      </section>

      <section
        class="w-full sm:w-[50%] h-[50%] sm:h-full overflow-y-auto p-2 bg-surface border-2 border-border rounded-lg"
      >
        <h3 class="font-semibold text-xl">
          Pénalités
          <span class="hidden sm:inline">
            de
            {{ stores.getOperatorById(activeOperatorId)?.fname }}
            {{ stores.getOperatorById(activeOperatorId)?.lname }}
          </span>
        </h3>
        <PenaltyDisplay :penalties="penalties[activeOperatorId]" :stores="stores" />
      </section>
    </div>
  </div>

  <TeamEdit v-if="showedit" :stores="stores" @close="showedit = false" />
</template>
