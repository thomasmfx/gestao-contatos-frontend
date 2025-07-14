<script lang="ts" setup>
import AddClienteForm from '@/components/AddClienteForm.vue';
import BaseHeader from '@/components/BaseHeader.vue';
</script>

<template>
  <BaseHeader previous-route="/clientes" />
  <main class="main">
    <AddClienteForm />
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  min-height: 85dvh;
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
