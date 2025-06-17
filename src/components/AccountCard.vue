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
})
</script>
<template>
  <div>
    <div class="bg-[#222222] p-3">
      <h2>{{ name }}</h2>
      <div class="flex gap-2">
        <p>Team: {{ team }}</p>
      </div>
    </div>
  </div>
</template>
