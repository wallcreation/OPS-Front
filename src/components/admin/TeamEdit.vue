<script setup>
import { ref } from "vue";
const props = defineProps({
    showModal: Boolean
});
const emit = defineEmits(["close"]);
const close = async () => {
    emit("close");
};
const teamipt = ref("");
const addteam = async () => {
    console.log("Team name:");
};
</script>
<template>
    <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
    >
        <div
            class="mx-5 p-3 max-w-lg w-full rounded-lg border-1 border-border backdrop-blur-md"
        >
            <h1 class="text-xl font-bold">Modifier l'équipe</h1>
            <form action="" class="my-2 grid gap-2 grid-cols-2">
                <input
                    type="text"
                    name="tname"
                    id="tname"
                    required
                    placeholder="Nom de l'équipe"
                    :value="teamipt"
                    class="col-span-2 border-b-2 border-border active:border-primary hover:border-primary-dark outline-none"
                />
                <input
                    type="text"
                    id="operatorslist"
                    name="operatorslist"
                    placeholder="Ajouter un opérateur"
                    class="w-full border-b-2 border-border active:border-primary hover:border-primary-dark outline-none"
                />
                <input
                    type="text"
                    id="accountslist"
                    name="accountslist"
                    placeholder="Ajouter un compte"
                    class="w-full border-b-2 border-border active:border-primary hover:border-primary-dark outline-none"
                />
            </form>
            <div class="flex gap-2 justify-end mt-1">
                <button
                    @click="addteam"
                    class="text-primary hover:border-b-2 hover:border-primary"
                >
                    Valider
                </button>
                <button
                    @click="close"
                    class="text-error hover:border-b-2 hover:border-error"
                >
                    Annuler
                </button>
            </div>
        </div>
    </div>
</template>
