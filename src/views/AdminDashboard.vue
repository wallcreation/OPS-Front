<script setup>
import { getdashboard, safeCall } from '@/api'
import Reconnect from '@/components/Reconnect.vue'
import { onMounted, ref } from 'vue'
const data = ref({
  teams: 0,
  operators: 0,
  accounts: 0,
})
const loading = ref(true)
const error = ref(false)
const reload = ref(false)
const foo = async () => {
  reload.value = false
  const [res, err] = await safeCall(getdashboard())
  if (err) {
    console.log("err: ", err)
    if (err.code === 1003) {
      error.value = true
    } else {
      reload.value = true
    }
  } else {
    console.log("res :", res)
    data.value = res
    loading.value = false
  }
}
onMounted(async () => {
  await foo()
})
</script>
<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 text-center"
  :class="loading ? 'animate-pulse' : ''">
    <div
      class="flex items-center justify-center m-2 bg bg-surface border-2 border-border rounded-lg"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ data.teams }}
        </h1>
        <p>Equipes</p>
      </div>
    </div>
    <div
      class="flex items-center justify-center m-2 bg bg-surface border-2 border-border rounded-lg"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ data.operators }}
        </h1>
        <p>Opérateurs</p>
      </div>
    </div>
    <div
      class="flex items-center justify-center md:col-span-2 m-2 bg bg-surface border-2 border-border rounded-lg"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ data.accounts }}
        </h1>
        <p>Comptes</p>
      </div>
    </div>
  </div>
  <!-- Reconnect modal -->
  <Reconnect v-if="error" />
  <!-- Reload data modal -->
  <div v-if="reload" class="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-surface/50 backdrop-blur-md">
    <h2 class="col-span-2">Impossible de joindre le servver, recharger la page ?</h2>
    <div>
      <button
        @click="foo()"
        class="mx-1 px-5 py-2 border-2 border-primary rounded-lg hover:bg-primary-dark hover:text-bg hover:border-none active:bg-primary-dark active:text-bg active:border-none"
      >
        Oui
      </button>
      <button
      @click="reload = false"
        class="mx-1 px-5 py-2 border-2 border-error rounded-lg hover:bg-error-dark hover:text-bg hover:border-none active:bg-error-dark active:text-bg active:border-none"
      >
        Non
      </button>
    </div>
  </div>
</template>
