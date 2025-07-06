<script setup>
import { computed, onMounted, ref } from 'vue'
import { getdashboard, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import TeamAdd from '@/components/admin/TeamAdd.vue'
const store = useAppStore()
const data = ref({
  teams: computed(() => store.teams),
  operators: computed(() => store.operators),
  accounts: computed(() => store.accounts),
})
const loading = ref(false)
const error = ref(false)
const reload = ref(false)
const showTeamAdd = ref(false)
const showOperatorAdd = ref(false)
const showAccountAdd = ref(false)
const foo = async () => {
  reload.value = false
  const [res, err] = await safeCall(getdashboard())
  if (err) {
    console.log('err: ', err)
    if (err.code === 1003) {
      error.value = true
    } else {
      reload.value = true
    }
  } else {
    // Mise à jour du store Pinia
    store.setTeams(res.teams)
    store.setOperators(res.operators)
    store.setAccounts(res.accounts)

    loading.value = false
  }
}
onMounted(async () => {
  // await foo()
})
</script>
<template>
  <div
    class="w-full h-full grid grid-cols-1 md:grid-cols-2 text-center"
    :class="loading ? 'animate-pulse' : ''"
  >
    <div
      class="flex items-center justify-center m-2 bg bg-surface border-2 border-border rounded-lg"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ data.teams.length }}
        </h1>
        <p @click="showTeamAdd = true">Equipes</p>
      </div>
    </div>
    <div
      class="flex items-center justify-center m-2 bg bg-surface border-2 border-border rounded-lg"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ data.operators.length }}
        </h1>
        <p>Opérateurs</p>
      </div>
    </div>
    <div
      class="flex items-center justify-center md:col-span-2 m-2 bg bg-surface border-2 border-border rounded-lg"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ data.accounts.length }}
        </h1>
        <p>Comptes</p>
      </div>
    </div>
  </div>
  <!-- Add team modal -->
  <TeamAdd v-if="showTeamAdd" @created="teamAdd" @close="showTeamAdd = false" />
</template>
