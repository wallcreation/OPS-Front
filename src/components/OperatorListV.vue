<script setup>
import OperatorCard from './OperatorCard.vue'
const props = defineProps({
  operators: {
    type: Array,
    default: [],
  },
})
</script>
<template>
  <div v-if="operators.length">
    <div class="bg-[#13223A]/50 rounded-lg">
      <h1 class="text-xl text-center text-white font-bold rounded-lg m-1 p-1 bg-[#2563EB]">Operateurs</h1>
      <OperatorCard
        v-for="operator in operators"
        :key="operator.id"
        :fname="operator.fname"
        :lname="operator.lname"
        :team="operator.team"
      />
    </div>
  </div>
  <div v-else>
    <h1 class="text-xl bg-[#EF4444] p-1 mx-4 my-1 rounded-lg text-white animate-pulse">
      Aucun operateurs.
    </h1>
  </div>
</template>
