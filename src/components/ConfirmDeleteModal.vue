<template>
    <div
      class="fixed inset-0 backdrop-blur-md bg-opacity-10 flex items-center justify-center z-50 p-4"
      @click.self="$emit('cancel')"
    >
      <div class="bg-zinc-900 rounded-lg border border-zinc-700 w-full max-w-md shadow-lg p-6">
        <h3 class="text-lg font-semibold text-white mb-2">
          Confirmation de suppression
        </h3>
        <p class="text-zinc-400 mb-6">
          Êtes-vous sûr de vouloir supprimer <span class="font-bold text-red-400">{{ itemName }}</span> ?
          Cette action est irréversible.
        </p>
  
        <div class="flex justify-end gap-3">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 text-sm font-medium rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition"
          >
            Annuler
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-500 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    itemName: {
      type: String,
      required: true,
    },
  })
  defineEmits(['confirm', 'cancel'])
  </script>
  