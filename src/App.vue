<script setup lang="ts">
import { useHead } from "@unhead/vue";
import PageHeader from "./components/PageHeader.vue";
import Piano from "./components/Piano.vue";

useHead({
  title: "Christmas Piano",
});
</script>

<template>
  <PageHeader />
  <div id="main" class="flex h-screen w-screen max-w-xl flex-col">
    <Piano />
  </div>
</template>

<style scoped></style>
