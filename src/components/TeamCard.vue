<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'Équipes',
  },
  ops: {
    type: Array,
    default: [],
  },
  accounts: {
    type: Array,
    default: [],
  },
})
</script>
<template>
  <div class="bg-[#13223A] rounded-lg border-2 border-[#7C3AED] p-2">
    <div class="text-[#06B6D4] text-xl font-bold">
      {{ name }}
    </div>
    <div class="flex gap-2">
      <ul class="">
        <li v-for="op in ops" :key="op.id" class="text-white text-sm">{{ op.lname }}</li>
      </ul>
      <ul class="">
        <li v-for="account in accounts" :key="account.id" class="text-white text-sm">
          {{ account.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
