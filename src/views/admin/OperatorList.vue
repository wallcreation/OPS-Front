<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import OperatorAdd from '@/components/admin/OperatorAdd.vue'
import OperatorCard from '@/components/admin/OperatorCard.vue'
import { getOperators, refresh, safeCall } from '@/api'
import { useNotificationStore } from '@/stores/notification'
const loading = ref(false)
const stores = useAppStore()
const operators = computed(() => stores.operators)
const showOperatorAdd = ref(false)

async function foo() {
  const notification = useNotificationStore()
  notification.notify("Mise à jour de la liste des opérateurs")
  const[res,err] = await safeCall(getOperators())
  if(res) stores.setOperators(res)
}

onMounted( async () => {
  await foo()
})

</script>
<template>
  <div class="w-full h-full p-1 flex flex-col">
    <div
      class="p-1 flex justify-between items-center"
    >
      <h1 class="text-xl font-bold text-primary">Gestion Des opérateurs</h1>
      <button
        @click="showOperatorAdd = true"
        class="p-1 flex gap-1 items-center border-2 rounded-lg border-primary hover:bg-primary-dark hover:border-primary-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
          />
        </svg>
        <span class="hidden sm:inline">Nouvel opérateur</span>
      </button>
    </div>
    <div v-if="loading" class="flex-grow p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des opérateurs...</p>
    </div>
    <div
      v-else
      class="p-2 grid gap-2 grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 overflow-auto"
    >
      <OperatorCard
        v-for="operator in operators"
        :key="operator.id"
        :id="operator.id"
        :lname="operator.lname"
        :fname="operator.fname"
        :team="stores.getTeamById(operator.team_id).name || 'Inconnu'"
        :team_id="operator.team_id"
        :work_at="operator.work_at"
        :code="operator.code"
      />
    </div>
  </div>
  <OperatorAdd v-if="showOperatorAdd" @close="showOperatorAdd = false" />
</template>
