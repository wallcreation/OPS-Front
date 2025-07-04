<script setup>
import { ref } from 'vue'
import { safeCall } from '@/api'
import TeamSelector from './TeamSelector.vue'
const props = defineProps({
  showModal: Boolean,
  teams: Array,
})
const emit = defineEmits(['close'])
const close = async () => {
  emit('close')
}
const team = ref({ show: false, teamid: 0, textvalue: '', list: props.teams })
//mntconst teamipt = ref('')

const addteam = async () => {
  console.log('Team name:')
}
// const teamsel = ref(false)
const closetteamselector = async (name) => {
  team.value.show = false
  team.value.teamid = team.id
  team.value.textvalue = team.name
}
</script>
<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
  >
    <div
      class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border"
      :class="[team.show ? 'bg-surface' : 'backdrop-blur-md']"
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
          :value="team.textvalue"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
          @click="team.show = true"
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
    :show="team.show"
    :teamlist="team.list"
    @close="team.show = false"
    @select="closetteamselector"
  />
</template>
