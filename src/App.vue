<script setup lang="ts">
import Header from "./components/Header.vue";
import Instructions from "./components/Instructions.vue";
import Piano from "./components/Piano.vue";
import Sketch from "./components/Sketch.vue";
</script>

<template>
  <Header />
  <div id="main">
    <div class="max-w-lg">
      <Instructions />
      <Piano />
    </div>
  </div>
  <Sketch />
</template>

<style scoped></style>
