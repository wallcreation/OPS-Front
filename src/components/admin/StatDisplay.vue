<script setup>
import { ref } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
  stores: {
    type: Object,
    required: true,
  },
})

const showModal = ref(false)
const selectedStat = ref(null)
const selectedDate = ref('')

function openModal(stat, date) {
  selectedStat.value = stat
  selectedDate.value = date
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedStat.value = null
}
</script>

<template>
  <div v-if="stats" class="space-y-3">
    <div v-for="(stat, date) in stats" :key="date">
      <h2 class="text-xl font-semibold text-primary mb-1">
        {{ new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' }) }}
      </h2>

      <div class="grid md:grid-cols-2 gap-2 mb-1">
        <div
          v-for="item in stat"
          :key="item.account_id"
          class="bg-surface border border-border rounded-lg p-2 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <p class="text-text">
              {{ stores.getAccountById(item.account_id).name }}
            </p>
            <button
              class="text-primary hover:text-primary-dark"
              @click="openModal(item, date)"
              title="Voir les détails"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M11 8a1 1 0 0 0 1 1h.008a1 1 0 1 0 0-2H12a1 1 0 0 0-1 1m1 9a1 1 0 0 0 1-1v-5a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="md:flex md:gap-2">
            <p class="flex items-center gap-0.5 text-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5M19 16v6m3-3l-3 3l-3-3"
                  />
                  <path d="m3 7l9 6l9-6" />
                </g>
              </svg>
              Entrant:
              <span class="font-semibold text-primary">{{ item.entry_total }}</span>
            </p>
            <p class="flex items-center gap-0.5 text-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M13.5 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
                  <path d="m3 7l9 6l9-6m1 15l-5-5m0 5l5-5" />
                </g>
              </svg>
              Stop:
              <span class="font-semibold">{{ item.stop_total }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-muted text-center py-4">No stats found.</div>

  <!-- ✅ Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-surface rounded-lg p-4 border border-border max-w-md w-full shadow-lg">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-bold text-primary">Détails de la Statistique</h2>
        <button @click="closeModal" class="text-error hover:text-error-dark text-xl">×</button>
      </div>
      <div class="grid grid-cols-3 gap-1.5 items-center justify-center text-text">
        <div class="col-span-3 flex justify-between">
          <p>
            <span class="font-semibold">De :</span>
            {{ new Date(selectedStat?.created_at).toLocaleString() }}
          </p>
          <p>
            <span class="font-semibold">À :</span>
            {{ new Date(selectedStat?.updated_at).toLocaleString() }}
          </p>
        </div>
        <p>
          <span class="font-semibold">Début :</span>
          {{ selectedStat?.entry_start }}
          <sup>{{ selectedStat?.stop_start }}</sup>
        </p>
        <p>
          <span class="font-semibold">Fin :</span>
          {{ selectedStat?.entry_end }}
          <sup>{{ selectedStat?.stop_end }}</sup>
        </p>
        <p>
          <span class="font-semibold">Somme :</span>
          {{ selectedStat?.entry_total }}
          <sup>{{ selectedStat?.stop_total }}</sup>
        </p>
      </div>
      <div class="mt-3 text-right">
        <button
          @click="closeModal"
          class="px-3 py-1 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-dark"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
