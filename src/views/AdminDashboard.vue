<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getoperators, getteams, safeCall } from '@/api'
import TeamAdd from '@/components/admin/TeamAdd.vue'
import TeamCard from '@/components/admin/TeamCard.vue'
import OperatorCard from '@/components/admin/OperatorCard.vue'
import OperatorAdd from '@/components/admin/OperatorAdd.vue'
import AccountCard from '@/components/admin/AccountCard.vue'
import AccountAdd from '@/components/admin/AccountAdd.vue'
import Reconnect from '@/components/Reconnect.vue'
const teams = ref([])
const operators = ref([])
const errormodal = ref(false)
const handleerror = async (code) => {
  if (code === 1003) {
    errormodal.value = true
  }
}
const loading = ref([true, true, true])
const loadteams = async () => {
  loading.value[0] = true
  const [teamres, err] = await safeCall(getteams())
  if (err) {
    console.log('dash err: ', err)
    handleerror(err.code)
  } else {
    console.log('dash teamres: ', teamres)
    teams.value = teamres.teams
  }
  loading.value[0] = false
}
const loadoperators = async () => {
  loading.value[1] = true
  const [res, err] = await safeCall(getoperators())
  if (err) {
    console.log("operr: ", err)
    handleerror(err)
  } else {
    console.log("dash opres: ", res)
    operators.value = res
  }
  loading.value[1] = false
}
onMounted(async () => {
  await loadteams()
  await loadoperators()
})

// const operators = ref([
//   { id: 1, fname: 'Alice', lname: 'Smith', team: 'Team A', workat: 'day' },
//   { id: 2, fname: 'Bob', lname: 'Johnson', team: 'Team A', workat: 'night' },
//   { id: 3, fname: 'Charlie', lname: 'Brown', team: 'Team B', workat: 'day' },
//   { id: 4, fname: 'David', lname: 'Williams', team: 'Team B', workat: 'night' },
//   { id: 5, fname: 'Eve', lname: 'Jones', team: 'Team C', workat: 'day' },
//   { id: 6, fname: 'Frank', lname: 'Garcia', team: 'Team C', workat: 'night' },
//   { id: 7, fname: 'Grace', lname: 'Martinez', team: 'Team D', workat: 'day' },
//   { id: 8, fname: 'Heidi', lname: 'Hernandez', team: 'Team D', workat: 'night' },
//   { id: 9, fname: 'Ivan', lname: 'Lopez', team: 'Team E', workat: 'day' },
//   { id: 10, fname: 'Judy', lname: 'Gonzalez', team: 'Team E', workat: 'night' },
// ])
const accounts = ref([
  { id: 1, name: 'Account1', team: 'Team A' },
  { id: 2, name: 'Account2', team: 'Team A' },
  { id: 3, name: 'Account3', team: 'Team B' },
  { id: 4, name: 'Account4', team: 'Team B' },
  { id: 5, name: 'Account5', team: 'Team C' },
  { id: 6, name: 'Account6', team: 'Team C' },
  { id: 7, name: 'Account7', team: 'Team D' },
  { id: 8, name: 'Account8', team: 'Team D' },
  { id: 9, name: 'Account9', team: 'Team E' },
  { id: 10, name: 'Account10', team: 'Team E' },
])
const switcher = ref(1)
const showTeamAdd = ref(false)
const showOperatorAdd = ref(false)
const showAccountAdd = ref(false)
</script>
<template>
  <div
    class="flex items-center justify-between px-5 py-2 mt-2 mb-2 bg-surface/50 backdrop-blur-md rounded-lg"
  >
    <div class="flex items-center">
      <button
        class="hover:border-b-2 hover:border-primary"
        :class="[switcher === 1 ? 'text-primary border-b-2 border-primary' : '']"
        @click="switcher = 1"
      >
        <span>
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
      </button>
      <button @click="showTeamAdd = true" class="active:text-primary hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center">
      <button
        class="hover:border-b-2 hover:border-primary"
        :class="[switcher === 2 ? 'text-primary border-b-2 border-primary' : '']"
        @click="switcher = 2"
      >
        <span>
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
      </button>
      <button class="active:text-primary hover:text-primary" @click="showOperatorAdd = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center">
      <button
        class="hover:border-b-2 hover:border-primary"
        :class="[switcher === 3 ? 'text-primary border-b-2 border-primary' : '']"
        @click="switcher = 3"
      >
        <span>
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
      </button>
      <button class="active:text-primary hover:text-primary" @click="showAccountAdd = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
          />
        </svg>
      </button>
    </div>
  </div>

  <div>
    <div v-if="switcher === 1">
      <div v-if="loading[0]" class="animate-pulse w-[20%] mx-auto mt-[10em]">
        <div
          type="button"
          class="bg-surface text-xl text-center p-2 border-2 border-border rounded-lg"
        >
          Chargement des équipes...
        </div>
      </div>

      <div v-else class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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


    <div v-if="switcher === 2" >
      <div v-if="loading[1]" class="animate-pulse flex items-center justify-center">
        <div
          type="button"
          class="bg-surface text-xl text-center p-2 border-2 border-border rounded-lg"
        >
          Chargement des opérateurs...
        </div>
      </div>
      <div v-else class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <OperatorCard
          v-for="operator in operators"
          :key="operator.id"
          :id="operator.id"
          :fname="operator.fname"
          :lname="operator.lname"
          :team="operator.team"
          :workat="operator.work_at"
        />
      </div>
    </div>
    <div v-if="switcher === 3" class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AccountCard
        v-for="account in accounts"
        :key="account.id"
        :id="account.id"
        :name="account.name"
        :team="account.team"
      />
    </div>
  </div>

  <!-- modal -->

  <TeamAdd :showModal="showTeamAdd" @close="showTeamAdd = false" />
  <OperatorAdd :showModal="showOperatorAdd" @close="showOperatorAdd = false" />
  <AccountAdd :showModal="showAccountAdd" @close="showAccountAdd = false" />

  <Reconnect v-if="errormodal" />
</template>
