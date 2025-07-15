<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import type {
  Contato,
  ContatoPayload,
  ContatoUpdatePayload,
} from '@/types/Contato';
import type { Cliente, ClienteUpdatePayload } from '@/types/Cliente';

import UpdateClienteForm from '@/components/UpdateClienteForm.vue';
import UpdateContatoForm from '@/components/UpdateContatoForm.vue';
import AddContatoForm from '@/components/AddContatoForm.vue';
import { useClientes } from '@/composables/useClientes';
import { useContatos } from '@/composables/useContatos';
import BaseButton from '@/components/BaseButton.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseTable from '@/components/BaseTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import useNotify from '@/composables/useNotify';
import router from '@/router/router';

const { getSingleCliente, updateCliente, deleteCliente } = useClientes();
const {
  contatosData,
  setContatos,
  getSingleContato,
  updateContato,
  deleteContato,
  addContato,
} = useContatos();

const notify = useNotify();

interface Props {
  id: number;
}

const cliente = ref<Cliente | null>(null);
const isAddingContato = ref<boolean>(false);
const contatoBeingUpdated = ref<Contato | null>(null);

const props = defineProps<Props>();

function handleDeleteCliente(id: number) {
  deleteCliente(id).then(() => {
    router.push('/clientes');
  });
}

function handleUpdateCliente(id: number, newData: ClienteUpdatePayload) {
  updateCliente(id, newData).then(() => {
    notify('success', 'Cliente atualizado com sucesso!');
  });
}

function handleSearchContato(value: number) {
  setContatos(value)
    .then(() => {
      if (!contatosData.value.length) {
        notify('info', 'Nenhum contato encontrado para este cliente.');
      }
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleToggleIsAddingContato() {
  isAddingContato.value = !isAddingContato.value;
}

async function handleContatoBeingUpdated(id: number) {
  contatoBeingUpdated.value = await getSingleContato(id);
}

function handleAddContato(data: ContatoPayload) {
  data.clienteId = props.id;
  addContato(data)
    .then(() => {
      isAddingContato.value = false;
      setContatos(props.id);
      notify('success', 'Contato adicionado com sucesso!');
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleDeleteContato(id: number) {
  deleteContato(id)
    .then(() => {
      contatoBeingUpdated.value = null;
      setContatos(props.id);
      notify('success', 'Contato excluído com sucesso!');
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleUpdateContato(id: number, newData: ContatoUpdatePayload) {
  updateContato(id, newData)
    .then(() => {
      setContatos(props.id);
      notify('success', 'Contato atualizado com sucesso!');
      contatoBeingUpdated.value = null;
    })
    .catch((error) => {
      notify('error', error.message);
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
    <UpdateClienteForm
      v-if="cliente"
      :cliente="cliente"
      @excluir="handleDeleteCliente"
      @salvar="handleUpdateCliente"
    />
    <div class="contatos" v-if="cliente">
      <AddContatoForm
        v-if="isAddingContato"
        @cancelar="handleToggleIsAddingContato"
        @salvar="handleAddContato"
      />
      <UpdateContatoForm
        v-if="contatoBeingUpdated !== null"
        class="contato-form"
        :contato="contatoBeingUpdated"
        @cancelar="contatoBeingUpdated = null"
        @excluir="handleDeleteContato"
        @salvar="handleUpdateContato"
      />
      <nav class="nav">
        <SearchBar
          placeholder="Buscar contato por Cliente ID"
          @search="handleSearchContato"
        />
        <BaseButton
          v-if="!isAddingContato || contatoBeingUpdated === null"
          variant="add"
          @click="handleToggleIsAddingContato"
        >
          Novo
        </BaseButton>
      </nav>
      <BaseTable
        v-if="contatosData.length"
        :data="contatosData"
        type="contato"
        @select-row="handleContatoBeingUpdated"
      />
      <span class="table-fallback" v-else>Nenhum contato encontrado</span>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
  align-items: start;
  gap: 2em;
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
}

.contatos {
  display: grid;
  gap: 2em;
}

.table-fallback {
  justify-self: center;
  opacity: 0.8;
}
</style>
