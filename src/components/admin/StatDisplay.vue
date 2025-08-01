<script setup>
import { deleteStat, safeCall } from '@/api'
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
const deleting = ref(false)

function openModal(stat, date) {
  selectedStat.value = stat
  selectedDate.value = date
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedStat.value = null
}

async function removeStat(statid) {
  deleting.value = true
  const [res, err] = await safeCall(deleteStat(statid))
  if (err) {
    deleting.value = false
    return
  }

  try {
    for (const [date, statArray] of Object.entries(props.stats)) {
      const index = statArray.findIndex((stat) => stat.id === statid)

      if (index !== -1) {
        statArray.splice(index, 1)
        if (statArray.length === 0) {
          delete props.stats[date]
        }
        break
      }
    }
  } catch (error) {
    console.error('Erreur de suppression :', error)
  }

  deleting.value = false
  closeModal()
}

</script>

<template>
  <div v-if="Object.keys(stats || {}).length" class="space-y-3 grid lg:grid-cols-2">
    <div v-for="(stat, date) in stats" :key="date">
      <h2 class="text-xl font-semibold text-muted mb-1">
        {{ new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' }) }}
      </h2>

      <div :class="stat.lenght === 1 ? 'lg:flex gap-2 mb-1' : 'grid grid-cols-1 gap-2 mb-1'">
        <div
          v-for="item in stat"
          :key="item.account_id"
          class="bg-muted/5 border border-border rounded-lg p-2 m-1 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <p class="text-text">
              {{ stores.getAccountById(item.account_id).name }}
            </p>
            <button
              class="text-muted hover:text-primary-dark"
              @click="openModal(item, date)"
              title="Voir les détails"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                  10-10S17.52 2 12 2zm0 18c-4.41 
                  0-8-3.59-8-8s3.59-8 8-8 8 3.59 
                  8 8-3.59 8-8 8zm1-13h-2v2h2V7zm0 
                  4h-2v6h2v-6z"
                />
              </svg>
            </button>
          </div>
          <div class="flex gap-2">
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
              <span class="font-semibold">{{ item.entry_total }}</span>
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
  <div v-else class="text-muted text-center py-4">Aucune statistiques.</div>

  <!-- ✅ Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-surface rounded-lg p-4 border border-primary shadow-lg">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-bold text-primary">Détails de la Statistique</h2>
        <button @click="closeModal" class="text-error hover:text-error-dark text-xl">
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
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-1 space-x-2 px-2 items-center justify-center text-text text-nowrap"
      >
        <p>
          <span class="font-semibold">Du :</span>
          {{ new Date(selectedStat?.created_at).toLocaleString() }}
        </p>
        <p>
          <span class="font-semibold">Début :</span>
          {{ selectedStat?.entry_start }}
          <sup>{{ selectedStat?.stop_start }}</sup>
        </p>
        <p>
          <span class="font-semibold">Au :</span>
          {{ new Date(selectedStat?.updated_at).toLocaleString() }}
        </p>
        <p>
          <span class="font-semibold">Fin :</span>
          {{ selectedStat?.entry_end }}
          <sup>{{ selectedStat?.stop_end }}</sup>
        </p>
        <p>
          Compte :
          <span>{{ stores.getAccountById(selectedStat?.account_id)?.name }}</span>
        </p>
        <p class="">
          <span class="font-semibold">Somme :</span>
          {{ selectedStat?.entry_total }}
          <sup>{{ selectedStat?.stop_total }}</sup>
        </p>
        <button
          @click="removeStat(selectedStat.id)"
          :disabled="deleting"
          class="col-span-2 px-3 py-1 bg-error text-white rounded-lg shadow-sm hover:bg-error-dark"
          :class="deleting ? 'animate-pulse' : ''"
        >
          {{ deleting ? 'Suppression' : 'Supprimer' }}
        </button>
      </div>
    </div>
  </div>
</template>
