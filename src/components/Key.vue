<script setup lang="ts">
const props = defineProps<{
  isActive: boolean;
  letter: string;
}>();
</script>

<template>
  <li
    :class="{
      'pushed-down': props.isActive,
    }"
  >
    {{ props.letter }}
  </li>
</template>

<style scoped>
.key {
  touch-action: manipulation;
}
.pushed-down {
  @apply bg-slate-300;
}

li {
  @apply bg-white flex-1 flex items-center justify-center text-2xl uppercase font-extrabold;
}

.move {
  animation: bounce 0.15s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -40px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
