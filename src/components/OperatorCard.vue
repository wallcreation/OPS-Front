<script setup>
import { ref } from 'vue'
const props = defineProps({
  id: Number,
  fname: String,
  lname: String,
  team: String,
  workat: String,
})
</script>
<template>
    <div class="bg-[#222222] p-3">
        <h2> {{ lname }} {{ lname }}</h2>
        <div class="flex gap-2">
            <p>{{ team }}</p>
            <p>{{ workat }}</p>
        </div>
    </div>
</template>
