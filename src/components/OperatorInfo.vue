<script setup>
const props = defineProps({
  operator: {
    type: Object,
    required: true,
  },
})
</script>
<template>
    <div>
        <div>
            <div>
                <h1 class="text-2xl font-bold text-[#6C5CE7]">{{ operator.lname }} {{ operator.fname }}</h1>
                <p class="text-sm">Équipe : {{ operator.team }}</p>
                <p class="text-sm">Travaille à : {{ operator.workat }}</p>
            </div>
        </div>
    </div>
</template>