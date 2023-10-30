<script setup lang="ts">
import AnimationGroup from "./components/AnimationGroup.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <div id="main" class="flex flex-col">
    <div class="max-w-xl">
      <AnimationGroup />
      <!-- <img src="src/assets/images/van.svg" height="500px" /> -->
      <!-- <Instructions />
      <Piano /> -->
    </div>
  </div>
  <!-- <Sketch /> -->
</template>

<style scoped>
#main {
  height: 100dvh;
}
</style>
