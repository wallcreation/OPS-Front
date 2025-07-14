<script setup>
import { ref, computed } from 'vue'
import TeamSelector from './TeamSelector.vue'

const props = defineProps({
  operator: Object,
  stores: Object,
})
const emit = defineEmits(['close', 'updated'])

// État du formulaire
const step = ref(0)
const error = ref([false, ''])
const passtype = ref('password')

const lname = ref(props.operator?.lname || '')
const fname = ref(props.operator?.fname || '')
const email = ref(props.operator?.email || '')
const password = ref('')
const team = ref(
  {
    show: false,
    teamid: 0,
    textvalue: props.stores.getTeamById(props.operator.team_id).name,
    list: computed(() => props.stores.teams)
  }
)

const workat = ref({ show: false, choice: props.operator?.work_at || 'Jour' })

function togglePassword() {
  passtype.value = passtype.value === 'password' ? 'text' : 'password'
}

function nextStep() {
  if (step.value < 2) step.value++
}

function prevStep() {
  if (step.value > 0) step.value--
}

const closetteamselector = async (choosedteam) => {
  team.value.teamid = choosedteam.id
  team.value.textvalue = choosedteam.name
  team.value.show = false
}

async function foo() {
  const data = {
    lname: lname.value,
    fname: fname.value,
    email: email.value,
    password: password.value || null,
    team_id: team.value.teamid,
    work_at: workat.value.choice,
  }

  await props.stores.editOperatorAPI(props.operator.id, data)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md p-4">
    <div class="p-4 bg-surface border-2 border-border rounded-lg w-full max-w-md space-y-2">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-center text-primary">Modifier l'opérateur</h2>
        <button @click="emit('close')" class="text-error hover:text-error-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"/></svg>
        </button>
      </div>

      <form @submit.prevent="foo" class="grid gap-3">
        <!-- Étape 1 : Mail + mot de passe -->
        <div v-show="step === 0" class="grid md:grid-cols-2 gap-2">
          <input
            v-model="email"
            type="email"
            placeholder="Adresse mail"
            class="border-b-2 outline-none border-border focus:border-primary hover:border-primary-dark"
          />
          <div
            class="flex items-center justify-between gap-2 border-b-2 border-border focus-within:border-primary hover:border-primary-dark"
          >
            <input
              :type="passtype"
              v-model="password"
              placeholder="Mot de passe (laisser vide pour ne pas changer)"
              class="flex-1 bg-transparent outline-none"
            />
            <button type="button" @click="togglePassword">
              <span v-if="passtype === 'password'">👁‍🗨</span>
              <span v-else>🙈</span>
            </button>
          </div>
        </div>

        <!-- Étape 2 : Nom + prénom -->
        <div v-show="step === 1" class="grid md:grid-cols-2 gap-2">
          <input
            v-model="lname"
            type="text"
            placeholder="Nom"
            class="border-b-2 outline-none border-border focus:border-primary hover:border-primary-dark"
          />
          <input
            v-model="fname"
            type="text"
            placeholder="Prénom"
            class="border-b-2 outline-none border-border focus:border-primary hover:border-primary-dark"
          />
        </div>

        <!-- Étape 3 : Équipe + horaire -->
        <div v-show="step === 2" class="grid md:grid-cols-2 gap-2">
          <input
            name="team"
            id="team"
            readonly
            v-model="team.textvalue"
            type="text"
            placeholder="Équipe"
            @click="team.show = true"
            class="border-b-2 outline-none border-border focus:border-primary hover:border-primary-dark"
          />
          <input
            type="text"
            :value="workat.choice"
            readonly
            @click="workat.show = true"
            placeholder="Travail de jour ou nuit"
            class="border-b-2 outline-none border-border focus:border-primary hover:border-primary-dark cursor-pointer"
          />
        </div>

        <!-- Sélecteur jour/nuit -->
        <div
          v-if="workat.show"
          class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
        >
          <div class="flex flex-col gap-2 p-4 border-2 border-border rounded-lg bg-surface">
            <h2 class="text-lg font-semibold text-primary-dark">Travaille de ?</h2>
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

        <!-- Erreur -->
        <div v-if="error[0]" class="bg-error text-text text-center py-1 px-2 rounded">
          {{ error[1] }}
        </div>

        <!-- Navigation -->
        <div class="flex justify-between items-center gap-2 mt-1">
          <button
            type="button"
            v-if="step > 0"
            @click="prevStep"
            class="px-2 py-1 border-2 border-border rounded-lg hover:border-primary-dark"
          >
            ← Précédent
          </button>
          <button
            type="button"
            v-if="step < 2"
            @click="nextStep"
            class="ml-auto px-2 py-1 border-2 border-primary rounded-lg hover:bg-primary-dark"
          >
            Suivant →
          </button>
          <button
            v-if="step === 2"
            type="submit"
            class="ml-auto px-2 py-1 border-2 border-primary rounded-lg hover:bg-primary-dark"
          >
            Valider
          </button>
        </div>
      </form>
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
