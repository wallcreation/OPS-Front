<script setup>
const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="p-2 rounded">
    <!-- Informations de l'équipe -->
    <div class="flex justify-between">
        <h2 class="text-[#6C5CE7] text-5xl font-bold mb-1">{{ team.name }}</h2>
      <div class="flex gap-1 h-1/2">
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
    <div class="flex ">
      <p class="">Clé : {{ team.key }}</p>
      <p><span class="mx-1 text-gray-400">•</span></p>
      <p>{{ team.operators.length || 0 }} opérateurs</p>
      <p><span class="mx-1 text-gray-400">•</span></p>
      <p>{{ team.accounts.length || 0 }} comptes</p>
    </div>
    <!-- Opérateurs et Comptes -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
      <!-- Opérateurs -->
      <fieldset class="flex items-center gap-2 border-2 border-[#00B894] rounded-lg p-1">
        <legend class="text-[#00B894] text-center text-lg font-semibold mb-1">Opérateurs</legend>
        <p v-for="operator in team.operators" :key="operator">
          {{ operator }}
        </p>
      </fieldset>

      <!-- Comptes -->
      <fieldset class="flex items-center gap-2 border-2 border-[#E84393] rounded-lg p-1">
        <legend class="text-[#E84393] text-center text-lg font-semibold mb-1">Comptes</legend>
          <p v-for="account in team.accounts" :key="account">
            {{ account }}
          </p>
      </fieldset>
    </div>

    <!-- Statistiques -->
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm mt-4">
      <p><strong>Messages :</strong> {{ team.total_stat }}</p>
      <p><strong>Pénalités :</strong> {{ team.total_penality }}</p>
    </div>
  </div>
</template>
