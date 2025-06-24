<script setup>
import { ref } from "vue";
const teams = ref([
    {
        id: 1,
        name: "Team A",
        operators: ["Alice", "Bob"],
        accounts: ["Account1", "Account2"]
    },
    {
        id: 2,
        name: "Team B",
        operators: ["Charlie", "David"],
        accounts: ["Account3", "Account4"]
    },
    {
        id: 3,
        name: "Team C",
        operators: ["Eve", "Frank"],
        accounts: ["Account5", "Account6"]
    },
    {
        id: 4,
        name: "Team D",
        operators: ["Grace", "Heidi"],
        accounts: ["Account7", "Account8"]
    },
    {
        id: 5,
        name: "Team E",
        operators: ["Ivan", "Judy"],
        accounts: ["Account9", "Account10"]
    },
    {
        id: 6,
        name: "Team F",
        operators: ["Karl", "Leo"],
        accounts: ["Account11", "Account12"]
    },
    {
        id: 7,
        name: "Team G",
        operators: ["Mallory", "Nina"],
        accounts: ["Account13", "Account14"]
    },
    {
        id: 8,
        name: "Team H",
        operators: ["Oscar", "Peggy"],
        accounts: ["Account15", "Account16"]
    },
    {
        id: 9,
        name: "Team I",
        operators: ["Quentin", "Rupert"],
        accounts: ["Account17", "Account18"]
    },
    {
        id: 10,
        name: "Team J",
        operators: ["Sybil", "Trent"],
        accounts: ["Account19", "Account20"]
    }
]);
</script>
<template>
    <div class="w-full p-2">
        <div class="flex gap-2 items-center justify-between">
            <h1 class="text-2xl">Listes des équipes</h1>
            <button
                class="active:border-b-2 active:border-primary-light hover:border-b-2 hover:border-primary-light"
            >
                Ajouter
            </button>
        </div>
    </div>
    <div class="">
        <table class="table-auto w-full bg-surface text-left border-2 border-border rounded-lg">
            <thead class="text-text font-bold">
                <tr>
                    <th class="p-2">Nom</th>
                    <th class="p-2">Opérateurs</th>
                    <th class="p-2">Comptes</th>
                    <th class="p-2">Actions</th>
                </tr>
            </thead>
            <tbody class="text-text font-normal divide-y divide-border">
                <tr
                    v-for="team in teams"
                    :key="team.id"
                    class="hover:bg-surface transition"
                >
                    <td class="p-2 text-nowrap">{{ team.name }}</td>

                    <!-- Encapsuler Flexbox dans une div -->
                    <td class="p-2">
                        <div class="flex flex-wrap gap-1">
                            <span
                                v-for="operator in team.operators"
                                :key="operator"
                                class="bg-surface px-2 py-1 rounded text-sm"
                            >
                                {{ operator }}
                            </span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex flex-wrap gap-1">
                            <span
                                v-for="account in team.accounts"
                                :key="account"
                                class="bg-surface px-2 py-1 rounded text-sm"
                            >
                                {{ account }}
                            </span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex gap-2">
                            <button
                                class="text-sm text-primary hover:underline"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </svg>
                            </button>
                            <button class="text-sm text-error hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6zm-6-4a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2z"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
