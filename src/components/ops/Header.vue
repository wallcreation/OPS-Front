<script setup>
import { clearProfile } from '@/api'
import { useRouter } from 'vue-router'
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})
const initials = (props.profile?.fname?.[0] || '') + (props.profile?.lname?.[0] || '')
const router = useRouter()
const logout = async () => {
  clearProfile()
  router.push({ name: 'login' })
}
</script>
<template>
  <header class="w-full flex items-center justify-between p-2 bg-surface">
    <h1 class="text-5xl font-bold text-primary">OPS</h1>
    <nav class="flex items-center gap-1">
      <button class="w-9 h-9 flex items-center justify-center border-2 border-primary rounded-full">
        <span class="text-lg text-primary font-bold">{{ initials }}</span>
      </button>

      <button
        @click="logout()"
        class="mx-1 p-1 flex items-center justify-center gap-1 border-2 border-error rounded-lg hover:bg-error-dark hover:border-error-dark transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12h-9.5m7.5 3l3-3l-3-3m-5-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1"
          />
        </svg>
        <span class="hidden md:inline">Se déconnecter</span>
      </button>
    </nav>
  </header>
</template>
