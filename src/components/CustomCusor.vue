<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const circleRef = ref(null)
const dotRef = ref(null)
const isHoveringClickable = ref(false)

const mouse = {
  x: 0,
  y: 0,
}

const updateCursor = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY

  const circle = circleRef.value
  const dot = dotRef.value

  if (circle && dot) {
    circle.style.transform = `translate(${mouse.x - 16}px, ${mouse.y - 16}px)`
    dot.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`
  }

  isHoveringClickable.value = isClickable(e.target)
}

const isClickable = (el) => {
  if (!el) return false
  const tag = el.tagName?.toLowerCase()
  const role = el.getAttribute?.('role')
  const isButtonLike =
    ['button', 'a', 'input', 'textarea', 'label'].includes(tag) ||
    role === 'button' ||
    el.onclick !== null ||
    el.classList.contains('cursor-pointer')

  return isButtonLike
}

onMounted(() => {
  window.addEventListener('mousemove', updateCursor)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor)
})
</script>

<template>
  <!-- Cercle externe -->
  <div
    ref="circleRef"
    :class="[
      'pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full z-[9999] transition-all duration-200 ease-out',
      isHoveringClickable
        ? 'bg-primary/20 opacity-5'
        : 'border-2 border-primary opacity-50'
    ]"
  ></div>

  <!-- Point central -->
  <div
    ref="dotRef"
    :class="[
      'pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-all duration-200 ease-out',
      isHoveringClickable
        ? 'w-8 h-8 bg-primary opacity-50'
        : 'w-2 h-2 bg-primary opacity-100'
    ]"
  ></div>
</template>

<style scoped>
@media (max-width: 768px) {
  div {
    display: none;
  }
}
</style>
