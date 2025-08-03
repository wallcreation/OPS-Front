<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import ConfirmDeleteModal from '../ConfirmDeleteModal.vue'
import 'primeicons/primeicons.css'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const showConfirmModal = ref(false)
const editing = ref(false)
const editedName = ref(props.name)
const deleting = ref(false)
const updating = ref(false)
const stores = useAppStore()

const askDelete = () => {
  showConfirmModal.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  showConfirmModal.value = false
  try {
    await stores.deleteAccountAPI(props.id)
  } catch (e) {
    console.error('Suppression échouée', e)
    deleting.value = false
  }
}

const startEdit = () => {
  editing.value = true
  editedName.value = props.name
}

const cancelEdit = () => {
  editing.value = false
  editedName.value = props.name
}

const confirmEdit = async () => {
  if (editedName.value.trim() === '' || editedName.value === props.name) {
    editing.value = false
    return
  }

  updating.value = true
  try {
    await stores.editAccountAPI(props.id, { name: editedName.value })
    editing.value = false
  } catch (e) {
    console.error('Échec de la mise à jour', e)
  } finally {
    updating.value = false
  }
}
</script>

<template>
  <div
    class="relative flex flex-col gap-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
  >
    <!-- Header -->
    <div class="flex justify-between items-start gap-2">
      <div class="flex-1">
        <div v-if="!editing" class="flex items-center gap-2">
          <RouterLink
            :to="{ name: 'account-info', params: { id: props.id } }"
            class="text-xl font-semibold text-primary-400 hover:underline break-words"
          >
            {{ props.name }}
          </RouterLink>
        </div>

        <div v-else class="flex items-center gap-2">
          <input
            v-model="editedName"
            type="text"
            class="flex-1 px-3 py-1.5 text-sm rounded-md bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
            placeholder="Nouveau nom"
          />
        </div>
      </div>
    </div>

    <!-- Footer : actions -->
    <div class="flex gap-2 justify-end w-full">
      <!-- Modifier / Valider -->
      <button
        @click="editing ? confirmEdit() : startEdit()"
        :disabled="updating"
        class="px-4 py-2 flex items-center w-[50%] justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent rounded-lg text-sm font-semibold transition disabled:opacity-50"
      >
        <i :class="editing ? 'pi pi-check' : 'pi pi-pencil'" class="text-sm"></i>
        {{ editing ? 'Valider' : 'Modifier' }}
      </button>

      <!-- Supprimer / Annuler -->
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
      :itemName="props.name"
      @confirm="confirmDelete"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>
