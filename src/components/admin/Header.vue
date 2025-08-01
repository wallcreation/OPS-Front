<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useSessionStore } from '@/stores/session'
import { useNotificationStore } from '@/stores/notification'
import { clearProfile, fetchAllAppData, logout, regenerateCodes, safeCall } from '@/api'
import 'primeicons/primeicons.css'

const router = useRouter()
const showMenu = ref(false)
const showMobileMenu = ref(false)
const error = ref(false)

const notification = useNotificationStore()
const sessionStore = useSessionStore()
const stores = useAppStore()

const profile = sessionStore.user
const initials = (profile?.fname?.[0] || '') + (profile?.lname?.[0] || '')

const dropdownRef = ref(null)
const avatarRef = ref(null)

const dologout = async () => {
  await safeCall(logout())
  clearProfile()
  router.push({ name: 'login' })
}

const reload = async () => {
  notification.notify('Rechargement des données', 'info')
  const [data, err] = await fetchAllAppData()
  if (err?.code === 1003) {
    error.value = true
  }
  stores.setTeams(data.teams)
  stores.setOperators(data.operators)
  stores.setAccounts(data.accounts)
  showMenu.value = false
}

const regenerate = async () => {
  const [res, err] = await safeCall(regenerateCodes())
  if (res) {
    notification.notify('Codes changés, rechargement', 'info')
    stores.fetchAllAppData()
  } else {
    notification.notify("Quelque chose s'est mal passé", 'error')
  }
}

// Fermer dropdown quand on clique ailleurs
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
      <RouterLink to="/admin/dashboard" class="flex items-center gap-2">
        <img src="@/assets/ops_white.png" class="h-8 md:h-10" alt="OPS Logo" />
        <span class="text-xl font-bold hidden sm:inline">Admin</span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex gap-6 items-center text-sm font-medium">
        <RouterLink
          to="/admin/dashboard"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-home text-primary-light"></i>
          Accueil
        </RouterLink>
        <RouterLink
          to="/admin/teams"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-users text-primary-light"></i>
          Équipes</RouterLink
        >
        <RouterLink
          to="/admin/operators"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-user text-primary-light"></i>
          Opérateurs</RouterLink
        >
        <RouterLink
          to="/admin/accounts"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-user text-primary-light"></i>
          Comptes</RouterLink
        >
        <RouterLink
          to="/admin/summary"
          active-class="border-b-2 border-white"
          class="hover:text-gray-200"
        >
          <i class="pi pi-chart-pie text-primary-light"></i>
          Récapitulatif</RouterLink
        >
      </nav>

      <!-- User & mobile menu toggle -->
      <div class="flex items-center gap-3">
        <!-- Mobile toggle -->
        <button @click="showMobileMenu = !showMobileMenu" class="md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
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
    <div
      v-if="showMobileMenu"
      class="md:hidden bg-surface w-full px-4 py-4 divide-y divide-gray-600 space-y-2 rounded-b-lg shadow-md"
    >
      <div class="space-y-2">
        <RouterLink
          to="/admin/dashboard"
          class="flex items-center gap-3 text-text hover:bg-gray-700 px-3 py-2 rounded-md transition"
        >
          <i class="pi pi-home text-lg text-primary-light"></i>
          <span>Accueil</span>
        </RouterLink>

        <RouterLink
          to="/admin/teams"
          class="flex items-center gap-3 text-text hover:bg-gray-700 px-3 py-2 rounded-md transition"
        >
          <i class="pi pi-users text-lg text-primary-light"></i>
          <span>Équipes</span>
        </RouterLink>

        <RouterLink
          to="/admin/operators"
          class="flex items-center gap-3 text-text hover:bg-gray-700 px-3 py-2 rounded-md transition"
        >
          <i class="pi pi-user text-lg text-primary-light"></i>
          <span>Opérateurs</span>
        </RouterLink>

        <RouterLink
          to="/admin/accounts"
          class="flex items-center gap-3 text-text hover:bg-gray-700 px-3 py-2 rounded-md transition"
        >
          <i class="pi pi-id-card text-lg text-primary-light"></i>
          <span>Comptes</span>
        </RouterLink>

        <RouterLink
          to="/admin/summary"
          class="flex items-center gap-3 text-text hover:bg-gray-700 px-3 py-2 rounded-md transition"
        >
          <i class="pi pi-chart-pie text-lg text-primary-light"></i>
          <span>Récapitulatif</span>
        </RouterLink>
      </div>
    </div>

    <!-- Dropdown user menu -->
    <div
      ref="dropdownRef"
      v-if="showMenu"
      class="absolute top-16 right-4 z-50 bg-[#0a0a0ab0] text-text rounded-lg shadow-lg w-72 p-5 space-y-4"
    >
      <!-- Profil -->
      <div class="text-center">
        <div class="text-lg font-semibold text-text">{{ profile.fname }} {{ profile.lname }}</div>
        <div class="text-sm text-gray-300">Administrateur</div>
      </div>

      <!-- Actions -->
      <div class="space-y-2">
        <button
          @click="reload"
          class="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-text rounded-md bg-[#3b3b3b] hover:bg-primary-dark transition"
        >
          <i class="pi pi-refresh text-primary-light"></i>
          <span>Recharger les données</span>
        </button>

        <button
          @click="regenerate"
          class="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-text rounded-md bg-[#3b3b3b] hover:bg-primary-dark transition"
        >
          <i class="pi pi-key text-primary-light"></i>
          <span>Régénérer les codes</span>
        </button>

        <button
          @click="dologout"
          class="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-400 rounded-md bg-[#3b3b3b] hover:bg-red-600 hover:text-text transition"
        >
          <i class="pi pi-sign-out"></i>
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  </header>
</template>
