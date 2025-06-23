<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <h1 class="text-5xl font-bold text-primary">OPS</h1>
  <nav>
    <RouterLink
      to="/admin/dashboard"
      class="mx-1 hover:border-b-2 hover:border-primary-light"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <span class="md:hidden">
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
      <span class="md:hidden">
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
          /></svg
      ></span>
      <span class="hidden md:inline">Equipes</span>
    </RouterLink>
    <RouterLink
    to="/admin/operators"
      class="mx-1 hover:border-b-2 hover:border-primary-light"
      active-class="text-primary-light border-b-2 border-primary"
    >
      <span class="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
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
      <span class="md:hidden"
        ><svg
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
    <RouterLink to="/admin/logout" class="mx-1 hover:border-b-2 hover:border-primary-light">
      <span>Admin</span>
    </RouterLink>
  </nav>
</template>
