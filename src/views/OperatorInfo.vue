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
    <div class="grid grid-cols-1 gap-2 md:grid-cols-4 mt-2">
        <div class="md:col-span-2 p-2 bg-surface border-2 border-border rounded-lg">
            <h1 class="text-5xl">{{ operator.fname }} {{ operator.lname }}</h1>
            <div class="flex gap-2">
                <p>{{ operator.email }}</p>
                <p>{{ operator.team }}</p>
                <button>Editer l'opérateur</button>
            </div>
        </div>
        <div class="bg-surface p-2 border-2 border-border rounded-lg">
            <h1>Statistiques</h1>
        </div>
        <div class="bg-surface p-2 border-2 border-border rounded-lg">
            <h1>Pénalités</h1>
        </div>
    </div>
</template>