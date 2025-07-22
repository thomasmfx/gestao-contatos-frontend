<script lang="ts" setup>
import { onMounted } from 'vue';

import { useClientes } from '@/composables/useClientes';
import BaseButton from '@/components/BaseButton.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseTable from '@/components/BaseTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import useNotify from '@/composables/useNotify';
import router from '@/router/router';

const { clientesData, setClientes } = useClientes();

const notify = useNotify();

function handleSelectCliente(id: number) {
  router.push({ name: 'ClienteDetailsView', params: { id: id } });
}

function handleRedirectToAddCliente() {
  router.push('/clientes/new');
}

function handleSearchCliente(value: string) {
  setClientes(value).then(() => {
    if (!value) return;
    if (clientesData.value.length === 0) {
      notify('info', 'Nenhum cliente encontrado');
    }
  });
}

onMounted(() => {
  setClientes();
});
</script>

<template>
  <BaseHeader route="/clientes" />
  <main class="main">
    <nav class="nav">
      <SearchBar
        placeholder="Buscar cliente por Nome ou CPF"
        @search="handleSearchCliente"
      />
      <BaseButton variant="add" @click="handleRedirectToAddCliente">
        Novo
      </BaseButton>
    </nav>
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
  gap: 2em;
  margin: 2em;
}

.nav {
  display: flex;
  border-radius: 5px;
  padding-inline: 1em;
  gap: 1.2em;
  align-items: center;
  height: 64px;
  background-color: var(--color-neutral);
}

@media (min-width: 1400px) {
  .main {
    justify-content: center;
  }

  .nav {
    width: 1400px;
  }
}
</style>
