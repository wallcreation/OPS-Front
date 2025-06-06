<script setup>
import AccountCard from './AccountCard.vue'
const props = defineProps({
  accounts: {
    type: Array,
    default: [],
  },
})
</script>
<template>
  <div v-if="accounts.length">
    <div class="bg-[#13223A]/50 rounded-lg text-white">
      <h1 class="text-2xl">Comptes</h1>
      <AccountCard
        v-for="account in accounts"
        :key="account.id"
        :name="account.name"
        :team="account.team"
      />
    </div>
  </div>
  <div v-else>
    <h1 class="text-xl bg-[#EF4444] p-1 mx-4 my-1 rounded-lg text-white animate-pulse">
      Aucun comptes.
    </h1>
  </div>
</template>
