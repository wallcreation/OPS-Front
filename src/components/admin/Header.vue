<script setup>
import { clearProfile, fetchAllAppData, safeCall, logout, regenerateCodes } from '@/api'
import { useAppStore } from '@/stores/app'
import { useSessionStore } from '@/stores/session'
import { useNotificationStore } from '@/stores/notification'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const error = ref(false)
const notification = useNotificationStore()
const sessionstores = useSessionStore()
const profile = sessionstores.user
const initials = (profile?.fname?.[0] || '') + (profile?.lname?.[0] || '')
const router = useRouter()
const show = ref(false)
const stores = useAppStore()
const dologout = async () => {
  const [res, err] = await safeCall(logout())
  clearProfile()
  router.push({ name: 'login' })
}
const reload = async () => {
  notification.notify('Rechargement des données', 'info')
  const [data, err] = await fetchAllAppData()
  if (err) {
    if (err.code === 1003) {
      error.value = true
    }
  }
  stores.setTeams(data.teams)
  stores.setOperators(data.operators)
  stores.setAccounts(data.accounts)
  show.value = false
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
</script>
<template>
  <h1 class="text-5xl font-bold text-primary" @click="show = !show">OPS</h1>
  <nav class="flex items-center justify-center">
    <RouterLink
      to="/admin/dashboard"
      class="mx-1 hover:border-b-2 hover:border-primary-light"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <span class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1"
          />
        </svg>
      </span>
      <span class="hidden md:inline">Accueil</span>
    </RouterLink>
    <RouterLink
      to="/admin/teams/"
      class="mx-1 hover:border-b-2 hover:border-primary-light"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <span class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M16 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6-3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m19 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M9.377 13a3.98 3.98 0 0 0-.877 2.5V23c0 1.235.298 2.4.827 3.427A5 5 0 0 1 2 22v-6.5A2.5 2.5 0 0 1 4.5 13zm13.296 13.427A7.5 7.5 0 0 0 23.5 23v-7.5c0-.946-.328-1.815-.877-2.5H27.5a2.5 2.5 0 0 1 2.5 2.5V22a5 5 0 0 1-7.327 4.427M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5z"
          />
        </svg>
      </span>
      <span class="hidden md:inline">Equipes</span>
    </RouterLink>
    <RouterLink
      to="/admin/operators"
      class="mx-1 hover:border-b-2 hover:border-primary-light"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <span class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M17.755 14a2.25 2.25 0 0 1 2.248 2.25v.918a2.75 2.75 0 0 1-.512 1.598c-1.546 2.164-4.07 3.235-7.49 3.235c-3.422 0-5.945-1.072-7.487-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.253 14zM12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
          />
        </svg>
      </span>
      <span class="hidden md:inline">Opérateurs</span>
    </RouterLink>
    <RouterLink
      to="/admin/accounts"
      class="mx-1 hover:border-b-2 hover:border-primary-light"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <span class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2m4 4V4h-4v2z"
          />
        </svg>
      </span>
      <span class="hidden md:inline">Comptes</span>
    </RouterLink>
    <RouterLink
      to="/admin/summary"
      class="mx-1 hover:border-b-2 hover:border-primary-light flex items-center"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="inline pb-1"
      >
        <path
          fill="currentColor"
          d="M6 13H2c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1m16-4h-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1m-8-8h-4c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1"
        />
      </svg>
      <span class="hidden md:inline">Récapitulatif</span>
    </RouterLink>
    <button
      @click="show = !show"
      class="w-7 h-7 rounded-[100px] bg-primary flex items-center justify-center mx-1 hover:border-b-2 hover:border-primary-light"
    >
      <span class="font-bold text-surface">{{ initials }}</span>
    </button>
  </nav>

  <!-- boite de dialogue de déconnexion -->
  <div
    v-if="show"
    @click="show = !show"
    class="fixed inset-0 backdrop-blur-md flex items-center justify-center"
  >
    <div
      class="border-2 p-4 border-primary rounded-lg bg-surface grid gap-4 grid-cols-1 md:grid-cols-2 text-center"
    >
      <h1 class="md:col-span-2 text-primary text-2xl">{{ profile.fname }} {{ profile.lname }}</h1>
      <p class="md:col-span-2">Administrateur</p>
      <button
        @click="reload"
        class="p-1 flex items-center justify-center gap-1 outline-2 outline-offset-2 outline-primary rounded-lg hover:bg-primary-dark hover:outline-primary-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M13.1 12c-1.2 1.5-3 2.5-5.1 2.5c-3.6 0-6.5-2.9-6.5-6.5S4.4 1.5 8 1.5c2.2 0 4.1 1.1 5.3 2.7m.2-3.2v3c0 .3-.2.5-.5.5h-3"
          />
        </svg>
        <span>Recharger</span>
      </button>
      <button
        @click="dologout()"
        class="p-1 flex items-center justify-center gap-1 outline-2 outline-offset-2 outline-error rounded-lg hover:bg-error-dark hover:outline-error-dark transition"
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
        <span>Se déconnecter</span>
      </button>
      <button
        @click="regenerate"
        class="col-span-2 p-1 flex items-center justify-center gap-1 outline-2 outline-offset-2 outline-primary rounded-lg hover:bg-primary-dark hover:outline-primary-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M13.1 12c-1.2 1.5-3 2.5-5.1 2.5c-3.6 0-6.5-2.9-6.5-6.5S4.4 1.5 8 1.5c2.2 0 4.1 1.1 5.3 2.7m.2-3.2v3c0 .3-.2.5-.5.5h-3"
          />
        </svg>
        Régénérer les codes
      </button>
    </div>
  </div>
</template>
