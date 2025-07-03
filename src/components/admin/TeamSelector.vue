<!-- components/TeamSelector.vue -->
<script setup>
const props = defineProps({
  show: Boolean,
  teamlist: Array,
})
const emit = defineEmits(['close', 'select'])

const chooseTeam = (team) => {
  emit('select', team)
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50">
    <div
      class="mx-5 px-5 py-2 max-w-lg grid gap-2 grid-cols-2 rounded-lg backdrop-blur-md border-1 border-border"
    >
      <button
        @click="emit('close')"
        class="col-span-2 bg-error text-bold rounded-lg text-center active:bg-error-dark hover:bg-error-dark"
      >
        Fermer
      </button>
      <div
        v-for="team in teamlist"
        :key="team.id"
        @click="chooseTeam(team)"
        class="p-1 text-center hover:border-b-2 hover:border-primary"
      >
        {{ team.name }}
      </div>
    </div>
  </div>
</template>
