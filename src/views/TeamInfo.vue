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
const currentview = ref(1)
</script>
<template>
  <section class="w-full mt-2 grid gap-2 grid-cols-1 md:grid-cols-4">
    <section class="md:col-span-2 p-2 flex gap-2 justify-between bg-surface rounded-lg border-2 border-border">
      <h1 class="text-5xl text-primary">{{ team.name }}</h1>
      <button>Editer l'équipe</button>
    </section>
    <section class="p-2 bg-surface rounded-lg border-2 border-border">
      <h2>Opérateurs</h2>
      <div class="flex flex-wrap gap-1 ">
        <p v-for="operator in team.operators" :key="operator">
          {{ operator }}
        </p>
      </div>
    </section>
    <section class="p-2 bg-surface rounded-lg border-2 border-border">
      <h2>Comptes</h2>
      <div class="flex flex-wrap gap-1 ">
        <p v-for="account in team.accounts" :key="account">
          {{ account }}
        </p>
      </div>
    </section>
  </section>
</template>
