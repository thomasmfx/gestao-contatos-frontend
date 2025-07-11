<script lang="ts" setup>
import { ref } from 'vue';

import type { ClientePayload } from '@/types/Cliente';

import X from '@/assets/icons/x.svg';

import FormRowLegend from './FormRowLegend.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';

const clienteInitialData: ClientePayload = {
  nome: '',
  cpf: '',
  dataNascimento: '',
  endereco: {
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
  },
};

const data = ref<ClientePayload>({ ...clienteInitialData });
const emit = defineEmits(['salvar', 'cancelar']);

function handleSalvarEmit(e: Event) {
  e.preventDefault();
  emit('salvar', data.value);
}

function handleCancelarEmit(e: Event) {
  e.preventDefault();
  emit('cancelar');
}
</script>

<template>
  <form class="form" @submit="handleSalvarEmit">
    <header class="form-header">
      <h3 class="form-heading">Novo Cliente</h3>
      <BaseButton
        class="button-close"
        variant="transparent"
        isSquare
        @click="handleCancelarEmit"
      >
        <img :src="X" alt="Close" />
      </BaseButton>
    </header>
    <FormRowLegend>Dados Pessoais</FormRowLegend>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="nome">Nome</BaseLabel>
        <BaseInput v-model="data.nome" id="nome" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="cpf">CPF</BaseLabel>
        <BaseInput v-model="data.cpf" required id="cpf" />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="data-nascimento">Data de Nascimento</BaseLabel>
        <BaseInput
          v-model="data.dataNascimento"
          id="data-nascimento"
          type="date"
          required
        />
      </div>
    </div>
    <FormRowLegend>Informações de endereço</FormRowLegend>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="endereco">Rua</BaseLabel>
        <BaseInput v-model="data.endereco.rua" id="endereco" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="endereco">Numero</BaseLabel>
        <BaseInput v-model="data.endereco.numero!" id="endereco" />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="cidade">Cidade</BaseLabel>
        <BaseInput v-model="data.endereco.cidade!" id="cidade" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="estado">Estado</BaseLabel>
        <BaseInput v-model="data.endereco.estado!" id="estado" />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="estado">CEP</BaseLabel>
        <BaseInput v-model="data.endereco.cep!" id="estado" />
      </div>
    </div>
    <div class="form-actions">
      <BaseButton @click="handleCancelarEmit" variant="delete">
        Cancelar
      </BaseButton>
      <BaseButton variant="add" type="submit"> Salvar </BaseButton>
    </div>
  </form>
</template>
