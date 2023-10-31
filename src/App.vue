<script setup lang="ts">
import Header from "./components/Header.vue";
import Piano from "./components/Piano.vue";
</script>

<template>
  <Header />
  <div id="main" class="flex flex-col">
    <div class="max-w-xl">
      <Piano />
    </div>
  </div>
</template>

<style scoped></style>
