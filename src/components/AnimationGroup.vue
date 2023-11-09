<script setup lang="ts">
import Background from "./Background.vue";
import Elf from "./Elf.vue";
import Van from "./Van.vue";

const props = defineProps<{
  pianoNote: string | null;
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
      :active="props.pianoNote === 'a'"
    />
    <Elf
      :startX="70"
      :startY="140"
      :angle="25"
      :active="props.pianoNote === 'b'"
    />
    <Elf
      :startX="35"
      :startY="140"
      :angle="-15"
      :active="props.pianoNote === 'c'"
    />
    <Elf
      :startX="90"
      :startY="150"
      :angle="80"
      :active="props.pianoNote === 'd'"
    />
    <Elf
      :startX="-20"
      :startY="100"
      :angle="0"
      :active="props.pianoNote === 'e'"
    />
    <Elf
      :startX="-10"
      :startY="10"
      :angle="180"
      :active="props.pianoNote === 'f'"
    />
    <Elf
      :startX="120"
      :startY="170"
      :angle="-25"
      :active="props.pianoNote === 'g'"
    />

    <Van />
  </div>
</template>

<style scoped>
#animationGroup {
  @apply h-3/4;
  overflow: hidden;
}
</style>
