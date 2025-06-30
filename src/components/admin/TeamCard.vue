<script setup>
import { ref } from 'vue'
import { deleteteam, safeCall } from '@/api'
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  operators: {
    type: Array,
    required: true,
  },
  accounts: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['deleted'])
const deleting = ref(false)
const showModal = ref(false)
const delteam = async () => {
  deleting.value = true
  const [res, err] = await safeCall(deleteteam(props.id))
  if (err) {
    console.log('delete team err:', err)
    deleting.value = false
  } else {
    showModal.value = false
    emit('deleted')
  }
}
</script>
<template>
  <div
    :to="{ name: 'team-info', params: { id: id } }"
    class="group bg-surface rounded-lg border-2 border-border hover:border-primary p-2"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-primary font-bold">{{ name }}</h2>
      <svg
        @click="showModal = true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        class="text-error"
      >
        <path
          fill="currentColor"
          d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
        />
      </svg>
    </div>
    <div class="flex gap-2">
      <div>
        <p v-for="operator in operators" :key="operator.id" class="text-sm">
          {{ operator.lname }} {{ operator.fname }}
        </p>
      </div>

      <div>
        <p v-for="account in accounts" :key="account" class="text-sm">{{ account.name }}</p>
      </div>
    </div>
  </div>
  <!-- Delete modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
  >
    <div
      v-if="deleting"
      class="mx-5 p-3 max-w-lg w-full flex flex-col items-center justify-center rounded-lg border-1 border-border backdrop-blur-md animate-bounce"
    >
      <h1 class="text-xl text-error text-center">Suppression en cours, veuillez patienter...</h1>
    </div>
    <div
      v-else
      class="mx-5 p-3 max-w-lg w-full flex flex-col items-center justify-center rounded-lg border-1 border-border backdrop-blur-md"
    >
      <h1 class="w-full text-error text-center text-xl font-bold">Suprimer {{ name }}</h1>
      <!-- <p v-if="error" class="bg-error-dark rounded-lg text-center">{{ errormsg }}</p> -->
      <div class="flex gap-2 justify-end mt-1">
        <button @click="delteam" class="text-error hover:border-b-2 hover:border-error">
          Valider
        </button>
        <button
          @click="showModal = false"
          class="text-primary hover:border-b-2 hover:border-primary"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
