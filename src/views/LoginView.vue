<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getErrorMessage, fetchAllAppData, login, safeCall, updateStore } from '@/api'
import { saveProfile } from '@/utils/storage'
import { useAppStore } from '@/stores/app'
const router = useRouter()
const disablelogin = ref(false)
const displayerror = ref(false)
const email = ref('')
const errorMessage = ref('')
const password = ref('')
const showpassword = ref(false)
const stores = useAppStore()
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
      updateStore(stores)
      router.push(res.profile.role === 'admin' ? '/admin/dashboard/' : '')
    }
  }
  disablelogin.value = false
}
</script>
<template>
  <div class="h-screen w-screen bg-cover bg-center flex items-center justify-center bg-no-repeat" :style="{ backgroundImage: 'url(/loginbg.jpg)' }">
    <div class=" backdrop-blur-sm rounded-xl shadow-2xl h-[40%] w-[40%] max-w-lg p-10 text-center space-y-6 transition-all duration-300 transform hover:scale-105">
      <div class="flex justify-center mb-6">
        <img src="../assets/ops.png" alt="Logo" width="170" height="120" class="transition-transform duration-300 hover:rotate-12" />
      </div>
      <!-- Logo -->

      <!-- Error Message -->
      <div v-if="displayerror"
        class="flex items-center justify-center gap-2 px-4 py-2 text-xs text-text bg-error rounded-lg animate-fade-in-down"
        role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd" />
        </svg>
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="onlogin" class="space-y-6">
        <!-- Email Input -->
        <div class="relative group">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
          <input type="email" name="email" id="email" placeholder="Email" required v-model="email"
            class="w-full px-10 py-3 text-text bg-transparent border-b-2 border-border focus:border-primary outline-none transition-colors duration-300" />
        </div>

        <!-- Password Input -->
        <div class="relative group">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary cursor-pointer"
            @click="showpassword = !showpassword">
            <svg v-if="!showpassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          </span>
          <input :type="showpassword ? 'text' : 'password'" name="password" id="password" placeholder="Mot de passe" required
            v-model="password"
            class="w-full px-10 py-3 text-text bg-transparent border-b-2 border-border focus:border-primary outline-none transition-colors duration-300" />
        </div>

        <!-- Submit Button -->
        <button type="submit"
          class="w-full py-3 mt-4 font-semibold text-bg bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-md hover:shadow-lg hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          :disabled="disablelogin">
          {{ disablelogin ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
