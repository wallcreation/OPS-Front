<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import OperatorAdd from '@/components/admin/OperatorAdd.vue'
import OperatorCard from '@/components/admin/OperatorCard.vue'
const loading = ref(false)
const stores = useAppStore()
const operators = computed(() => stores.operators)
const showOperatorAdd = ref(false)

</script>
<template>
  <div class="w-full h-full p-1 flex flex-col">
    <div
      class="p-2 flex justify-between items-center border-1 border-border bg-surface rounded-lg"
    >
      <h1 class="text-xl font-bold text-primary">Liste des opérateurs</h1>
      <button
        @click="showOperatorAdd = true"
        class="p-1 flex gap-1 items-center hover:text-primary hover:border-2 hover:rounded-lg hover:border-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28">
          <path
            fill="currentColor"
            d="M15.114 25.719A7.48 7.48 0 0 1 13 20.5c0-1.688.558-3.247 1.5-4.5H5a3 3 0 0 0-3 3v.715C2 23.433 6.21 26 12 26a17 17 0 0 0 3.114-.281M18 8A6 6 0 1 0 6 8a6 6 0 0 0 12 0m2.5 19a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13m0-11a.5.5 0 0 1 .5.5V20h3.5a.5.5 0 0 1 0 1H21v3.5a.5.5 0 0 1-1 0V21h-3.5a.5.5 0 0 1 0-1H20v-3.5a.5.5 0 0 1 .5-.5"
          />
        </svg>
        <span class="hidden sm:inline">Ajouter</span>
      </button>
    </div>
    <div v-if="loading" class="flex-grow p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des opérateurs...</p>
    </div>
    <div
      v-else
      class="flex-grow p-2 grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-auto"
    >
      <OperatorCard
        v-for="operator in operators"
        :key="operator.id"
        :id="operator.id"
        :lname="operator.lname"
        :fname="operator.fname"
        :team="stores.getTeamById(operator.team_id).name"
        :team_id="operator.team_id"
        :work_at="operator.work_at"
        :code="operator.code"
      />
    </div>
  </div>
  <OperatorAdd v-if="showOperatorAdd" @close="showOperatorAdd = false" />
</template>
