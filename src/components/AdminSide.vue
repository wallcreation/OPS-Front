<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <aside class="bg-[#1E293B] text-[#E0E0E0] p-1 h-full text-center flex flex-col justify-between">
    <div>
      <RouterLink
        to="/admin/dashboard"
        active-class="text-bold text-primary border-b-2 border-primary"
        class="flex items-center gap-2 my-1 p-1 border-b-1 border-color hover:border-[#38BDF8]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.45 2.533a2.25 2.25 0 0 0-2.9 0L3.8 8.228a2.25 2.25 0 0 0-.8 1.72v9.305c0 .966.784 1.75 1.75 1.75h3a1.75 1.75 0 0 0 1.75-1.75V15.25c0-.68.542-1.232 1.217-1.25h2.566a1.25 1.25 0 0 1 1.217 1.25v4.003c0 .966.784 1.75 1.75 1.75h3a1.75 1.75 0 0 0 1.75-1.75V9.947a2.25 2.25 0 0 0-.8-1.72z"/></svg>
        <span class="hidden md:inline">Accueil</span>
      </RouterLink>

      <RouterLink
        to="/admin/teams"
        active-class="text-bold text-primary border-b-2 border-primary"
        class="flex items-center gap-2 my-1 p-1 border-b-1 border-border hover:border-primary-light"
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"/></svg>
        <span class="hidden md:inline">Équipes</span>
      </RouterLink>

      <RouterLink
        to="/admin/operators"
        active-class="text-bold text-primary border-b-2 border-primary"
        class="flex items-center gap-2 my-1 p-1 border-b-1 border-border hover:border-primary-light"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/></svg>
        <span class="hidden md:inline">Opérateurs</span>
      </RouterLink>

      <RouterLink
        to="/admin/accounts"
        active-class="text-bold text-primary border-b-2 border-primary"
        class="flex items-center gap-2 my-1 p-1 border-b-1 border-border hover:border-primary-light"
      >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2m4 4V4h-4v2z"/></svg>
        <span class="hidden md:inline">Comptes</span>
      </RouterLink>
    </div>

    <div class="mx-2 flex items-center gap-1 justify-center">
      <a
        href="#"
        class="flex items-center gap-2 w-3/4 p-1 border-b-1 border-border hover:border-primary-light"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 
            3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 
            2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 
            1-2.25-2.25V15m-3 0-3-3m0 0 
            3-3m-3 3H15"
          />
        </svg>
        <span class="hidden md:inline">Admin</span>
      </a>

      <a href="#" class="p-1 border-b-2 border-[#3F3A60] border-border hover:border-primary-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 
            19.644v-4.992m0 0h4.992m-4.993 0 
            3.181 3.183a8.25 8.25 0 0 0 
            13.803-3.7M4.031 9.865a8.25 8.25 0 0 
            1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </a>
    </div>
  </aside>
</template>
