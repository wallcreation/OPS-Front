<script setup>
const props = defineProps({
  teamlist: Array,
})
const emit = defineEmits(['close', 'select'])

const chooseTeam = (team) => {
  emit('select', team)
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 p-4"
    @click.self="emit('close')"
  >
    <div
      class="w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-6 text-white"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">Sélectionner une équipe</h2>
      </div>

      <!-- Team Grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
      >
        <button
          v-for="team in teamlist"
          :key="team.id"
          @click="chooseTeam(team)"
          class="w-full text-center px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-primary hover:text-white transition cursor-pointer truncate"
        >
          {{ team.name }}
        </button>
      </div>

      <!-- Footer -->
      <div class="mt-6 flex justify-end">
        <button
          @click="emit('close')"
          class="px-4 py-2 rounded-md border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
