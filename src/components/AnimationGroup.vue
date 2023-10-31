<script setup lang="ts">
import Elf from "./Elf.vue";
import Van from "./Van.vue";

const props = defineProps<{
  pianoNot: string | null;
}>();
</script>

<template>
  <div id="animationGroup" class="border-red-600 border-2 relative">
    <Elf
      :startX="70"
      :startY="200"
      :angle="-25"
      :active="props.pianoNot === 'e'"
    />
    <Elf
      :startX="70"
      :startY="190"
      :angle="25"
      :active="props.pianoNot === 'f'"
    />
    <!-- <Elf
      :startX="70"
      :startY="265"
      :angle="-25"
      :animationX="0"
      :animationY="0"
    /> -->

    <Van />
  </div>
</template>

<style scoped>
#animationGroup {
  @apply bg-[url('../assets/images/background.svg')] bg-cover bg-center;
  height: 70dvh;
  overflow: hidden;
}
.bil {
  @apply z-20;
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
    @apply right-12 bottom-20;
  }
  50% {
    @apply right-4 bottom-20;
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
