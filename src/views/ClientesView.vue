<script lang="ts" setup>
import { onMounted } from 'vue';

import { useClientes } from '@/composables/useClientes';
import BaseButton from '@/components/BaseButton.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseTable from '@/components/BaseTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import router from '@/router/router';

const { clientesData, setClientes } = useClientes();

function handleSelectCliente(id: number) {
  router.push({ name: 'ClienteDetailsView', params: { id: id } });
}

function handleRedirectToAddCliente() {
  router.push('/clientes/new');
}

onMounted(() => {
  setClientes();
});
</script>

<template>
  <BaseHeader previous-route="/" />
  <nav class="nav">
    <SearchBar placeholder="Buscar cliente por Nome ou CPF" />
    <BaseButton variant="add" @click="handleRedirectToAddCliente">
      Novo
    </BaseButton>
  </nav>
  <main class="main">
    <BaseTable
      :data="clientesData"
      type="cliente"
      @select-row="handleSelectCliente"
    />
  </main>
</template>

<style scoped>
.main {
  display: grid;
  gap: 4em;
}

.nav {
  display: flex;
  border-radius: 5px;
  padding-inline: 1em;
  gap: 1.2em;
  align-items: center;
  height: 64px;
  background-color: var(--color-neutral);
  margin: 2em 0;
}
</style>
