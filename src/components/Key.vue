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
.pushed-down {
  @apply bg-slate-300;
}

li {
  @apply flex flex-1 items-center justify-center bg-white text-2xl font-extrabold uppercase;
}
</style>
