<script setup>
import { ref, computed } from 'vue'
import { updateOperator, getErrorMessage, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'

const props = defineProps({
  operator: Object,
})
const emit = defineEmits(['close', 'updated'])

const stores = useAppStore()

// État du formulaire
const step = ref(0)
const loading = ref(false)
const error = ref([false, ''])
const passtype = ref('password')

const lname = ref(props.operator?.lname || '')
const fname = ref(props.operator?.fname || '')
const email = ref(props.operator?.email || '')
const password = ref('')
const team = ref(props.operator?.team || '')
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

async function save() {
  loading.value = true
  const payload = {
    id: props.operator.id,
    lname: lname.value,
    fname: fname.value,
    email: email.value,
    password: password.value || null,
    team,
    work_at: workat.value.choice,
  }

  const [res, err] = await safeCall(updateOperator(payload))
  loading.value = false

  if (err) {
    error.value = [true, err.message || getErrorMessage(err.code)]
    setTimeout(() => (error.value = [false, '']), 5000)
    return
  }

  emit('updated', res)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md">
    <div class="p-4 bg-surface border-2 border-border rounded-lg w-full max-w-md space-y-4">
      <h2 class="text-xl font-semibold text-center text-primary">Modifier l'opérateur</h2>

      <form @submit.prevent="save" class="grid gap-3">
        <!-- Étape 1 : Mail + mot de passe -->
        <div v-show="step === 0" class="grid gap-2">
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
        <div v-show="step === 2" class="grid gap-2">
          <input
            v-model="team"
            type="text"
            placeholder="Équipe"
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
              @click="workat.choice = 'Jour'; workat.show = false"
              class="border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
            >
              Jour
            </button>
            <button
              @click="workat.choice = 'Nuit'; workat.show = false"
              class="border-2 border-primary rounded-lg hover:bg-primary-dark hover:border-primary-dark"
            >
              Nuit
            </button>
          </div>
        </div>

        <!-- Erreur -->
        <div v-if="error[0]" class="bg-error text-text text-center py-1 px-2 rounded">{{ error[1] }}</div>

        <!-- Navigation -->
        <div class="flex justify-between items-center gap-2 mt-1">
          <button
            type="button"
            v-if="step > 0"
            @click="prevStep"
            class="px-2 py-1 border-2 border-border rounded hover:border-primary-dark"
          >
            ← Précédent
          </button>
          <button
            type="button"
            v-if="step < 2"
            @click="nextStep"
            class="ml-auto px-2 py-1 border-2 border-primary rounded hover:bg-primary-dark"
          >
            Suivant →
          </button>
          <button
            v-if="step === 2"
            type="submit"
            :disabled="loading"
            :class="loading ? 'animate-pulse' : ''"
            class="ml-auto px-2 py-1 border-2 border-primary rounded hover:bg-primary-dark"
          >
            {{ loading ? 'Chargement...' : 'Valider' }}
          </button>
        </div>
      </form>

      <!-- Annuler -->
      <div class="flex justify-end">
        <button
          @click="emit('close')"
          class="px-3 py-1 border-2 border-error rounded hover:bg-error-dark hover:border-error-dark"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
