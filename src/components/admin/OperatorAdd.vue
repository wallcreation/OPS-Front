<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import TeamSelector from './TeamSelector.vue'
import { createOperator, safeCall } from '@/api'

const stores = useAppStore()
const teamlist = computed(() => stores.teams)

const emit = defineEmits(['created', 'close'])

const close = async () => {
  emit('close')
}

// Champs du formulaire
const team_id = ref(0)
const teamipt = ref('')
const lname = ref('')
const fname = ref('')
const email = ref('')
const password = ref('')
const contact = ref('')
const shift = ref('jour') // "jour" par défaut

// État pour afficher/masquer le sélecteur
const teamsel = ref(false)

const closetteamselector = async (team) => {
  team_id.value = team.id
  teamipt.value = team.name
  teamsel.value = false
}

const oncreate = async () => {
  if (
    !lname.value ||
    !fname.value ||
    !email.value ||
    !password.value ||
    !contact.value ||
    !team_id.value
  ) {
    alert('Veuillez remplir tous les champs.')
    return
  }

  const data = {
    lname: lname.value,
    fname: fname.value,
    email: email.value,
    password: password.value,
    phone: contact.value,
    team_id: team_id.value === 'jour' ? 1 : 0,
    shift: shift.value, // inclure le shift dans les données envoyées
  }

  const [res, err] = await safeCall(createOperator(data))
  if (err) {
  } else {
    console.log('op cre res: ', res)
    emit('created', res)
  }

  lname.value = ''
  fname.value = ''
  email.value = ''
  password.value = ''
  contact.value = ''
  team_id.value = 0
  teamipt.value = ''
  shift.value = 'jour'

  emit('close')
}

const addteam = async () => {
  alert("Ajout d'une équipe (logique à compléter si besoin)")
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
        <input
          type="text"
          name="team"
          id="team"
          :value="teamipt"
          readonly
          placeholder="Équipe"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none cursor-pointer"
          @click="teamsel = true"
        />
        <select
          v-model="shift"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        >
          <option class="bg-surface border-2 border-border rounded active:bg-primary focus:bg-primary" value="jour">Jour</option>
          <option class="bg-surface border-2 border-border rounded active:bg-primary focus:bg-primary" value="nuit">Nuit</option>
        </select>
        <input
          type="text"
          name="contact"
          id="contact"
          v-model="contact"
          placeholder="Numéro de téléphone"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <div class="md:col-span-2 flex gap-2 items-center justify-end">
          <button
            type="submit"
            class="px-2 border-2 border-primary rounded-lg hover:border-primary-dark hover:motion-bg-out-primary-dark"
          >
            Valider
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
  <TeamSelector
    :show="teamsel"
    :teamlist="teamlist"
    @close="teamsel = false"
    @select="closetteamselector"
  />
</template>
