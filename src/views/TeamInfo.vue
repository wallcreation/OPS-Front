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
const operatorIds = teamOperators.map(op => op.id)
const teamAccounts = stores.getAccountsByTeamId(teamid)

const stats = ref({})
const penalties = ref({})
const selectedMonth = ref(dayjs().format('YYYY-MM'))
const showedit = ref(false)

// Onglet actif pour les opérateurs, par défaut le premier
const activeOperatorId = ref(operatorIds[0] || null)

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
  <div class="w-full h-full py-1">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1 pb-1">
      <section class="md:col-span-2 p-2 flex gap-2 justify-between bg-surface rounded-lg border-2 border-border">
        <h1 class="text-5xl text-primary">{{ team.name }}</h1>
        <button @click="showedit = true" class="active:text-primary hover:text-primary">
          <!-- icône d'édition -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" />
          </svg>
        </button>
      </section>
      <section class="p-2 bg-surface rounded-lg border-2 border-border">
        <h2 class="text-primary font-bold underline">Opérateurs</h2>
        <div class="flex flex-wrap gap-1">
          <p v-for="operator in teamOperators" :key="operator.id">
            {{ operator.fname }} {{ operator.lname }}
          </p>
        </div>
      </section>
      <section class="p-2 bg-surface rounded-lg border-2 border-border">
        <h2 class="text-primary font-bold underline">Comptes</h2>
        <div class="flex flex-wrap gap-1">
          <p v-for="account in teamAccounts" :key="account.id">
            {{ account.name }}
          </p>
        </div>
      </section>
      <MonthSelector :modelValue="selectedMonth" @update:month="monthChanged" />
    </div>
    <section class="md:col-span-4 p-2 bg-surface border-2 border-border rounded-lg">

      <!-- Onglets des opérateurs -->
      <div class="flex gap-2 mt-4 border-b border-border">
        <button
          v-for="operator in teamOperators"
          :key="operator.id"
          @click="activeOperatorId = operator.id"
          :class="[
            'px-3 py-1 rounded-t-lg',
            activeOperatorId === operator.id ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-surface-light'
          ]"
        >
          {{ operator.fname }} {{ operator.lname }}
        </button>
      </div>

      <!-- Contenu onglet actif -->
      <div class="mt-1">
        <h3 class="text-primary font-semibold mb-2">
          Statistiques de {{ stores.getOperatorById(activeOperatorId)?.fname }} {{ stores.getOperatorById(activeOperatorId)?.lname }}
        </h3>
        <StatDisplay :stats="stats[activeOperatorId]" :stores="stores" />

        <h3 class="text-primary font-semibold mt-6 mb-2">
          Pénalités de {{ stores.getOperatorById(activeOperatorId)?.fname }} {{ stores.getOperatorById(activeOperatorId)?.lname }}
        </h3>
        <PenaltyDisplay :penalties="penalties[activeOperatorId]" :stores="stores" />
      </div>
    </section>
  </div>

  <TeamEdit :showModal="showedit" @close="showedit = false" />
</template>
