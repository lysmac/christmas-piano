<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Header from "./components/Header.vue";
import Piano from "./components/Piano.vue";

useHead({
  title: "Christmas Piano",
});
</script>

<template>
  <Header />
  <div id="main" class="flex w-screen max-w-xl flex-col">
    <Piano />
  </div>
</template>

<style scoped>
#main {
  height: 100vh;
}
</style>
