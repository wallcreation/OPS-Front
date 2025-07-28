<script setup>
import { computed, onMounted, ref } from 'vue'
import { getAccounts, refresh, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import { useNotificationStore } from '@/stores/notification'
import AccountAdd from '@/components/admin/AccountAdd.vue'
import AccountCard from '@/components/admin/AccountCard.vue'
const loading = ref(false)
const showAccountAdd = ref(false)
const stores = useAppStore()
const accounts = computed(() => stores.accounts)
async function foo() {
  const notification = useNotificationStore()
  notification.notify('Mise à jour de la liste des comptes')
  const [res, err] = await safeCall(getAccounts())
  if (res) {
    stores.setAccounts(res)
  }
}
onMounted(async () => {
  await foo()
})
</script>
<template>
  <div class="w-full h-full p-1 flex flex-col">
    <div class="p-1 flex justify-between items-center">
      <h1 class="text-xl font-bold text-primary">Liste des comptes</h1>
      <button
        @click="showAccountAdd = true"
        class="p-1 flex gap-1 items-center border-2 rounded-lg border-primary hover:border-primary-dark hover:bg-primary-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
          />
        </svg>
        <span class="hidden sm:inline">Ajouter</span>
      </button>
    </div>
    <div v-if="loading" class="flex-grow p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des comptes...</p>
    </div>
    <div
      v-else
      class="p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-auto"
    >
      <AccountCard
        v-for="account in accounts"
        :id="account.id"
        :name="account.name"
        :key="account.id"
      />
    </div>
  </div>
  <AccountAdd v-if="showAccountAdd" :teams="stores.teams" @close="showAccountAdd = false" />
</template>
