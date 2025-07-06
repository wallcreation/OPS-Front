<script setup>
import { ref } from 'vue'
import { createAccount, safeCall } from '@/api'
import TeamSelector from './TeamSelector.vue'
import { useAppStore } from '@/stores/app'
const props = defineProps({
  teams: Array,
})
const emit = defineEmits(['close', 'created'])
// Variable
const accountipt = ref('')
const loading = ref(false)
const error = ref([false, ''])
const stores = useAppStore()
const team = ref({ show: false, teamid: 0, textvalue: '', list: props.teams })

// Functions
// const addaccount = async () => {
//   loading.value = true
//   if (!accountipt.value) {
//     error.value = [true, 'Le nom du compte ne peut être vide']
//     setTimeout(() => {
//       error.value = [false, '']
//     }, 5000)
//     loading.value = false
//     return
//   }
//   const data = { name: accountipt.value, team_id: team.value.teamid }
//   const [res, err] = await safeCall(createAccount(data))
//   if (err) {
//     error.value = [true, err.message]
//   } else {
//     emit('created', res)
//   }
//   loading.value = false
// }

const addaccount = async () => {
  if (!accountipt.value) {
    error.value = [true, 'Le nom du compte ne peut être vide']
    setTimeout(() => {
      error.value = [false, '']
    }, 5000)
    return
  }
  stores.createAccountAPI({ name: accountipt.value, team_id: team.value.teamid })
  emit('close')
}

const closetteamselector = async (choosedteam) => {
  team.value.show = false
  team.value.teamid = choosedteam.id
  team.value.textvalue = choosedteam.name
}
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border bg-surface">
      <h1 class="text-xl text-center font-bold">Ajouter un compte</h1>
      <form action="" class="my-2 grid gap-2 grid-cols-1 md:grid-cols-3">
        <input
          type="text"
          name="aname"
          id="aname"
          required
          placeholder="Nom du compte"
          v-model="accountipt"
          class="col-span-3 md:col-span-2 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="text"
          name="team"
          id="team"
          placeholder="Équipe"
          :value="team.textvalue"
          class="col-span-3 md:col-span-1 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
          @click="team.show = true"
        />
      </form>
      <div v-if="error[0]" class="w-full rounded-lg bg-error">
        <p class="text-lg text-center">{{ error[1] }}</p>
      </div>
      <div class="flex gap-2 items-center justify-end mt-1">
        <button
          @click="addaccount"
          class="px-2 border-2 border-primary rounded-lg hover:border-primary-dark hover:bg-primary-dark"
          :class="loading ? 'animate-pulse' : ''"
          :disabled="loading"
        >
          {{ loading ? 'Créaton..' : 'Valider' }}
        </button>
        <button
          @click="emit('close')"
          class="px-2 border-2 border-error rounded-lg hover:border-error-dark hover:bg-error-dark"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
  <!-- Quick team selector -->
  <TeamSelector
    v-if="team.show"
    :teamlist="team.list"
    @close="team.show = false"
    @select="closetteamselector"
  />
</template>
