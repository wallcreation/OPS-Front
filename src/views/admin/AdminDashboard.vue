<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { updateStore } from '@/api'
const store = useAppStore()
const data = ref({
  teams: computed(() => store.teams),
  operators: computed(() => store.operators),
  accounts: computed(() => store.accounts),
})

onMounted(async () => {
  updateStore(store)
})
</script>

<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
    <div class="md:col-span-2 flex flex-col bg-surface border-2 border-border rounded-xl">
      <div class="flex-grow flex flex-col items-center justify-center">
        <h1 class="text-primary text-5xl font-bold">{{ data.teams.length }}</h1>
        <p>Équipes</p>
      </div>
      <div class="w-full p-2 flex justify-center gap-1 overflow-hidden overflow-x-auto">
        <RouterLink
          v-for="team in data.teams"
          :key="team.id"
          :to="{ name: 'team-info', params: { id: team.id } }"
          class="p-1 text-nowrap border-2 border-border rounded-lg hover:border-primary hover:text-primary"
        >
          {{ team.name }}
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col bg-surface border-2 border-border rounded-xl">
      <div class="flex-grow flex flex-col items-center justify-center">
        <h1 class="text-primary text-5xl font-bold">{{ data.operators.length }}</h1>
        <p>Opérateurs</p>
      </div>
      <div class="w-full p-2 flex justify-center gap-1 overflow-hidden overflow-x-auto">
        <RouterLink
          v-for="operator in data.operators"
          :key="operator.id"
          :to="{ name: 'operator-info', params: { id:operator.id } }"
          class="p-1 text-nowrap border-2 border-border rounded-lg hover:border-primary hover:text-primary"
        >
          {{ operator.fname }}
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col bg-surface border-2 border-border rounded-xl">
      <div class="flex-grow flex flex-col items-center justify-center">
        <h1 class="text-primary text-5xl font-bold">{{ data.accounts.length }}</h1>
        <p>Comptes</p>
      </div>
      <div class="w-full p-2 flex justify-center gap-1 overflow-hidden overflow-x-auto">
        <RouterLink
          v-for="account in data.accounts"
          :key="account.id"
          :to="{ name: 'account-info', params: { id: account.id} }"
          class="p-1 text-nowrap border-2 border-border rounded-lg hover:border-primary hover:text-primary"
        >
          {{ account.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
*::-webkit-scrollbar {
  display: none; /* Hides the scrollbar */
}
</style>
