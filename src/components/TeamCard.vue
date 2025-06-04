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
  <div class="bg-[#13223A] rounded-lg border-2 border-[#7C3AED] w-1/3">
    <div class="text-[#06B6D4] text-lg font-bold">
      {{ name }}
    </div>
    <div class="">
      <ul class="bg-[#2563EB]/50 rounded m-1">
        <li v-for="op in ops" :key="op.id" class="text-white text-sm px-1">{{ op.lname }}</li>
      </ul>
      <ul class="bg-[#048498]/50 rounded m-1">
        <li
          v-for="account in accounts"
          :key="account.id"
          class="text-white text-nowrap text-sm mx-1"
        >
          {{ account.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
