<script setup>
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const deleting = ref(false)
const stores = useAppStore()

const delaccount = async () => {
  deleting.value = true
  await stores.deleteAccountAPI(props.id)
}
</script>
<template>
  <div
    v-if="deleting"
    class="group bg-surface rounded-lg border-2 border-border hover:border-primary p-2"
  >
    <h2 class="flex items-center justify-between">
      {{ name }}
    </h2>
    <p class="text-error underline animate-pulse">Suppression</p>
  </div>
  <div v-else class="bg-surface rounded-lg border-2 border-border hover:border-primary p-2">
    <div class="flex justify-between items-center">
      <RouterLink
        :to="{ name: 'account-info', params: { id: id } }"
        class="text-primary font-bold"
        >{{ name }}</RouterLink
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        class="text-error"
        @click="delaccount"
      >
        <path
          fill="currentColor"
          d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
        />
      </svg>
    </div>
  </div>
</template>
