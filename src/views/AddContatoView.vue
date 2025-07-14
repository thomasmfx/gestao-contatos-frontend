<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import type { Cliente } from '@/types/Cliente';

import UpdateClienteForm from '@/components/UpdateClienteForm.vue';
import AddContatoForm from '@/components/AddContatoForm.vue';
import { useClientes } from '@/composables/useClientes';
import BaseHeader from '@/components/BaseHeader.vue';

const { getSingleCliente } = useClientes();

interface Props {
  id: number;
}

const cliente = ref<Cliente | null>(null);

const props = defineProps<Props>();

const previousRoute = computed(() => `/clientes/${props.id}`);

onMounted(async () => {
  cliente.value = await getSingleCliente(props.id);
});
</script>

<template>
  <BaseHeader :previous-route="previousRoute" />
  <main class="main">
    <UpdateClienteForm v-if="cliente" :cliente="cliente" />
    <AddContatoForm v-if="cliente" />
  </main>
</template>

<style scoped>
.main {
  margin-top: 2em;
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}
</style>
