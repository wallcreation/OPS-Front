<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
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
const currentview = ref(1);
</script>
<template>
    <div class="max-w-full max-h-full px-2">
        <div
            class="w-full mt-2 grid gap-2 grid-cols-1 md:grid-cols-4 md:justify-between rounded-lg"
        >
            <div
                class="col-span-3 bg-surface rounded-lg border-2 border-border p-2"
            >
                <h1 class="text-5xl">{{ team.name }}</h1>
                <button
                    class="flex items-center hover:border-b-1 hover:border-primary-light"
                >
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
                            />
                        </svg>
                    </span>
                    <span class="">Editer l'équipe</span>
                </button>
            </div>
            <div
                class="flex gap-2 bg-surface rounded-lg border-2 border-border p-2"
            >
                <div>
                    <h2 class="mb-1 font-bold">Operateurs</h2>
                    <ul class="flex gap-2">
                        <li
                            v-for="operator in team.operators"
                            :key="operator"
                            class="mb-2 text-sm"
                        >
                            {{ operator }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-1 font-bold">Comptes</h2>
                    <ul class="flex gap-2">
                        <li
                            v-for="account in team.accounts"
                            :key="account"
                            class="mb-2 text-sm"
                        >
                            {{ account }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-2 p-1 mt-2 outline-2 outline-border rounded-lg"
        >
            <div class="w-full bg-surface rounded-lg p-3">
                <table class="w-full text-left">
                    <thead class="border-b-1 border-primary-light">
                        <tr>
                            <th>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    class="inline pb-1"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                                    />
                                </svg>
                            </th>
                            <th>Entrants</th>
                            <th>Pénalités</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="operator in team.operators"
                            :key="operator"
                            class="font-normal"
                        >
                            <th>{{ operator }}</th>
                            <th>50500</th>
                            <th>1024</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full bg-surface rounded-lg p-5">
                <h3></h3>
            </div>
        </div>
    </div>
</template>
