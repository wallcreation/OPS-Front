<script setup>
import { ref } from 'vue'
const props = defineProps({
  lname: {
    type: String,
    default: 'admin',
  },
  fname: {
    type: String,
    default: '',
  },
  teams: {
    type: Number,
    default: 0,
  },
  operators: {
    type: Number,
    default: 0,
  },
  accounts: {
    type: Number,
    default: 0,
  },
})
</script>
<template>
  <header class="w-full bg-[#13223A] text-[#06B6D4] px-4 py-2">
    <div class="flex justify-between items-center font-bold">
      <!-- Gauche -->
      <div class="relative text-sm p-2 flex gap-4">
        <p class="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          {{ teams }}
        </p>
        <p class="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          {{ operators }}
        </p>
        <p class="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
          {{ accounts }}
        </p>
        <div class="absolute top-0 left-0 border-t-2 border-l-2 border-cyan-500 w-3 h-3"></div>
        <div class="absolute bottom-0 right-0 border-b-2 border-r-2 border-cyan-500 w-3 h-3"></div>
      </div>

      <!-- Centre -->
      <div class="relative text-sm p-2">
        <h1 class="text-lg text-center">OPS</h1>
        <div class="absolute top-0 left-0 border-t-2 border-l-2 border-cyan-500 w-3 h-3"></div>
        <div class="absolute bottom-0 right-0 border-b-2 border-r-2 border-cyan-500 w-3 h-3"></div>
      </div>

      <!-- Droite -->
      <div class="relative text-sm p-2 flex gap-2">
        <p>{{ lname }}</p>
        <p>{{ fname }}</p>
        <div class="absolute top-0 left-0 border-t-2 border-l-2 border-cyan-500 w-3 h-3"></div>
        <div class="absolute bottom-0 right-0 border-b-2 border-r-2 border-cyan-500 w-3 h-3"></div>
      </div>
    </div>
  </header>
</template>
