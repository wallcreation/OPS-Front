<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'Compte',
  },
  team: {
    type: String,
    default: 'Équipes',
  },
})
</script>
<template>
  <div class="m-1">
    <p>{{ name }}</p>
    <small>{{ team }}</small>
  </div>
</template>
