<script setup>
import { onMounted, ref } from 'vue'
import { getteams, safeCall } from '@/api'
import TeamCard from '@/components/admin/TeamCard.vue'
import Reconnect from '@/components/Reconnect.vue'
import Reload from '@/components/Reload.vue'
const loading = ref(true)
const error = ref(true)
const reload = ref(false)
const teams = ref([])
const foo = async () => {
  reload.value = false
  const [res, err] = await safeCall(getteams())
  if (err) {
    console.log('err: ', err)
    if (err.code === 1003) {
      error.value = true
    } else {
      reload.value = true
    }
  } else {
    loading.value = false
    console.log('res: ', res)
    teams.value = res.teams
  }
}
onMounted(async () => {
  await foo()
})
const showModal = ref(false)
const teamipt = ref('')
const addteam = async () => {
  teams.value.push({
    id: 20,
    name: teamipt.value,
    operators: [],
    accounts: [],
  })
  showModal.value = false
}
</script>
<template>
  <div class="w-full h-full p-1">
    <div
      class="h-[10%] p-1 flex justify-between items-center border-1 border-border bg-surface rounded-lg"
    >
      <h1 class="text-xl font-bold text-primary">Liste des équipes</h1>
      <button class="hover:text-primary hover:border-b-2 hover:border-primary">Ajouter</button>
    </div>
    <div v-if="loading" class="h-[90%] p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des équipes...</p>
    </div>
    <div
      v-else
      class="h-[90%] p-2 grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-auto"
    >
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :id="team.id"
        :name="team.name"
        :operators="team.operators"
        :accounts="team.accounts"
      />
    </div>
  </div>
  <Reconnect v-if="error" />
  <Reload :show="reload" @accept="foo()" @cancel="reload = false" />
</template>
