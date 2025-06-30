<script setup>
import { onMounted, ref } from 'vue'
import OperatorCard from '@/components/admin/OperatorCard.vue'
import Reconnect from '@/components/Reconnect.vue'
import Reload from '@/components/Reload.vue'
import { getoperators, safeCall } from '@/api'
const error = ref(false)
const loading = ref(true)
const operators = ref([])
const reload = ref(false)
const foo = async () => {
  reload.value = false
  const [res, err] = await safeCall(getoperators())
  if (err) {
    console.log('err: ', err)
    if (err.code === 1003) {
      error.value = true
    } else {
      reload.value = true
    }
  } else {
    loading.value = false
    console.log('res: ', res)
    operators.value = res
  }
}
onMounted(async () => {
    await foo()
})
</script>
<template>
  <div class="w-full h-full p-1">
    <div
      class="h-[10%] p-1 flex justify-between items-center border-1 border-border bg-surface rounded-lg"
    >
      <h1 class="text-xl font-bold text-primary">Liste des opérateurs</h1>
      <button class="hover:text-primary hover:border-b-2 hover:border-primary">Ajouter</button>
    </div>
    <div v-if="loading" class="h-[90%] p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des opérateurs...</p>
    </div>
    <div
      v-else
      class="h-[90%] p-2 grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-auto"
    >
      <OperatorCard
        v-for="operator in operators"
        :key="operator.id"
        :id="operator.id"
        :lname="operator.lname"
        :fname="operator.fname"
        :team="operator.team"
        :team_id="operator.team_id"
        :workat="operator.workat"
      />
    </div>
  </div>
  <Reconnect v-if="error" />
  <Reload :show="reload" @accept="foo()" @cancel="reload = false" />
</template>
