<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getErrorMessage, fetchAllAppData, login, safeCall } from '@/api'
import { saveProfile } from '@/utils/storage'
import { useAppStore } from '@/stores/app'
const router = useRouter()
const disablelogin = ref(false)
const displayerror = ref(false)
const email = ref('')
const errorMessage = ref('')
const loading = ref(false)
const password = ref('')
const showpassword = ref(false)
const store = useAppStore()
const error = ref(false)
// Functions
const onlogin = async () => {
  disablelogin.value = true

  if (!email.value || !password.value) {
    displayerror.value = true
    setTimeout(() => {
      displayerror.value = false
    }, 5000)
  } else {
    const [res, err] = await safeCall(login({ email: email.value, password: password.value }))

    if (err) {
      // Optionnel : afficher un message plus précis
      errorMessage.value = getErrorMessage(err.code) || err.message
      displayerror.value = true
      setTimeout(() => {
        displayerror.value = false
      }, 5000)
    } else {
      localStorage.setItem('token', res.token)
      saveProfile(res.profile)
      console.log('res: ', res.profile)
      await foo(res.profile.role)
    }
  }
  disablelogin.value = false
}
const foo = async (role) => {
  error.value = false
  loading.value = true
  const [data, fetchErr] = await fetchAllAppData()
  console.log('Résultat fetchAllAppData:', data, fetchErr)

  if (fetchErr) {
    console.error('Erreur chargement données :', fetchErr)
    error.value = true
    setTimeout(async () => {
      router.push('/login')
    }, 3000)
  }
  store.setTeams(data.teams)
  store.setOperators(data.operators)
  store.setAccounts(data.accounts)
  loading.value = false
  if (role === 'admin') {
    router.push('/admin/dashboard')
  }
}
</script>
<template>
  <div
    class="h-screen w-screen bg-[url('/loginbg.jpg')] bg-cover bg-center flex items-center justify-center"
  >
    <div
      v-if="loading"
      class="p-4 bg-bg/50 backdrop-blur-md rounded-lg text-text p-10 text-center pb-5"
    >
      <h1 class="m-5 text-xl text-primary animate-bounce">
        Vous avez été connecté.<br />Patientez pendant la récupération des données.
      </h1>
    </div>
    <div v-else class="bg-bg/50 backdrop-blur-md rounded-lg text-text p-10 text-center pb-5">
      <h1 class="text-4xl">OPS</h1>
      <div
        class="flex items-center justify-center gap-2 text-xs bg-error text-text p-1 rounded-lg my-2"
        v-show="displayerror"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12">
          <path
            fill="currentColor"
            d="M5.214 1.459a.903.903 0 0 1 1.572 0l4.092 7.169c.348.61-.089 1.372-.787 1.372H1.91c-.698 0-1.135-.762-.787-1.372zM5.5 4.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0M6 6.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"
          />
        </svg>
        <p>{{ errorMessage }}</p>
      </div>
      <form @submit.prevent="onlogin">
        <div
          class="flex items-center gap-2 my-5 border-b-2 border-border focus-within:border-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" fill-opacity="0" d="M12 11l-8 -5h16l-8 5Z">
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.8s"
                dur="0.15s"
                values="0;0.3"
              />
            </path>
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                stroke-dasharray="64"
                stroke-dashoffset="64"
                d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"
              >
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
              </path>
              <path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.6s"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
            </g>
          </svg>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            class="ps-1 outline-none bg-transparent"
            v-model="email"
          />
        </div>
        <div
          class="flex items-center gap-2 my-5 border-b-2 border-border focus-within:border-primary"
        >
          <svg
            v-if="!showpassword"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            @click="showpassword = !showpassword"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="16" r="2" />
              <path
                stroke-linecap="round"
                d="M6 10V8q0-.511.083-1M18 10V8A6 6 0 0 0 7.5 4.031M11 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16s0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1"
              />
            </g>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            @click="showpassword = !showpassword"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="16" r="2" />
              <path
                stroke-linecap="round"
                d="M11 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16s0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1M6 10V8q0-.511.083-1m11.728-.5A6.003 6.003 0 0 0 7.528 4"
              />
            </g>
          </svg>
          <input
            :type="showpassword ? 'text' : 'password'"
            name="password"
            id="password"
            placeholder="Mot de passe"
            required
            class="ps-1 outline-none"
            v-model="password"
          />
        </div>
        <button
          type="submit"
          class="p-2 text-bg bg-primary rounded-lg hover:bg-primary-dark"
          :class="disablelogin ? 'animate-pulse' : ''"
          :disabled="disablelogin"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
