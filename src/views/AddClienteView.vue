<script lang="ts" setup>
import type { ClientePayload } from '@/types/Cliente';

import AddClienteForm from '@/components/AddClienteForm.vue';
import { useClientes } from '@/composables/useClientes';
import BaseHeader from '@/components/BaseHeader.vue';
import useNotify from '@/composables/useNotify';
import router from '@/router/router';

const { addCliente } = useClientes();
const notify = useNotify();

function handleSubmit(data: ClientePayload) {
  addCliente(data)
    .then(() => {
      router.push('/clientes');
    })
    .catch(() => {
      notify('error', 'Erro ao adicionar cliente');
    });
}

function handleGoBack() {
  router.push('/clientes');
}
</script>

<template>
  <BaseHeader previous-route="/clientes" />
  <main class="main">
    <AddClienteForm @salvar="handleSubmit" @cancelar="handleGoBack" />
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  min-height: 85dvh;
  display: grid;
  margin-top: 2em;
  align-items: start;
  justify-content: center;
}
</style>
