<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  showModal: Boolean,
})
const emit = defineEmits(['close'])
const close = async () => {
  emit('close')
}
const teamipt = ref('')
const addteam = async () => {
  console.log('Team name:', teamipt.value)
}
const showoplist = ref(false)

const oplist = ref([
  { id: 1, fname: 'Alice', lname: 'Dupont' },
  { id: 2, fname: 'Bob', lname: 'Martin' },
  { id: 3, fname: 'Charlie', lname: 'Bernard' },
  { id: 4, fname: 'Diana', lname: 'Thomas' },
  { id: 5, fname: 'Eve', lname: 'Petit' },
  { id: 6, fname: 'Frank', lname: 'Robert' },
  { id: 7, fname: 'Grace', lname: 'Richard' },
  { id: 8, fname: 'Heidi', lname: 'Durand' },
])

const opselected = ref([])

// const toggleOp = async (id) => {
//  if (opselected.value.includes(id)) {
//    opselected.value = opselected.value.filter((opId) => opId !== id)
//  } else {
//    opselected.value.push(id)
//  }
//}

const toggleOp = (op) => {
  const exists = opselected.value.find((o) => o.id === op.id)
  if (exists) {
    opselected.value = opselected.value.filter((o) => o.id !== op.id)
  } else {
    opselected.value.push(op)
  }
}

// Texte concaténé pour l’input
const selectedNames = computed(() =>
  opselected.value.map((op) => `${op.fname} ${op.lname}`).join(', '),
)
</script>
<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
  >
    <div class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border bg-surface">
      <h1 class="text-xl font-bold">Modifier l'équipe</h1>
      <form action="" class="my-2 grid gap-2 grid-cols-2">
        <input
          type="text"
          name="tname"
          id="tname"
          required
          placeholder="Nom de l'équipe"
          :value="teamipt"
          class="col-span-2 border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="text"
          id="operatorslist"
          name="operatorslist"
          placeholder="Ajouter un opérateur"
          :value="selectedNames"
          class="w-full border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
          @click="showoplist = true"
        />
        <input
          type="text"
          id="accountslist"
          name="accountslist"
          placeholder="Ajouter un compte"
          class="w-full border-b-2 border-border active:border-primary hover:border-primary-dark outline-none"
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
  <div
    v-if="showoplist"
    class="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-bg/50"
  >
    <div
      class="p-2 grid gap-2 grid-cols-2 justify-center items-center border-2 border-border rounded-lg backdrop-blur-md"
    >
      <button
        @click="showoplist = false"
        class="col-span-2 bg-error rounded-lg active:bg-error-dark hover:bg-error-dark"
      >
        Fermer
      </button>
      <div
        v-for="op in oplist"
        :key="op.id"
        class="active:border-b-2 active:border-primary hover:border-b-2 hover:border-primary"
        :class="opselected.includes(op) ? 'border-b-2 border-primary' : ''"
        @click="toggleOp(op)"
      >
        {{ op.fname }} {{ op.lname }}
      </div>
    </div>
  </div>
</template>
