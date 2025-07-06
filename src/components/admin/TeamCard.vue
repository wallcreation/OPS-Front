<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
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
const stores = useAppStore()
const deleting = ref(false)
const delteam = async () => {
  deleting.value = true
  stores.deleteTeamAPI(props.id)
}
</script>
<template>
  <div v-if="deleting" class="group bg-surface rounded-lg border-2 border-border hover:border-primary p-2">
    <h2 class="flex items-center justify-between">
      {{ name }}
    </h2>
    <p class="text-error underline animate-pulse">Suppression</p>
  </div>
  <div v-else class="group bg-surface rounded-lg border-2 border-border hover:border-primary p-2">
    <div class="flex items-center justify-between">
      <RouterLink :to="{ name: 'team-info', params: { id: id } }" class="text-primary font-bold">
        {{ name }}
      </RouterLink>
      <svg
        @click="delteam"
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
</template>
