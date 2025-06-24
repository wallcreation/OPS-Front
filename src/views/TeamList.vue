<script setup>
import { ref } from 'vue'
const teams = ref([
  {
    id: 1,
    name: 'Team A',
    operators: ['Alice', 'Bob'],
    accounts: ['Account1', 'Account2'],
  },
  {
    id: 2,
    name: 'Team B',
    operators: ['Charlie', 'David'],
    accounts: ['Account3', 'Account4'],
  },
  {
    id: 3,
    name: 'Team C',
    operators: ['Eve', 'Frank'],
    accounts: ['Account5', 'Account6'],
  },
  {
    id: 4,
    name: 'Team D',
    operators: ['Grace', 'Heidi'],
    accounts: ['Account7', 'Account8'],
  },
  {
    id: 5,
    name: 'Team E',
    operators: ['Ivan', 'Judy'],
    accounts: ['Account9', 'Account10'],
  },
  {
    id: 6,
    name: 'Team F',
    operators: ['Karl', 'Leo'],
    accounts: ['Account11', 'Account12'],
  },
  {
    id: 7,
    name: 'Team G',
    operators: ['Mallory', 'Nina'],
    accounts: ['Account13', 'Account14'],
  },
  {
    id: 8,
    name: 'Team H',
    operators: ['Oscar', 'Peggy'],
    accounts: ['Account15', 'Account16'],
  },
  {
    id: 9,
    name: 'Team I',
    operators: ['Quentin', 'Rupert'],
    accounts: ['Account17', 'Account18'],
  },
  {
    id: 10,
    name: 'Team J',
    operators: ['Sybil', 'Trent'],
    accounts: ['Account19', 'Account20'],
  },
])
</script>
<template>
  <div class="w-full p-2">
    <div class="flex gap-2 items-center justify-between">
      <h1 class="text-2xl">Listes des équipes</h1>
      <button
        class="flex items-center active:border-b-2 active:border-primary-light hover:border-b-2 hover:border-primary-light"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m0 2l-.09.007a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.008a.5.5 0 0 0-.402.402l-.008.09l.008.09a.5.5 0 0 0 .402.402l.09.008H17v2.503l.008.09a.5.5 0 0 0 .402.402l.09.008l.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18l2.504.001l.09-.008a.5.5 0 0 0 .402-.402l.008-.09l-.008-.09a.5.5 0 0 0-.403-.402l-.09-.008H18v-2.5l-.008-.09a.5.5 0 0 0-.402-.403zm-3.246-4a2.25 2.25 0 0 1 1.951 1.13A6.502 6.502 0 0 0 12.023 21l-.02-.001a4.5 4.5 0 0 1-4.501-4.501V12.25A2.25 2.25 0 0 1 9.752 10zm-6.848 0a3.24 3.24 0 0 0-.897 2.034l-.007.216v4.249c0 .847.191 1.649.533 2.365Q6.539 18.999 6 19a4 4 0 0 1-4-4.001V12.25a2.25 2.25 0 0 1 2.096-2.245L4.25 10zm12.344 0A2.25 2.25 0 0 1 22 12.25v.56A6.48 6.48 0 0 0 17.5 11l-.243.005A3.3 3.3 0 0 0 16.599 10zM18.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6M5.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
          />
        </svg>
        Ajouter
      </button>
    </div>
  </div>
  <div class="grid gap-1 grid-cols-1 md:grid-cols-2">
    <div
      v-for="team in teams"
      class="w-full grid gap-2 grid-cols-4 text-left p-2 bg-surface rounded-lg border-2 border-border"
    >
      <p>{{ team.name }}</p>
      <div class="">
        <p v-for="operator in team.operators">{{ operator }}</p>
      </div>
      <div class="">
        <p v-for="account in team.accounts">{{ account }}</p>
      </div>
      <div class="flex gap-2 justify-end">
        <button class="text-sm text-primary hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
            />
          </svg>
        </button>
        <button class="text-sm text-error hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6zm-6-4a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
