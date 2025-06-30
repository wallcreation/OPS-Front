<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  team_id: {
    type: Number,
    required: true,
  },
})
</script>
<template>
  <div>
    <div class="bg-surface rounded-lg border-2 border-border hover:border-primary p-2">
      <div class="flex justify-between items-center">
        <h2 class="text-primary font-bold">{{ name }}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          class="text-error"
        >
          <path
            fill="currentColor"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
          />
        </svg>
      </div>

      <div class="flex gap-2">
        <p>{{ team }}</p>
      </div>
    </div>
  </div>
</template>
