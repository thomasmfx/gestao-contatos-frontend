<script lang="ts" setup>
import { toast, type ToastType } from 'vue3-toastify';
import { onMounted, ref } from 'vue';

import type {
  Cliente,
  ClientePayload,
  ClienteUpdatePayload,
} from '@/types/Cliente';
import type {
  Contato,
  ContatoPayload,
  ContatoUpdatePayload,
} from '@/types/Contato';
import type { ID } from '@/types/ID';
import 'vue3-toastify/dist/index.css';

import UpdateClienteForm from '@/components/UpdateClienteForm.vue';
import UpdateContatoForm from '@/components/UpdateContatoForm.vue';
import AddClienteForm from '@/components/AddClienteForm.vue';
import AddContatoForm from '@/components/AddContatoForm.vue';
import AppSearchBar from '@/components/AppSearchBar.vue';
import { useClientes } from '@/composables/useClientes';
import { useContatos } from '@/composables/useContatos';
import AppButton from '@/components/AppButton.vue';
import AppModal from '@/components/AppModal.vue';
import AppTable from '@/components/AppTable.vue';

const {
  clientesData,
  setClientes,
  getSingleCliente,
  addCliente,
  updateCliente,
  deleteCliente,
} = useClientes();

const {
  contatosData,
  setContatos,
  getContatos,
  getSingleContato,
  addContato,
  updateContato,
  deleteContato,
} = useContatos();

const selectedCliente = ref<Cliente | null>(null);
const selectedClienteContatos = ref<Contato[] | null>(null);
const isAddingCliente = ref<boolean>(false);

const selectedContato = ref<Contato | null>(null);
const isAddingContato = ref<boolean>(false);

onMounted(() => {
  setClientes();
  setContatos();
});

function notify(type: ToastType, msg: string) {
  toast(msg, {
    theme: 'light',
    type: type,
    hideProgressBar: true,
    position: 'top-center',
    dangerouslyHTMLString: true,
    autoClose: 2500,
  });
}

function handleSearchCliente(search: string | number) {
  setClientes(search).then((cliente) => {
    if (!cliente?.length) notify('warning', 'Cliente não encontrado!');
  });
}

function handleSearchContatos(clienteId: ID) {
  setContatos(clienteId).then((contato) => {
    if (!contato?.length)
      notify('warning', 'Nenhum contato encontrado para este cliente!');
  });
}

// Funções para gerenciar clientes
function handleSelectCliente(id: ID | string) {
  getSingleCliente(id).then((cliente) => {
    selectedCliente.value = cliente;
  });
  getContatos(id).then((contatos) => {
    selectedClienteContatos.value = contatos;
  });
}

function handleAddCliente(data: ClientePayload) {
  addCliente(data)
    .then(() => {
      isAddingCliente.value = false;
      setClientes();
      notify('success', 'Cliente adicionado com sucesso!');
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleUpdateCliente(id: ID, newData: ClienteUpdatePayload) {
  updateCliente(newData, id)
    .then(() => {
      selectedCliente.value = null;
      setClientes();
      setContatos();
      notify('success', 'Cliente atualizado com sucesso!');
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleDeleteCliente(id: ID) {
  deleteCliente(id).then(() => {
    selectedCliente.value = null;
    setClientes();
    setContatos();
    notify('success', 'Cliente excluído com sucesso!');
  });
}

// Funções para gerenciar contatos
function handleSelectContato(id: ID) {
  getSingleContato(id).then((contato) => {
    selectedContato.value = contato;
  });
}

function handleAddContato(data: ContatoPayload) {
  addContato(data)
    .then(() => {
      isAddingContato.value = false;
      setContatos();
      notify('success', 'Contato adicionado com sucesso!');
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleUpdateContato(id: ID, newData: ContatoUpdatePayload) {
  updateContato(id, newData)
    .then(() => {
      selectedContato.value = null;
      setContatos();
      notify('success', 'Contato atualizado com sucesso!');
    })
    .catch((error) => {
      notify('error', error.message);
    });
}

function handleDeleteContato(id: ID) {
  deleteContato(id).then(() => {
    selectedContato.value = null;
    setContatos();
    notify('success', 'Contato excluído com sucesso!');
  });
}
</script>

<template>
  <AppModal v-if="isAddingCliente" @close="isAddingCliente = false">
    <AddClienteForm
      @cancelar="isAddingCliente = false"
      @salvar="handleAddCliente"
    />
  </AppModal>

  <AppModal
    v-if="selectedCliente && selectedClienteContatos"
    @close="selectedCliente = null"
  >
    <UpdateClienteForm
      :cliente="selectedCliente"
      :contatos="selectedClienteContatos"
      @cancelar="selectedCliente = null"
      @excluir="handleDeleteCliente"
      @salvar="handleUpdateCliente"
    />
  </AppModal>

  <AppModal v-if="isAddingContato" @close="isAddingContato = false">
    <AddContatoForm
      @cancelar="isAddingContato = false"
      @salvar="handleAddContato"
    />
  </AppModal>

  <AppModal v-if="selectedContato" @close="selectedContato = null">
    <UpdateContatoForm
      :contato="selectedContato"
      @cancelar="selectedContato = null"
      @excluir="handleDeleteContato"
      @salvar="handleUpdateContato"
    />
  </AppModal>

  <main class="main">
    <section class="section">
      <header class="header">
        <AppSearchBar
          placeholder="Buscar cliente por Nome ou CPF"
          @search="handleSearchCliente"
        />
        <AppButton variant="add" @click="isAddingCliente = true">
          <span>Novo Cliente</span>
        </AppButton>
      </header>
      <h2>Clientes</h2>
      <AppTable
        type="cliente"
        :data="clientesData"
        @select-row="handleSelectCliente"
      />
    </section>
    <section class="section">
      <header class="header">
        <AppSearchBar
          placeholder="Buscar contato por ID Cliente"
          @search="handleSearchContatos"
        />
        <AppButton variant="add" @click="isAddingContato = true">
          <span>Novo Contato</span>
        </AppButton>
      </header>
      <h2>Contatos</h2>
      <AppTable
        type="contato"
        :data="contatosData"
        @select-row="handleSelectContato"
      />
    </section>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.section {
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.header {
  display: flex;
  gap: 4em;
  padding: 1.5em;
  border-radius: 5px;
  background-color: var(--color-neutral-light);
}
</style>
