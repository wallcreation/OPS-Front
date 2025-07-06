<script setup>
import { computed, ref } from 'vue'
import { createOperator, getErrorMessage, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import TeamSelector from './TeamSelector.vue'

const stores = useAppStore()
const loading = ref(false)
const error = ref([false, ''])

const emit = defineEmits(['created', 'close'])

const close = async () => {
  emit('close')
}

// Champs du formulaire
const lname = ref('')
const fname = ref('')
const email = ref('')
const password = ref('')
const team = ref({ show: false, teamid: 0, textvalue: '', list: computed(() => stores.teams) })
const workat = ref({ show: false, choice: 'Jour' })

// Functions
const closetteamselector = async (choosedteam) => {
  team.value.teamid = choosedteam.id
  team.value.textvalue = choosedteam.name
  team.value.show = false
}

const oncreate = async () => {
  loading.value = true
  if (!lname.value || !fname.value || !email.value || !password.value || !team.value.teamid) {
    error.value = [true, 'Veuillez remplir tous les champs.']
    setTimeout(() => {
      error.value = [false, '']
    }, 5000)
    loading.value = false
    return
  }

  const data = {
    lname: lname.value,
    fname: fname.value,
    email: email.value,
    password: password.value,
    team_id: team.value.teamid,
    work_at: workat.value.choice, // inclure le work_at dans les données envoyées
  }

  // console.log('data :', data)
  // const [res, err] = await safeCall(createOperator(data))
  // if (err) {
  //   loading.value = false
  //   error.value = [true, err.message || getErrorMessage(err.code)]
  //   setTimeout(() => {
  //     error.value = [false, '']
  //   }, 5000)
  //   return
  // } else {
  //   console.log('op cre res: ', res)
  //   emit('created', res)
  // }

  stores.createOperatorAPI(data)

  lname.value = ''
  fname.value = ''
  email.value = ''
  password.value = ''
  team.value.teamid = 0
  team.value.textvalue = ''
  workat.value.choice = 'jour'

  loading.value = false
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition">
    <div class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border bg-surface">
      <h1 class="text-center text-xl font-bold">Ajouter un opérateur</h1>

      <form class="my-2 grid gap-2 grid-cols-1 md:grid-cols-2" @submit.prevent="oncreate">
        <input
          type="text"
          name="lname"
          id="lname"
          v-model="lname"
          required
          placeholder="Nom"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="text"
          id="fname"
          v-model="fname"
          placeholder="Prénom"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Adresse mail"
          class="md:col-span-2 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Mot de passe"
          class="md:col-span-2 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <div class="md:col-span-2 grid grid-cols-3 gap-1 items-center">
          <input
            type="text"
            name="team"
            id="team"
            :value="team.textvalue"
            readonly
            placeholder="Équipe"
            class="col-span-2 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none cursor-pointer"
            @click="team.show = true"
          />
          <input
            type="text"
            name="work_at"
            id="work_at"
            @click="workat.show = true"
            :value="workat.choice"
            placeholder="Horaire"
            class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
          />
        </div>
        <div v-if="error[0]" class="w-full p-1 bg-error">
          <p class="text-lg font-bold text-center">{{ error[1] }}</p>
        </div>
        <div class="md:col-span-2 flex gap-2 items-center justify-end">
          <button
            type="submit"
            class="px-2 border-2 border-primary rounded-lg hover:border-primary-dark hover:motion-bg-out-primary-dark"
            :class="loading ? 'animate-pulse' : ''"
            :disabled="loading"
          >
            {{ loading ? 'Création...' : 'Valider' }}
          </button>
          <button
            @click="close"
            class="px-2 border-2 border-error rounded-lg hover:bg-error-dark hover:border-error-dark transition"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Error message -->
  <div v-if="error[0]" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div class="p-4 flex flex-col gap-1.5 border-2 rounded-lg border-border bg-surface">
      <h1 class="text-xl text-warning font-bold">{{ error[1] }}</h1>
      <button
        @click="error[0] = false"
        class="mx-2 px-2 border-2 border-error rounded-lg hover:bg-error-dark hover:border-error-dark"
      >
        Fermer
      </button>
    </div>
  </div>
  <!-- Quick team selector -->
  <TeamSelector
    v-if="team.show"
    :teamlist="team.list"
    @close="team.show = false"
    @select="closetteamselector"
  />
  <!-- Quick workat chooser -->
  <div
    v-if="workat.show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 transition"
  >
    <div class="flex flex-col gap-1.5 p-4 backdrop-blur-md border-2 border-border rounded-lg">
      <h2 class="p-2 rounded-lg bg-primary-dark">Travaille de ?</h2>
      <button
        @click="
          workat.choice = 'Jour';
          workat.show = false
        "
        class="border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
      >
        Jour
      </button>
      <button
        @click="
          workat.choice = 'Nuit';
          workat.show = false
        "
        class="border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
      >
        Nuit
      </button>
    </div>
  </div>
</template>
