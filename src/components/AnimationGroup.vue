<script setup lang="ts">
import Background from "./Background.vue";
import Elf from "./Elf.vue";
import Van from "./Van.vue";
import VanRight from "./VanRight.vue";

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
      :startX="60"
      :startY="156"
      :angle="-25"
      :active="props.pianoNote === 'a'"
    />
    <Elf
      :startX="40"
      :startY="153"
      :angle="20"
      :active="props.pianoNote === 'b'"
    />
    <Elf
      :startX="35"
      :startY="143"
      :angle="-15"
      :active="props.pianoNote === 'c'"
    />
    <Elf
      :startX="90"
      :startY="150"
      :angle="80"
      :active="props.pianoNote === 'd'"
    />
    <!-- z-index should be over 10 to be on top of the left part of the van -->
    <Elf
      :startX="-5"
      :startY="30"
      :angle="-70"
      :active="props.pianoNote === 'e'"
      :zIndex="20"
    />
    <Elf
      :startX="150"
      :startY="-13"
      :angle="190"
      :active="props.pianoNote === 'f'"
    />

    <Elf
      :startX="-20"
      :startY="50"
      :angle="210"
      :active="props.pianoNote === 'g'"
    />

    <Van />
    <VanRight />
  </div>
</template>

<style scoped>
#animationGroup {
  @apply h-3/4;
  overflow: hidden;
}
</style>
