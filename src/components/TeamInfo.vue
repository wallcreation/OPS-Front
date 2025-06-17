<script setup>
const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="p-4 space-y-4 rounded text-center">
    <!-- Informations de l'équipe -->
    <div class="">
      <h2 class="text-[#6C5CE7] text-5xl font-bold mb-1">{{ team.name }}</h2>
      <p class="text-xs">Clé : {{ team.key }}</p>
      <div class="flex justify-center gap-1">
        <button class="rounded-lg border-2 border-[#3B91F9] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6  text-[#3B91F9]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button class="rounded-lg border-2 border-[#EB5757] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-[#EB5757]"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Opérateurs et Comptes -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
      <!-- Opérateurs -->
      <div>
        <h3 class="text-[#00B894] text-2xl font-semibold mb-1 underline">Opérateurs</h3>
        <div class="">
          <p v-for="operator in team.operators" :key="operator">
            {{ operator }}
          </p>
        </div>
      </div>

      <!-- Comptes -->
      <div>
        <h3 class="text-[#E84393] text-2xl font-semibold mb-1 underline">Comptes</h3>
        <div class="">
          <p v-for="account in team.accounts" :key="account">
            {{ account }}
          </p>
        </div>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm mt-4">
      <p><strong>Messages :</strong> {{ team.total_stat }}</p>
      <p><strong>Pénalités :</strong> {{ team.total_penality }}</p>
    </div>
  </div>
</template>
