<script setup>
import { getdashboard, safeCall } from '@/api'
import Reconnect from '@/components/Reconnect.vue'
import Reload from '@/components/Reload.vue'
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
  <Reload :show="reload" @accept="foo()" @cancel="reload = false" />
</template>
