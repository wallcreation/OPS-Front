<script setup>
import TeamSelector from './TeamSelector.vue'
import { ref } from 'vue'
const props = defineProps({
  showModal: Boolean,
})
const emit = defineEmits(['close'])
const close = async () => {
  emit('close')
}
const teamipt = ref('')
const addteam = async () => {
  console.log('Team name:')
}
const teamsel = ref(false)
const closetteamselector = async (name) => {
  teamipt.value = name
  teamsel.value = false
}
const teamlist = [
  'Team 1',
  'Team 2',
  'Team 3',
  'Team 4',
  'Team 5',
  'Team 6',
  'Team 7',
  'Team 8',
  'Team 9',
  'Team 10',
]
</script>
<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50">
    <div
      class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border"
      :class="[teamsel ? 'bg-surface' : 'backdrop-blur-md']"
    >
      <h1 class="text-xl font-bold">Ajouter un compte</h1>
      <form action="" class="my-2 grid gap-2 grid-cols-1 md:grid-cols-2">
        <input
          type="text"
          name="aname"
          id="aname"
          required
          placeholder="Nom"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="text"
          name="team"
          id="team"
          placeholder="Equipe"
          :value="teamipt"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
          @click="teamsel = true"
        />
      </form>
      <div class="flex gap-2 justify-end mt-1">
        <button @click="addteam" class="text-primary hover:border-b-2 hover:border-primary">
          Valider
        </button>
        <button @click="close" class="text-error hover:border-b-2 hover:border-error">
          Annuler
        </button>
      </div>
    </div>
  </div>
  <TeamSelector
    :show="teamsel"
    :teamlist="teamlist"
    @close="teamsel = false"
    @select="closetteamselector"
  />
</template>
