<script setup>
import { computed, onMounted, ref } from 'vue'
import { getAccounts, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import { useNotificationStore } from '@/stores/notification'
import AccountAdd from '@/components/admin/AccountAdd.vue'
import 'primeicons/primeicons.css'
import AccountCard from '@/components/admin/AccountCard.vue'

const loading = ref(true)
const showAccountAdd = ref(false)
const stores = useAppStore()
const accounts = computed(() => stores.accounts)

const fetchAccounts = async () => {
  const notification = useNotificationStore()
  notification.notify('Mise à jour de la liste des comptes...')
  const [res] = await safeCall(getAccounts())
  if (res) {
    stores.setAccounts(res)
  }
  loading.value = false
}

onMounted(async () => {
  await fetchAccounts()
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 p-4 bg-zinc-900 text-white">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Gestion des comptes</h1>
      <button
        @click="showAccountAdd = true"
        class="flex items-center gap-2 px-4 py-2 border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-white transition"
      >
        <i class="pi pi-plus text-base"></i>
        <span class="hidden sm:inline">Nouveau compte</span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-grow flex items-center justify-center py-10">
      <p class="text-zinc-400 animate-pulse">Chargement des opérateurs...</p>
    </div>

    <!-- Operators Grid -->
    <div
      v-else
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-auto"
    >
      <AccountCard
        v-for="account in accounts"
        :key="account.id"
        :id="account.id"
        :name="account.name"
      />
    </div>

    <!-- Modal -->
    <AccountAdd
      v-if="showAccountAdd"
      @close="showAccountAdd = false"
    />
  </div>
</template>
