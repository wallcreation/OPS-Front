<script setup>
import { ref, computed } from 'vue'
import TeamSelector from './TeamSelector.vue'
import { safeCall, updateOperatorCode } from '@/api'

const props = defineProps({
  operator: Object,
  stores: Object,
})
const emit = defineEmits(['close', 'updated'])

// État du formulaire
const step = ref(0)
const error = ref([false, ''])
const passtype = ref('password')
const loading = ref(false)

const lname = ref(props.operator?.lname || '')
const fname = ref(props.operator?.fname || '')
const email = ref(props.operator?.email || '')
const password = ref('')
const team = ref({
  show: false,
  teamid: 0,
  textvalue: props.stores.getTeamById(props.operator.team_id).name,
  list: computed(() => props.stores.teams),
})

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

async function closetteamselector(choosedteam) {
  team.value.teamid = choosedteam.id
  team.value.textvalue = choosedteam.name
  team.value.show = false
}

async function updateCode() {
  const [res,err] = safeCall(updateOperatorCode(props.operator.id))
  if (err) {
    console.error('Error updating code:', err)
    return
  }
  emit('updated')
}

async function foo() {
  loading.value = true
  const data = {
    lname: lname.value,
    fname: fname.value,
    email: email.value,
    password: password.value || null,
    team_id: team.value.teamid,
    work_at: workat.value.choice,
  }

  await props.stores.editOperatorAPI(props.operator.id, data)
  loading.value = false
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4">
    <div class="p-4 bg-surface border-2 border-border rounded-lg space-y-2">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-center text-primary">Modifier l'opérateur</h2>
        <button @click="emit('close')" class="text-error hover:text-error-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="foo" class="grid gap-2">
        <!-- Étape 1 : Mail + mot de passe -->
        <div v-show="step === 0" class="grid md:grid-cols-2 gap-2">
          <input
            v-model="email"
            type="email"
            placeholder="Adresse mail"
            class="border-b-2 outline-none border-border focus:border-primary hover:border-primary-dark"
          />
          <div
            class="flex justify-between border-b-2 border-border focus-within:border-primary hover:border-primary-dark"
          >
            <input
              :type="passtype"
              v-model="password"
              placeholder="Mot de passe (laisser vide pour ne pas changer)"
              class="bg-transparent outline-none"
            />
            <button
              type="button"
              @click="togglePassword"
              class="text-muted hover:text-primary transition-colors"
            >
              <span v-if="passtype === 'password'">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
                    <path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6" />
                  </g>
                </svg>
              </span>
              <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path
                      d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18"
                    />
                  </g>
                </svg>
              </span>
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
        <div class="flex justify-between items-center gap-2 mt-2">
          <button
            type="button"
            v-if="step > 0"
            @click="prevStep"
            class="px-2 border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
          >
            Précédent
          </button>
          <button
            type="button"
            v-if="step < 2"
            @click="nextStep"
            class="ml-auto px-2 border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
          >
            Suivant
          </button>
          <button
            v-if="step === 2"
            type="submit"
            :disabled="loading"
            class="ml-auto px-2 border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
            :class="loading ? 'animate-pulse' : ''"
          >
            {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
      <hr class="w-full bg-border h-0.5 rounded border-none" />
      <div class="px-5 grid grid-cols-1 md:grid-cols-2 gap-1">
        <button
          class="p-1 flex gap-1 items-center justify-center text-sm border-2 border-warning rounded-lg hover:bg-warning-dark hover:border-warning-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="currentColor"
              d="M20.471 6.228c1.617-2.99 5.916-2.966 7.5.042l15.533 29.502c1.49 2.83-.562 6.23-3.76 6.23H8.255c-3.22 0-5.27-3.44-3.738-6.272zM24 15c-.69 0-1.25.56-1.25 1.25v11.5a1.25 1.25 0 1 0 2.5 0v-11.5c0-.69-.56-1.25-1.25-1.25m0 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
            />
          </svg>
          Bloquer
        </button>
        <button
          @click="updateCode"
          class="p-1 flex gap-1 items-center justify-center text-sm border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M13.1 12c-1.2 1.5-3 2.5-5.1 2.5c-3.6 0-6.5-2.9-6.5-6.5S4.4 1.5 8 1.5c2.2 0 4.1 1.1 5.3 2.7m.2-3.2v3c0 .3-.2.5-.5.5h-3"
          />
        </svg>
          Régénérer le code
        </button>
        <button
          class="p-1 flex gap-1 items-center justify-center sm:col-span-2 text-sm border-2 border-error rounded-lg hover:bg-error-dark hover:border-error-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
            />
          </svg>
          Supprimer
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
