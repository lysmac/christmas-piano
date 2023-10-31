<script setup lang="ts">
import Header from "./components/Header.vue";
import Piano from "./components/Piano.vue";
</script>

<template>
  <Header />
  <div id="main" class="flex flex-col max-w-xl w-screen">
    <Piano />
  </div>
</template>

<style scoped>
#main {
  height: 100vh;
}
</style>
