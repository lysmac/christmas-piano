<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{
  isActive: boolean;
  letter: string;
}>();

const pushedDown = ref(false);

const pushedDownTimeouts: number[] = [];

watchEffect(() => {
  if (props.isActive) {
    if (pushedDownTimeouts.length > 0) {
      pushedDownTimeouts.forEach(clearTimeout);
      pushedDownTimeouts.length = 0;
    }
    pushedDown.value = true;
    const timeoutId = setTimeout(() => {
      pushedDown.value = false;
    }, 125);
    pushedDownTimeouts.push(timeoutId);
  }
});
</script>

<template>
  <li
    :class="{
      'pushed-down': pushedDown,
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
