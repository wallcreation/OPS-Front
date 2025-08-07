<script setup>
import { ref } from 'vue'

const props = defineProps({
  penalties: {
    type: Object, // format attendu : { "2025-07-13": [ {...}, {...} ], ... }
    required: true,
  },
  stores: {
    type: Object,
    required: true,
  },
})

const showModal = ref(false)
const selectedPenalty = ref(null)
const selectedDate = ref('')

function openModal(penalty, date) {
  selectedPenalty.value = penalty
  selectedDate.value = date
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedPenalty.value = null
}
</script>

<template>
  <div v-if="Object.keys(penalties || {}).length" class="">
    <div v-for="(penaltyList, date) in penalties" :key="date" class="space-y-4">
      <h2 class="text-xl font-semibold text-primary-700 mb-6">
        {{ new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' }) }}
      </h2>
      <div class="space-y-4 h-full overflow-scroll px-3 md:max-h-[210px]">
        <div
          v-for="penalty in penaltyList"
          :key="penalty.id"
          class="bg-[#350000] shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
        >
          <div class="flex justify-between items-center">
            <p v-if="penalty.operator_id" class="text-primary font-medium">
              {{ stores.getOperatorById(penalty.operator_id)?.fname || 'Inconnu' }}
            </p>
            <button
              class="text-white hover:text-primary-dark"
              @click="openModal(penalty, date)"
              title="Voir les détails"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v2h2V7zm0 4h-2v6h2v-6z"
                />
              </svg>
            </button>
          </div>
          <p class="text-sm text-white">
            <strong class="font-bold text-white">{{ penalty.amount }}</strong> FCFA —
            <em class="italic">{{ penalty.reason }}</em>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-gray-500 text-center py-6">Aucune pénalité trouvée.</div>

  <!-- ✅ Modale -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center"
    @click.self="closeModal"
  >
    <div class="bg-gray-900 border border-red-500 rounded-lg p-6 max-w-md w-full shadow-lg transform transition-all duration-300 scale-95 hover:scale-100">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-red-500">Détails de la pénalité</h2>
        <button @click="closeModal" class="text-red-500 hover:text-red-400 text-xl">
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

      <div class="grid gap-4 text-gray-300">
        <p>
          <span class="font-semibold text-gray-400">Date :</span>
          {{ new Date(selectedPenalty?.created_at).toLocaleString('fr-FR') }}
        </p>
        <p>
          <span class="font-semibold text-gray-400">Opérateur :</span>
          {{ stores.getOperatorById(selectedPenalty?.operator_id)?.fname || 'Inconnu' }}
        </p>
        <p>
          <span class="font-semibold text-gray-400">Montant :</span>
          <span class="text-lg text-white font-bold">{{ selectedPenalty?.amount }} FCFA</span>
        </p>
        <p>
          <span class="font-semibold text-gray-400">Raison :</span>
          <em class="text-gray-500">{{ selectedPenalty?.reason }}</em>
        </p>
        <button class="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors transform hover:scale-105">
          Supprimer
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Amélioration du design */
.bg-muted {
  background-color: rgba(0, 0, 0, 0.05);
}

.text-muted {
  color: #6b7280;
}

.text-text {
  color: #374151;
}

.text-primary-700 {
  color: #2563eb;
}

.bg-surface {
  background-color: #f9fafb;
}

.border-border {
  border-color: #e5e7eb;
}

.hover\:bg-error-dark:hover {
  background-color: #b91c1c;
}
</style>

