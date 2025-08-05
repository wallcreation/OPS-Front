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
  await updateStore(store)
})
</script>

<template>
  <div class="w-full p-3 md:p-20 text-gray-300 flex flex-col gap-8">
    <!-- Cartes des totaux -->
    <div class=" flex md:grid md:grid-cols-3 gap-2 ">
      <div
        class="bg-surface rounded-xl shadow-lg p-2 md:p-8 flex flex-col items-center justify-center border border-gray-700"
        aria-label="Total équipes"
      >
        <h2 class="text-4xl md:text-7xl font-extrabold text-primary">{{ data.teams.length }}</h2>
        <p class="mt-2 text-xl font-semibold text-gray-400 uppercase select-none">Équipes</p>
      </div>
      <div
        class="bg-surface rounded-xl shadow-lg p-2 md:p-8 flex flex-col items-center justify-center border border-gray-700"
        aria-label="Total opérateurs"
      >
        <h2 class="text-4xl md:text-7xl font-extrabold text-primary">{{ data.operators.length }}</h2>
        <p class="mt-2 text-xl font-semibold text-gray-400 uppercase select-none">Opérateurs</p>
      </div>
      <div
        class="bg-surface rounded-xl shadow-lg p-2 md:p-8 flex flex-col items-center justify-center border border-gray-700"
        aria-label="Total comptes"
      >
        <h2 class="text-4xl md:text-7xl font-extrabold text-primary">{{ data.accounts.length }}</h2>
        <p class="mt-2 text-xl font-semibold text-gray-400 uppercase select-none">Comptes</p>
      </div>
    </div>

    <!-- Listes scrollables verticales côte à côte -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Équipes -->
      <section
        class="bg-surface rounded-xl shadow-md p-6 flex flex-col flex-1 min-w-0 max-w-full"
      >
        <h3 class="text-xl font-semibold mb-4 text-gray-400 uppercase select-none">Équipes</h3>
        <nav
          class="flex flex-col gap-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-700"
        >
          <RouterLink
            v-for="team in data.teams"
            :key="team.id"
            :to="{ name: 'team-info', params: { id: team.id } }"
            class="block px-6 py-3 rounded-lg bg-[#1e1e1e] text-primary hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            {{ team.name }}
          </RouterLink>
        </nav>
      </section>

      <!-- Opérateurs -->
      <section
        class="bg-surface rounded-xl shadow-md p-6 flex flex-col flex-1 min-w-0 max-w-full"
      >
        <h3 class="text-xl font-semibold mb-4 text-gray-400 uppercase select-none">Opérateurs</h3>
        <nav
          class="flex flex-col gap-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-700"
        >
          <RouterLink
            v-for="operator in data.operators"
            :key="operator.id"
            :to="{ name: 'operator-info', params: { id: operator.id } }"
            class="block px-6 py-3 rounded-lg bg-[#1e1e1e] text-primary hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            {{ operator.fname }}
          </RouterLink>
        </nav>
      </section>

      <!-- Comptes -->
      <section
        class="bg-surface rounded-xl shadow-md p-6 flex flex-col flex-1 min-w-0 max-w-full"
      >
        <h3 class=" text-xl font-semibold mb-4 text-gray-400 uppercase select-none">Comptes</h3>
        <nav
          class="flex flex-col gap-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-700"
        >
          <RouterLink
            v-for="account in data.accounts"
            :key="account.id"
            :to="{ name: 'account-info', params: { id: account.id } }"
            class="block px-6 py-3 rounded-lg bg-[#1e1e1e] text-primary hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            {{ account.name }}
          </RouterLink>
        </nav>
      </section>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
