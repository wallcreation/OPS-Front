<script setup>
const props = defineProps({
  fname: {
    type: String,
    default: 'fname',
  },
  lname: {
    type: String,
    default: 'lname',
  },
  team: {
    type: String,
    default: 'Équipes',
  },
})
</script>
<template>
  <div class="m-1 text-white">
    <p>{{ fname }} {{ lname }}</p>
    <small>{{ team }}</small>
  </div>
</template>
