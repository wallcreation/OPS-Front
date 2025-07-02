<script setup>
import { computed, onMounted, ref } from 'vue'
import { getaccounts, safeCall } from '@/api'
import { useAppStore } from '@/stores/app'
import Reconnect from '@/components/Reconnect.vue'
import Reload from '@/components/Reload.vue'
import AccountCard from '@/components/admin/AccountCard.vue'
const error = ref(false)
const loading = ref(true)
const reload = ref(false)
const stores = useAppStore()
const account = computed(() => stores.accounts)
const foo = async () => {
  reload.value = false
  const [res, err] = await safeCall(getaccounts())
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
    accounts.value = res
    stores.setAccounts(res)
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
      <h1 class="text-xl font-bold text-primary">Liste des comptes</h1>
      <button
        class="flex gap-1 items-center hover:text-primary hover:border-b-2 hover:border-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17 14h2v3h3v2h-3v3h-2v-3h-3v-2h3zM10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v5.53A5.97 5.97 0 0 0 18 12a6 6 0 0 0-6 6c0 1.09.29 2.12.8 3H4a2 2 0 0 1-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2m4 4V4h-4v2z"
          />
        </svg>
        <span class="hidden sm:inline">Ajouter</span>
      </button>
    </div>
    <div v-if="loading" class="h-[90%] p-5 flex gap-2 items-center justify-center">
      <p class="animate-bounce">Chargement des comptes...</p>
    </div>
    <div v-else class="h-[90%] p-2 grid gap-1 grid-cols-1 md:grid-cols-3 overflow-auto">
      <AccountCard
        v-for="account in accounts"
        :id="account.id"
        :name="account.name"
        :team="account.team"
        :team_id="account.team_id"
      />
    </div>
  </div>
  <Reconnect v-if="error" />
  <Reload :show="reload" @accept="foo()" @cancel="reload = false" />
</template>
