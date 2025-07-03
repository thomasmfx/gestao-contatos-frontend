<script lang="ts" setup>
import { useClientes } from '@/composables/useClientes';
import { useContatos } from '@/composables/useContatos';
import type { Cliente, ClientePayload, ClienteUpdatePayload } from '@/types/Cliente';
import type { Contato, ContatoPayload, ContatoUpdatePayload } from '@/types/Contato';
import type { ID } from '@/types/ID';
import { onMounted, ref } from 'vue';

import AppModal from '@/components/AppModal.vue';
import AddClienteForm from '@/components/AddClienteForm.vue';
import UpdateClienteForm from '@/components/UpdateClienteForm.vue';
import AddContatoForm from '@/components/AddContatoForm.vue';
import UpdateContatoForm from '@/components/UpdateContatoForm.vue';
import AppSearchBar from '@/components/AppSearchBar.vue';
import AppButton from '@/components/AppButton.vue';
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

const selectedContato = ref<Contato | null>(null)
const isAddingContato = ref<boolean>(false)

onMounted(() => {
  setClientes()
  setContatos()
})

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
  addCliente(data).then(() => {
    isAddingCliente.value = false;
    setClientes();
  });
}

function handleUpdateCliente(id: ID, newData: ClienteUpdatePayload) {
  updateCliente(newData, id).then(() => {
    selectedCliente.value = null;
    setClientes();
    setContatos();
  });
}

function handleDeleteCliente(id: ID) {
  deleteCliente(id).then(() => {
    selectedCliente.value = null;
    setClientes();
    setContatos();
  });
}

// Funções para gerenciar contatos
function handleSelectContato(id: ID) {
  getSingleContato(id).then((contato) => {
    selectedContato.value = contato;
  });
}

function handleAddContato(data: ContatoPayload) {
  addContato(data).then(() => {
    isAddingContato.value = false;
    setContatos();
  });
}

function handleUpdateContato(id: ID, newData: ContatoUpdatePayload) {
  updateContato(id, newData).then(() => {
    selectedContato.value = null;
    setContatos();
  });
}

function handleDeleteContato(id: ID) {
  deleteContato(id).then(() => {
    selectedContato.value = null;
    setContatos();
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

  <AppModal v-if="selectedCliente && selectedClienteContatos" @close="selectedCliente = null">
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

  <AppModal v-if="selectedContato"@close="selectedContato = null">
    <UpdateContatoForm
      :contato="selectedContato"
      @cancelar ="selectedContato = null"
      @excluir="handleDeleteContato"
      @salvar="handleUpdateContato"
    />
  </AppModal>

  <main class="main">
    <section class="section">
      <header class="header">
        <AppSearchBar 
          placeholder="Buscar cliente por Nome ou CPF"
          @search="setClientes"
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
          @search="setContatos"
        />
        <AppButton variant="add" @click="isAddingContato = true">
          <span>Novo Contato</span>
        </AppButton>
      </header>
      <h2>Contatos</h2>
      <AppTable 
        type="contato"
        @select-row="handleSelectContato"
        :data="contatosData"
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