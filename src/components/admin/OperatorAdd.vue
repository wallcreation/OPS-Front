<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import TeamSelector from './TeamSelector.vue'

const emit = defineEmits(['created', 'close'])
const stores = useAppStore()

const loading = ref(false)
const error = ref(false)
const errormsg = ref('')

const lname = ref('')
const fname = ref('')
const email = ref('')
const password = ref('')
const team = ref({ show: false, teamid: 0, textvalue: '', list: computed(() => stores.teams) })
const workat = ref({ show: false, choice: 'Jour' })

const closetteamselector = (chosen) => {
  team.value.teamid = chosen.id
  team.value.textvalue = chosen.name
  team.value.show = false
}

const oncreate = async () => {
  if (!lname.value || !fname.value || !email.value || !password.value || !team.value.teamid) {
    error.value = true
    errormsg.value = 'Tous les champs sont obligatoires'
    setTimeout(() => {
      error.value = false
      errormsg.value = ''
    }, 3000)
    return
  }

  loading.value = true

  try {
    await stores.createOperatorAPI({
      lname: lname.value,
      fname: fname.value,
      email: email.value,
      password: password.value,
      team_id: team.value.teamid,
      work_at: workat.value.choice,
    })

    // Reset form
    lname.value = ''
    fname.value = ''
    email.value = ''
    password.value = ''
    team.value.teamid = 0
    team.value.textvalue = ''
    workat.value.choice = 'Jour'

    emit('created')
    emit('close')
  } catch (e) {
    errormsg.value = 'Erreur lors de la création de l’opérateur'
    error.value = true
    loading.value = false
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4"
    @click.self="emit('close')"
  >
    <!-- Loading -->
    <div
      v-if="loading"
      class="w-full max-w-sm p-6 rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg animate-pulse text-white text-center"
    >
      <p class="text-lg font-semibold mb-2">Création en cours...</p>
      <p class="text-zinc-400">Veuillez patienter</p>
    </div>

    <!-- Form -->
    <div
      v-else
      class="w-full max-w-lg bg-zinc-900 text-white rounded-xl border border-zinc-700 shadow-lg p-6"
    >
      <h2 class="text-xl font-bold mb-4">Ajouter un nouvel opérateur</h2>

      <form @submit.prevent="oncreate" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm mb-1">Adresse e-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="ex: user@mail.com"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm mb-1">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
        </div>

        <!-- Nom & Prénom -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="lname" class="block text-sm mb-1">Nom</label>
            <input
              id="lname"
              v-model="lname"
              type="text"
              placeholder="Nom"
              class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
            />
          </div>
          <div>
            <label for="fname" class="block text-sm mb-1">Prénom</label>
            <input
              id="fname"
              v-model="fname"
              type="text"
              placeholder="Prénom"
              class="w-full px-4 py-2 rounded-md bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
            />
          </div>
        </div>

        <!-- Équipe -->
        <div>
          <label for="team" class="block text-sm mb-1">Équipe</label>
          <input
            id="team"
            type="text"
            readonly
            v-model="team.textvalue"
            placeholder="Choisir une équipe"
            @click="team.show = true"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border cursor-pointer text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
        </div>

        <!-- Travail de -->
        <div>
          <label for="work_at" class="block text-sm mb-1">Travail de</label>
          <input
            id="work_at"
            type="text"
            readonly
            :value="workat.choice"
            @click="workat.show = true"
            placeholder="Jour / Nuit"
            class="w-full px-4 py-2 rounded-md bg-zinc-800 border cursor-pointer text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            :class="error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700'"
          />
        </div>

        <!-- Message d'erreur -->
        <p v-if="error" class="text-red-400 mt-1 text-sm">{{ errormsg }}</p>

        <!-- Boutons -->
        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-md border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-md bg-primary hover:bg-primary-dark text-white transition"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Team Selector -->
  <TeamSelector
    v-if="team.show"
    :teamlist="team.list"
    @close="team.show = false"
    @select="closetteamselector"
  />

<!-- Work At Selector -->
<div
  v-if="workat.show"
  class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 p-4"
  @click.self="workat.show = false"
>
  <div class="w-full max-w-sm bg-zinc-900 text-white p-6 rounded-xl border border-zinc-700 shadow-lg">
    <!-- Header -->
    <h2 class="text-lg font-bold text-center mb-4">Choisissez l’horaire de travail</h2>

    <!-- Options -->
    <div class="flex flex-col gap-3">
      <button
        @click="workat.choice = 'Jour'; workat.show = false"
        class="w-full px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
      >
        Jour
      </button>
      <button
        @click="workat.choice = 'Nuit'; workat.show = false"
        class="w-full px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
      >
        Nuit
      </button>
    </div>

    <!-- Cancel -->
    <div class="mt-6 flex justify-center">
      <button
        @click="workat.show = false"
        class="text-zinc-400 hover:text-white text-sm px-4 py-2 rounded-md border border-zinc-600  transition"
      >
        Annuler
      </button>
    </div>
  </div>
</div>


</template>
