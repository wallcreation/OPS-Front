<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { clearProfile } from '@/api'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const initials = (props.profile?.fname?.[0] || '') + (props.profile?.lname?.[0] || '')
const router = useRouter()

const showMenu = ref(false)
const showMobileMenu = ref(false)

const dropdownRef = ref(null)
const avatarRef = ref(null)

const logout = async () => {
  clearProfile()
  router.push({ name: 'login' })
}

const handleClickOutside = (e) => {
  if (
    showMenu.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target) &&
    avatarRef.value &&
    !avatarRef.value.contains(e.target)
  ) {
    showMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="bg-surface px-4 text-text shadow-md w-full">
    <div class="w-full mx-auto py-3 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/ops/dashboard" class="flex items-center gap-2">
        <img src="@/assets/ops_white.png" class="h-8 md:h-10" alt="OPS Logo" />
        <span class="text-xl font-bold hidden sm:inline">OPS</span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex gap-6 items-center text-sm font-medium">
        <RouterLink
          to="/ops/dashboard"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-home"></i>
          Accueil
        </RouterLink>
        <!-- <RouterLink
          to="/ops/history"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-clock"></i>
          Historique
        </RouterLink> -->
      </nav>

      <!-- User & mobile menu toggle -->
      <div class="flex items-center gap-3">
        <!-- Mobile toggle -->
        <button @click="showMobileMenu = !showMobileMenu" class="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Avatar -->
        <button
          ref="avatarRef"
          @click="showMenu = !showMenu"
          class="w-9 h-9 bg-bg cursor-pointer text-text font-bold rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-bg transition"
        >
          {{ initials }}
        </button>
      </div>
    </div>

    <!-- Mobile nav -->
    <div v-if="showMobileMenu" class="md:hidden bg-surface w-full px-4 pb-4 space-y-2">
      <RouterLink to="/ops/dashboard" class="block text-text hover:underline">
        <i class="pi pi-home"></i>
        Accueil
      </RouterLink>
      <!-- <RouterLink to="/ops/history" class="block text-text hover:underline">
        <i class="pi pi-clock "></i>
        Historique
      </RouterLink> -->
    </div>

    <!-- Dropdown user menu -->
    <div
      ref="dropdownRef"
      v-if="showMenu"
      class="absolute top-16 right-4 z-50 bg-[#2e2c2c] text-text rounded-lg shadow-lg w-72 p-5 space-y-4"
    >
      <div class="text-center">
        <div class="text-lg font-semibold text-text">{{ props.profile.fname }} {{ props.profile.lname }}</div>
        <div class="text-sm text-gray-300">Opérateur</div>
      </div>

      <div class="space-y-2">
        <button
          @click="logout"
          class="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-400 rounded-md bg-[#3b3b3b] hover:bg-red-600 hover:text-text transition"
        >
          <i class="pi pi-sign-out"></i>
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  </header>
</template>
