<script setup>
import { addOperatorStat, safeCall } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { ref } from 'vue'

const props = defineProps({
  operatorid: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['close', 'created'])

const amount = ref(0)
const loading = ref(false)

async function addStat() {
  loading.value = true
  const notification = useNotificationStore()
  const data = {
    operatorid: props.operatorid,
    amount: amount.value,
  }
  const [res, err] = await safeCall(addOperatorStat(data))
  if (res) {
    notification.notify('Statistiques créé.', 'success')
    emit('created')
    emit('close')
  } else {
    loading.value = false
    notification.notify('Error lors de la création.', 'error')
    emit('close')
  }
  loading.value = false
}
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm">
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-xl font-bold text-text">Ajouter une stat</h2>
        <button @click="emit('close')" class="text-error hover:text-error-dark">
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
      <form class="mt-1 flex flex-col gap-1">
        <!-- Champ montant -->
        <input
          type="number"
          placeholder="Montant"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <div class="flex justify-end gap-3 mt-2">
          <button
            class="px-2 py-1 border-2 rounded-lg border-primary hover:border-primary-dark hover:bg-primary-dark"
            :disabled="loading"
            :class="loading ? 'animate-pulse' : ''"
            @click.prevent="addStat"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
