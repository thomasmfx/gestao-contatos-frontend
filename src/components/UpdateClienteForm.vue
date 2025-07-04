<script lang="ts" setup>
import { ref } from 'vue';

import type { Cliente } from '@/types/Cliente';
import type { Contato } from '@/types/Contato';

import X from '@/assets/icons/x.svg';

import FormRowLegend from './FormRowLegend.vue';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import AppLabel from './AppLabel.vue';
import AppTable from './AppTable.vue';

interface Props {
  cliente: Cliente;
  contatos: Contato[];
}

const props = defineProps<Props>();

const data = ref<Cliente>(props.cliente);

const emit = defineEmits(['salvar', 'excluir', 'cancelar']);

function handleSalvarEmit(e: Event) {
  e.preventDefault();
  emit('salvar', data.value.id, data.value);
}

function handleExcluirEmit(e: Event) {
  e.preventDefault();
  emit('excluir', data.value.id);
}

function handleCancelarEmit(e: Event) {
  e.preventDefault();
  emit('cancelar');
}
</script>

<template>
  <form class="form" @submit="handleSalvarEmit">
    <header class="form-header">
      <h3 class="form-heading">Detalhes do Cliente</h3>
      <AppButton
        class="button-close"
        variant="transparent"
        isSquare
        @click="handleCancelarEmit"
      >
        <img :src="X" alt="Close" />
      </AppButton>
    </header>
    <FormRowLegend>Dados Pessoais</FormRowLegend>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="nome">ID</AppLabel>
        <AppInput :modelValue="data.id" id="nome" disabled required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="nome">Nome</AppLabel>
        <AppInput v-model="data.nome" id="nome" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="cpf">CPF</AppLabel>
        <AppInput v-model="data.cpf" id="cpf" required />
      </div>
      <div class="form-field">
        <AppLabel htmlFor="data-nascimento">Data de Nascimento</AppLabel>
        <AppInput
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
        <AppLabel htmlFor="endereco">Rua</AppLabel>
        <AppInput v-model="data.endereco.rua" id="endereco" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="endereco">Numero</AppLabel>
        <AppInput v-model="data.endereco.numero" id="endereco" />
      </div>
      <div class="form-field">
        <AppLabel htmlFor="cidade">Cidade</AppLabel>
        <AppInput v-model="data.endereco.cidade" id="cidade" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="estado">Estado</AppLabel>
        <AppInput v-model="data.endereco.estado" id="estado" />
      </div>
      <div class="form-field">
        <AppLabel htmlFor="estado">CEP</AppLabel>
        <AppInput v-model="data.endereco.cep" id="estado" />
      </div>
    </div>
    <FormRowLegend>Contatos</FormRowLegend>
    <div class="form-row">
      <AppTable type="contato" :data="props.contatos" size="small" />
    </div>
    <div class="form-actions">
      <AppButton
        @click="handleExcluirEmit"
        variant="delete small"
        type="button"
      >
        Excluir
      </AppButton>
      <AppButton variant="add" type="submit"> Salvar </AppButton>
    </div>
  </form>
</template>
