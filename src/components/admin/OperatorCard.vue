<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import ConfirmDeleteModal from '../ConfirmDeleteModal.vue'
import 'primeicons/primeicons.css'

const props = defineProps({
  id: String,
  fname: String,
  lname: String,
  team: String,
  team_id: Number,
  work_at: String,
  code: String,
})

const stores = useAppStore()

const showConfirmModal = ref(false)
const editing = ref(false)
const deleting = ref(false)
const updating = ref(false)

const editedFname = ref(props.fname)
const editedLname = ref(props.lname)

const askDelete = () => {
  showConfirmModal.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  showConfirmModal.value = false
  try {
    await stores.deleteOperatorAPI(props.id)
  } catch (e) {
    console.error('Erreur suppression :', e)
    deleting.value = false
  }
}

const startEdit = () => {
  editing.value = true
}

const cancelEdit = () => {
  editing.value = false
  editedFname.value = props.fname
  editedLname.value = props.lname
}

const confirmEdit = async () => {
  if (
    (editedFname.value.trim() === props.fname && editedLname.value.trim() === props.lname) ||
    !editedFname.value.trim() ||
    !editedLname.value.trim()
  ) {
    editing.value = false
    return
  }

  updating.value = true
  try {
    await stores.editOperatorAPI({
      id: props.id,
      fname: editedFname.value,
      lname: editedLname.value,
    })
    editing.value = false
  } catch (e) {
    console.error('Erreur mise à jour :', e)
  } finally {
    updating.value = false
  }
}
</script>

<template>
  <div
    class="relative flex flex-col gap-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
  >
    <!-- Suppression -->
    <div
      v-if="deleting"
      class="absolute inset-0 bg-error/30 rounded-2xl flex items-center justify-center z-10"
    >
      <p class="text-error font-bold animate-pulse">Suppression en cours...</p>
    </div>

    <!-- Header -->
    <div class="flex justify-between items-start gap-2">
      <div class="flex-1 space-y-1">
        <!-- Affichage normal -->
        <div v-if="!editing">
          <RouterLink
            :to="{ name: 'operator-info', params: { id: props.id } }"
            class="text-xl font-semibold text-primary-400 hover:underline break-words"
          >
            {{ props.lname }} {{ props.fname }}
          </RouterLink>
        </div>

        <!-- Mode édition -->
        <div v-else class="flex flex-col sm:flex-row gap-2 w-full flex-wrap">
          <input
            v-model="editedLname"
            placeholder="Nom"
            class="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-md bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
          <input
            v-model="editedFname"
            placeholder="Prénom"
            class="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-md bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>
      </div>
    </div>

    <!-- Infos supplémentaires -->
    <div class="flex flex-wrap gap-2 text-sm text-muted">
      <RouterLink
        :to="{ name: 'team-info', params: { id: team_id } }"
        class="text-primary underline hover:text-primary-light transition"
      >
        {{ team }}
      </RouterLink>

      <span class="flex items-center gap-1">
        <span v-if="work_at === 'Jour'" class="text-yellow-400"><i class="pi pi-sun"></i></span>
        <span v-else class="text-blue-400"><i class="pi pi-moon"></i></span>
        {{ work_at }}
      </span>

      <span class="ml-auto text-xs text-zinc-400 font-mono">#{{ code }}</span>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 justify-end w-full">
      <button
        @click="editing ? confirmEdit() : startEdit()"
        :disabled="updating"
        class="px-4 py-2 flex items-center w-[50%] justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent rounded-lg text-sm font-semibold transition disabled:opacity-50"
      >
        <i :class="editing ? 'pi pi-check' : 'pi pi-pencil'" class="text-sm"></i>
        {{ editing ? 'Valider' : 'Modifier' }}
      </button>

      <button
        @click="editing ? cancelEdit() : askDelete()"
        :disabled="updating"
        class="px-4 py-2 flex items-center w-[50%] justify-center gap-2 border border-red-500 text-red-400 hover:bg-red-600 hover:text-white hover:border-transparent rounded-lg text-sm font-semibold transition disabled:opacity-50"
      >
        <i :class="editing ? 'pi pi-times' : 'pi pi-trash'" class="text-sm"></i>
        {{ editing ? 'Annuler' : 'Supprimer' }}
      </button>
    </div>

    <!-- Modale de confirmation -->
    <ConfirmDeleteModal
      v-if="showConfirmModal"
      :itemName="`${props.lname} ${props.fname}`"
      @confirm="confirmDelete"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>
