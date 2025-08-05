<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  stores: Object,
})

const emit = defineEmits(['close'])

const teamipt = ref('')
const editteam = async () => {
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

const operators = ref({selectedId:[], show:false, list: props.stores.operators})

function toggleOperator(id) {
  const index = operators.value.selectedId.indexOf(id)
  if (index === -1) {
    operators.value.selectedId.push(id)
  } else {
    operators.value.selectedId.splice(index, 1)
  }
}

const selected = computed(() => {
  return operators.value.selectedId
    .map(id => {
      const operator = operators.value.list.find(op => op.id === id)
      return operator ? `${operator.fname} ${operator.lname}` : null
    })
    .filter(Boolean)
    .join(', ')
})

</script>
<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
  >
    <div class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border bg-surface">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Modifier l'équipe</h1>
        <button @click="emit('close')" class="text-error hover:text-error-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
            />
          </svg>
        </button>
      </div>
      <form action="" class="my-2 grid gap-2 grid-cols-2">
        <input
          type="text"
          name="tname"
          id="tname"
          required
          placeholder="Nom de l'équipe"
          :value="teamipt"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
        />
        <input
          type="text"
          id="operatorslist"
          name="operatorslist"
          placeholder="Ajouter un opérateur"
          :value="selected"
          class="w-full border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none"
          @click="operators.show = true"
        />
      </form>
      <div class="flex p-2 gap-4 justify-end mt-1">
        <button
          @click="editteam"
          class="px-2 outline-2 outline-primary outline-offset-2 rounded hover:bg-primary-dark hover:outline-primary-dark"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="operators.show"
    class="fixed inset-0 z-50 w-full h-full p-5 flex items-center justify-center bg-bg/50"
  >
    <div
      class="p-2 my-auto flex flex-col gap-2 justify-center items-center border-2 border-border rounded-lg backdrop-blur-md"
    >
      <button
        @click="operators.show = false"
        class="px-4 py-1 outline-2 outline-error outline-offset-2 rounded-lg active:bg-error-dark active:outline-error-dark hover:bg-error-dark hover:outline-error-dark"
      >
        Fermer
      </button>
      <div class="flex flex-wrap gap-2 justify-center items-center">
        <div
          v-for="op in operators.list"
          :key="op.id"
          class="p-1 rounded-lg active:outline-2 active:outline-primary-dark active:outline-offset-2 hover:outline-2 hover:outline-primary-dark hover:outline-offset-2"
          :class="operators.selectedId.includes(op.id) ? 'bg-primary-dark' : ''"
          @click="toggleOperator(op.id)"
        >
          {{ op.fname }} {{ op.lname }}
        </div>
      </div>
    </div>
  </div>
</template>
