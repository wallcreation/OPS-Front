<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const operatorid = route.params.id
console.log("operator id", operatorid)
const operator = ref({
    lname: "Smith",
    fname: "Smith",
    email: "exemple@email.com",
    wortat: "Jour",
    team: "Team A"
})
</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-4">
        <h1>{{ fname }}</h1>
    </div>
</template>