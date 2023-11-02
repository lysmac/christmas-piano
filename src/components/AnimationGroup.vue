<script setup lang="ts">
import Background from "./Background.vue";
import Elf from "./Elf.vue";
import Van from "./Van.vue";

const props = defineProps<{
  pianoNot: string | null;
}>();
</script>

<template>
  <div
    id="animationGroup"
    class="relative mt-16 border-2 border-t-0 border-slate-800"
  >
    <Background />
    <Elf
      :startX="70"
      :startY="150"
      :angle="-25"
      :active="props.pianoNot === 'a'"
    />
    <Elf
      :startX="70"
      :startY="140"
      :angle="25"
      :active="props.pianoNot === 'b'"
    />
    <Elf
      :startX="35"
      :startY="140"
      :angle="-15"
      :active="props.pianoNot === 'c'"
    />
    <Elf
      :startX="90"
      :startY="150"
      :angle="80"
      :active="props.pianoNot === 'd'"
    />
    <Elf
      :startX="-20"
      :startY="100"
      :angle="0"
      :active="props.pianoNot === 'e'"
    />
    <Elf
      :startX="-10"
      :startY="10"
      :angle="180"
      :active="props.pianoNot === 'f'"
    />
    <Elf
      :startX="120"
      :startY="170"
      :angle="-25"
      :active="props.pianoNot === 'g'"
    />

    <Van />
  </div>
</template>

<style scoped>
#animationGroup {
  @apply h-3/4;
  overflow: hidden;
}

.wave {
  animation-name: wave-animation;
  animation-duration: 0.25s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes wave-animation {
  0%,
  100% {
    @apply bottom-20 right-12;
  }
  50% {
    @apply bottom-20 right-4;
  }
}

.wave-original {
  animation-name: wave-animation-original;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes wave-animation-original {
  0% {
    transform: rotate(calc(var(--initial-rotation) + 0deg));
  }
  10% {
    transform: rotate(calc(var(--initial-rotation) + 14deg));
  } /* The following five values can be played with to make the waving more or less extreme */
  20% {
    transform: rotate(calc(var(--initial-rotation) + -8deg));
  }
  30% {
    transform: rotate(calc(var(--initial-rotation) + 14deg));
  }
  40% {
    transform: rotate(calc(var(--initial-rotation) + -4deg));
  }
  50% {
    transform: rotate(calc(var(--initial-rotation) + 10deg));
  }
  60% {
    transform: rotate(calc(var(--initial-rotation) + 0deg));
  } /* Reset for the last half to pause */
  100% {
    transform: rotate(calc(var(--initial-rotation) + 0deg));
  }
}
</style>
