<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import type { Cliente } from '@/types/Cliente';

import UpdateClienteForm from '@/components/UpdateClienteForm.vue';
import { useClientes } from '@/composables/useClientes';
import { useContatos } from '@/composables/useContatos';
import BaseButton from '@/components/BaseButton.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseTable from '@/components/BaseTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import router from '@/router/router';

const { getSingleCliente } = useClientes();
const { contatosData, setContatos } = useContatos();

interface Props {
  id: number;
}

const cliente = ref<Cliente | null>(null);

const props = defineProps<Props>();

function handleRedirectToAddContato() {
  router.push({
    name: 'AddContatoView',
    params: { id: props.id },
  });
}

onMounted(async () => {
  cliente.value = await getSingleCliente(props.id);
  setContatos(props.id);
});
</script>

<template>
  <BaseHeader previous-route="/clientes" />
  <main class="main">
    <UpdateClienteForm v-if="cliente" :cliente="cliente" />
    <div class="contatos" v-if="cliente">
      <nav class="nav">
        <SearchBar placeholder="Buscar cliente por Nome ou CPF" />
        <BaseButton variant="add" @click="handleRedirectToAddContato">
          Novo
        </BaseButton>
      </nav>
      <BaseTable :data="contatosData" type="contato" />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 3em;
  margin-top: 2em;
}

.nav {
  display: flex;
  border-radius: 5px;
  padding-inline: 1em;
  gap: 1.2em;
  align-items: center;
  height: 64px;
  background-color: var(--color-neutral);
  margin-bottom: 2em;
}
</style>
