<script setup lang="ts">
const props = defineProps<{
  htmlFor: string;
}>();
</script>

<template>
  <label :for="props.htmlFor" class="label">
    <slot />
  </label>
</template>

<style scoped>
.label {
  font-size: 0.9rem;
}
</style>
