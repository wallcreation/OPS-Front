<script setup>
import AccountChart from '@/components/AccountChart.vue'
const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="p-2">
    <div class="flex items-center justify-between">
      <h1 class="text-5xl font-bold text-[#E84393]">{{ account.name }}</h1>
      <div class="flex items-center gap-1">
        <button
          class="flex items-center justify-center p-1 hover:border-b-2 hover:border-[#3B91F9]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-[#3B91F9] fill-current mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <span class="md:inline hidden ms-1">Modifier</span>
        </button>
        <button
          class="flex items-center justify-center p-1 hover:border-b-2 hover:border-[#EB5757]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-[#EB5757] fill-current mx-auto"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span class="md:inline hidden">Supprimer</span>
        </button>
      </div>
    </div>
    <p class="inline text-sm">{{ account.team }}</p>
    <p class="inline text-sm"><span class="mx-2 text-gray-400">•</span></p>
    <p class="inline text-sm">Total : {{ account.stats.total }}</p>
  </div>
  <div>
    <AccountChart :account="account" />
  </div>
</template>
