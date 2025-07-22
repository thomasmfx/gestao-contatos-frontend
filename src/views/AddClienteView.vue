<script lang="ts" setup>
import type { ClientePayload } from '@/types/Cliente';

import AddClienteForm from '@/components/AddClienteForm.vue';
import { useClientes } from '@/composables/useClientes';
import BaseHeader from '@/components/BaseHeader.vue';
import useNotify from '@/composables/useNotify';
import { ApiError } from '@/utils/errors';
import router from '@/router/router';

const { addCliente } = useClientes();
const notify = useNotify();

function handleSubmit(data: ClientePayload) {
  addCliente(data)
    .then(() => {
      router.push('/clientes');
    })
    .catch((error: unknown) => {
      if (error instanceof ApiError) {
        notify('error', error.message);
      }
    });
}

function handleGoBack() {
  router.push('/clientes');
}
</script>

<template>
  <BaseHeader route="/clientes/new" />
  <main class="main">
    <AddClienteForm @salvar="handleSubmit" @cancelar="handleGoBack" />
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  min-height: 85dvh;
  display: grid;
  margin-top: 4em;
  align-items: start;
  justify-content: center;
}
</style>
