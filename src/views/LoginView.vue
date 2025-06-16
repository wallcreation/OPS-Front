<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const displayerror = ref(false)
const disablelogin = ref(false)
const email = ref('')
const password = ref('')
const onlogin = async () => {
  disablelogin.value = true
  if (!email.value || !password.value) {
    displayerror.value = true
    setInterval(() => {
      displayerror.value = false
    }, 5000)
    return
  }
  await axios
    .post('http://localhost:8000/login', {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log('Login response:', response)
      if (response.status === 200) {
        if (response.data.status) {
          localStorage.setItem('token', response.data.token)
          if (response.data.role === 'admin') {
            router.push('/admin/dashboard')
          }
        } else {
          displayerror.value = true
          setInterval(() => {
            displayerror.value = false
          }, 5000)
        }
      }
    })
    .catch((error) => {
      console.error('Login error:', error)
      displayerror.value = true
      setInterval(() => {
        displayerror.value = false
      }, 5000)
    })
    disablelogin.value = false
}
</script>
<template>
  <div
    class="h-screen w-screen bg-[url('/loginbg.jpg')] bg-cover bg-center flex items-center justify-center"
  >
    <div class="bg-gray-900/60 rounded-lg text-white p-10 text-center pb-5">
      <h1 class="text-4xl">OPS</h1>
      <div
        class="flex items-center justify-center gap-2 text-xs bg-[#EF4444] p-1 rounded-lg my-2"
        v-show="displayerror"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        <p>Identifitans incorrect.</p>
      </div>
      <form @submit.prevent="onlogin">
        <div class="flex gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            class="border-b-2 border-[#2563EB] ouline-none focus:outline-none focus:border-[#06B6D4]"
            v-model="email"
          />
        </div>
        <div class="flex gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            required
            class="border-b-2 border-[#2563EB] outline-none focus:outline-none focus:border-[#06B6D4]"
            v-model="password"
          />
        </div>
        <button type="submit" class="p-2 mt-5 bg-[#2563EB] rounded-lg hover:bg-[#06B6D4]" v-show="!disablelogin">
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
