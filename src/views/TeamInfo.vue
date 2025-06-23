<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const teamid = route.params.id
onMounted(async () => {
  console.log('team id ', teamid)
})
const team = ref({
  id: 1,
  name: 'Team A',
  operators: ['Alice', 'Bob'],
  accounts: ['Account1', 'Account2'],
})
</script>
<template>
  <div class="w-full mt-2 grid gap-2 grid-cols-1 md:grid-cols-4 justify-between">
    <div class="col-span-3">
      <h1 class="text-5xl">{{ team.name }}</h1>
      <button class="ml-2 flex items-center hover:border-b-1 hover:border-primary-light">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
            />
          </svg>
        </span>
        <span class="">Editer l'équipe</span>
      </button>
    </div>
    <div class="ml-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <h2 class="mb-1 font-bold">Operators</h2>
        <ul class="flex gap-2">
          <li v-for="operator in team.operators" :key="operator" class="mb-2 text-sm">
            {{ operator }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-1 font-bold">Accounts</h2>
        <ul class="flex gap-2">
          <li v-for="account in team.accounts" :key="account" class="mb-2 text-sm">
            {{ account }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
