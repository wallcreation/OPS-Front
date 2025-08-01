<script setup>
// Importation des composants de routing Vue Router
import { RouterLink, RouterView } from 'vue-router'
import CustomCursor from './components/CustomCusor.vue'
</script>

<template>
  <!-- Conteneur principal de l'application, prend toute la hauteur et largeur de l'écran -->
  <div class="h-screen w-screen">
    <!-- Affiche la vue correspondant à la route courante -->
    <RouterView/>
    <CustomCursor/>
  </div>
</template>

<style scoped>
/* Aucun style additionnel ici */
</style>
