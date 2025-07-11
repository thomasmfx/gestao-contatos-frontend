<script lang="ts" setup>
import { onMounted } from 'vue';

import { useClientes } from '@/composables/useClientes';
import BaseButton from '@/components/BaseButton.vue';
import BaseTable from '@/components/BaseTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import NavBar from '@/components/NavBar.vue';

const { clientesData, setClientes } = useClientes();

onMounted(() => {
  setClientes();
});
</script>

<template>
  <div class="main">
    <header class="header">
      <NavBar highlighted="clientes" />
      <nav class="actions-nav">
        <SearchBar placeholder="Buscar cliente por Nome ou CPF" />
        <BaseButton variant="add"> Novo </BaseButton>
      </nav>
    </header>
    <BaseTable :data="clientesData" type="cliente" />
  </div>
</template>

<style scoped>
.main {
  padding: 2.5em 3em;
  display: grid;
  gap: 4em;
}

.header {
  display: flex;
  gap: 3em;
}

.actions-nav {
  display: flex;
  flex-basis: 100%;
  border-radius: 5px;
  padding-inline: 1em;
  gap: 1.2em;
  align-items: center;
  background-color: var(--color-neutral);
}
</style>
