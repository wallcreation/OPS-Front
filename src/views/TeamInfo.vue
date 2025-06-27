<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TeamEdit from "@/components/admin/TeamEdit.vue"
const route = useRoute();
const teamid = route.params.id;
onMounted(async () => {
    console.log("team id ", teamid);
});
const team = ref({
    id: 1,
    name: "Team A",
    operators: ["Alice", "Bob"],
    accounts: ["Account1", "Account2"]
});
const currentview = ref(1)
const showedit = ref(false)
</script>
<template>
    <section class="w-full mt-2 grid gap-2 grid-cols-1 md:grid-cols-4">
        <section
            class="md:col-span-2 p-2 flex gap-2 justify-between bg-surface rounded-lg border-2 border-border"
        >
            <h1 class="text-5xl text-primary">{{ team.name }}</h1>
            <button
            @click="showedit = true"
            class="active:text-primary hover:text-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
                    />
                </svg>
            </button>
        </section>
        <section class="p-2 bg-surface rounded-lg border-2 border-border">
            <h2 class="text-primary font-bold underline">Opérateurs</h2>
            <div class="flex flex-wrap gap-1">
                <p v-for="operator in team.operators" :key="operator">
                    {{ operator }}
                </p>
            </div>
        </section>
        <section class="p-2 bg-surface rounded-lg border-2 border-border">
            <h2 class="text-primary font-bold underline">Comptes</h2>
            <div class="flex flex-wrap gap-1">
                <p v-for="account in team.accounts" :key="account">
                    {{ account }}
                </p>
            </div>
        </section>
        <section
            class="md:col-span-2 p-2 bg-surface border-2 border-border rounded-lg"
        >
            <h3>Détails des stats</h3>
            <div class="grid gap-2 grid-cols-2"></div>
        </section>
        <section
            class="md:col-span-2 p-2 bg-surface border-2 border-border rounded-lg"
        >
            <h3>Détails des pénalités</h3>
            <div class="grid gap-2 grid-cols-2"></div>
        </section>
    </section>
    <TeamEdit :showModal="showedit" @close="showedit = false"/>
</template>
