<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const data = ref({
  teams: computed(() => store.teams),
  operators: computed(() => store.operators),
  accounts: computed(() => store.accounts),
})

// Toutes les cartes possibles
const cards = [
  {
    key: 'teams',
    label: 'Équipes',
    value: () => data.value.teams.length,
  },
  {
    key: 'operators',
    label: 'Opérateurs',
    value: () => data.value.operators.length,
  },
  {
    key: 'accounts',
    label: 'Comptes',
    value: () => data.value.accounts.length,
  },
]

// Mélange aléatoire
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

const randomizedCards = ref([])
const gridConfig = ref([])

onMounted(() => {
  // Mélange les cartes
  randomizedCards.value = shuffle([...cards])

  // Applique des configurations aléatoires de classes Tailwind
  const styles = [
    'col-span-1 row-span-1',
    'col-span-2 md:col-span-1 row-span-1',
    'md:col-span-2 row-span-1',
    'md:col-span-1 row-span-2',
  ]
  gridConfig.value = shuffle(styles).slice(0, 3)
})
</script>

<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
    <div
      v-for="(card, index) in randomizedCards"
      :key="card.key"
      :class="`flex items-center justify-center p-4 bg-surface border-2 border-border rounded-2xl shadow-soft hover:shadow-deep transition-all duration-500 ease-in-out ${gridConfig[index]}`"
    >
      <div class="text-center animate-fade-in">
        <h1 class="text-primary text-5xl font-bold">
          {{ card.value() }}
        </h1>
        <p class="text-muted text-lg">{{ card.label }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
