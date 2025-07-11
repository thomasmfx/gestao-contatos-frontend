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
import 'vue3-toastify/dist/index.css';

import UpdateClienteForm from '@/components/UpdateClienteForm.vue';
import UpdateContatoForm from '@/components/UpdateContatoForm.vue';
import AddClienteForm from '@/components/AddClienteForm.vue';
import AddContatoForm from '@/components/AddContatoForm.vue';
import { useClientes } from '@/composables/useClientes';
import { useContatos } from '@/composables/useContatos';
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseTable from '@/components/BaseTable.vue';
import SearchBar from '@/components/SearchBar.vue';

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
    autoClose: 2000,
    transition: 'slide',
  });
}

function handleSearchCliente(search: string | number) {
  setClientes(search).then((cliente) => {
    if (!cliente?.length) notify('warning', 'Cliente não encontrado!');
  });
}

function handleSearchContatos(clienteId: number) {
  setContatos(clienteId).then((contato) => {
    if (!contato?.length)
      notify('warning', 'Nenhum contato encontrado para este cliente!');
  });
}

// Funções para gerenciar clientes
function handleSelectCliente(id: number) {
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

function handleUpdateCliente(id: number, newData: ClienteUpdatePayload) {
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

function handleDeleteCliente(id: number) {
  deleteCliente(id).then(() => {
    selectedCliente.value = null;
    setClientes();
    setContatos();
    notify('success', 'Cliente excluído com sucesso!');
  });
}

// Funções para gerenciar contatos
function handleSelectContato(id: number) {
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

function handleUpdateContato(id: number, newData: ContatoUpdatePayload) {
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

function handleDeleteContato(id: number) {
  deleteContato(id).then(() => {
    selectedContato.value = null;
    setContatos();
    notify('success', 'Contato excluído com sucesso!');
  });
}
</script>

<template>
  <BaseModal v-if="isAddingCliente" @close="isAddingCliente = false">
    <AddClienteForm
      @cancelar="isAddingCliente = false"
      @salvar="handleAddCliente"
    />
  </BaseModal>

  <BaseModal
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
  </BaseModal>

  <BaseModal v-if="isAddingContato" @close="isAddingContato = false">
    <AddContatoForm
      @cancelar="isAddingContato = false"
      @salvar="handleAddContato"
    />
  </BaseModal>

  <BaseModal v-if="selectedContato" @close="selectedContato = null">
    <UpdateContatoForm
      :contato="selectedContato"
      @cancelar="selectedContato = null"
      @excluir="handleDeleteContato"
      @salvar="handleUpdateContato"
    />
  </BaseModal>

  <main class="main">
    <section class="section">
      <header class="header">
        <SearchBar
          placeholder="Buscar cliente por Nome ou CPF"
          @search="handleSearchCliente"
        />
        <BaseButton variant="add" @click="isAddingCliente = true">
          <span>Novo Cliente</span>
        </BaseButton>
      </header>
      <h2>Clientes</h2>
      <BaseTable
        type="cliente"
        :data="clientesData"
        @select-row="handleSelectCliente"
      />
    </section>
    <section class="section">
      <header class="header">
        <SearchBar
          placeholder="Buscar contato por ID Cliente"
          @search="handleSearchContatos"
        />
        <BaseButton variant="add" @click="isAddingContato = true">
          <span>Novo Contato</span>
        </BaseButton>
      </header>
      <h2>Contatos</h2>
      <BaseTable
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
