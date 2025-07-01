<script setup>
import { loadProfile } from '@/utils/storage'
import { fetchAllAppData, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const error = ref(false)
const loading = ref(true)
const router = useRouter()
const store = useAppStore()
const profile = loadProfile()
const foo = async () => {
  console.log("profile: ",profile)
  error.value = false
  const [data, fetchErr] = await fetchAllAppData()
  console.log('Résultat fetchAllAppData:', data, fetchErr)

  if (fetchErr) {
    console.error('Erreur chargement données :', fetchErr)
    error.value = true
    setTimeout(async () => {
      router.push("/login")
    }, 3000)
  }
  store.setTeams(data.teams)
  store.setOperators(data.operators)
  store.setAccounts(data.accounts)
  loading.value = false
  console.log("profile: ",profile)
  if (profile.role === "admin") {
    router.push("/admin/dashboard")
  }
}
onMounted( async () => {
  await foo()
})
</script>
<template>
  <div class="w-screen h-screen fixed inset-0 z-50 bg-surface/50 flex items-center justify-center">
    <div v-if="error" class="p-5 border-2 border-error rounded-lg">
      <h1 class="text-error text-xl">Erreur du chargement des ressources</h1>
    </div>
    <div v-else class="p-5 border-2 border-border rounded-lg">
      <h1 class="text-primary text-center  text-xl animate-bounce">Chargement des ressources, ceci peut prendre quelques secondes.<br/>Veuillez patienter...</h1>
    </div>
  </div>
</template>
