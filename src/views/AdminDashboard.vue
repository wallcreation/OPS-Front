<script setup>
import { onMounted } from 'vue';

onMounted
</script>
<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 text-center">
    <div class="flex items-center justify-center m-2 bg bg-surface border-2 border-border rounded-lg">
      <div>
        <h1 class="text-primary text-5xl font-bold">10</h1>
        <p>Equipes</p>
      </div>
    </div>
    <div class="flex items-center justify-center m-2 bg bg-surface border-2 border-border rounded-lg">
      <div>
        <h1 class="text-primary text-5xl font-bold">10</h1>
        <p>Opérateurs</p>
      </div>
    </div>
    <div class="flex items-center justify-center md:col-span-2 m-2 bg bg-surface border-2 border-border rounded-lg">
      <div>
        <h1 class="text-primary text-5xl font-bold">10</h1>
        <p>Comptes</p>
      </div>
    </div>
  </div>
</template>