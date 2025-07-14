<script lang="ts" setup>
import { ref } from 'vue';

import type { Cliente } from '@/types/Cliente';
import type { Contato } from '@/types/Contato';

import FormRowLegend from './FormRowLegend.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';

interface Props {
  cliente: Cliente;
  contatos: Contato[];
}

const props = defineProps<Props>();

const data = ref<Cliente>(props.cliente);

const emit = defineEmits(['salvar', 'excluir']);

function handleSalvarEmit(e: Event) {
  e.preventDefault();
  emit('salvar', data.value.id, data.value);
}

function handleExcluirEmit(e: Event) {
  e.preventDefault();
  emit('excluir', data.value.id);
}
</script>

<template>
  <form class="form" @submit="handleSalvarEmit">
    <header class="form-header">
      <h3 class="form-heading">Detalhes do Cliente</h3>
    </header>
    <FormRowLegend>Dados Pessoais</FormRowLegend>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="nome">ID</BaseLabel>
        <BaseInput :modelValue="data.id" id="nome" disabled required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="nome">Nome</BaseLabel>
        <BaseInput v-model="data.nome" id="nome" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="cpf">CPF</BaseLabel>
        <BaseInput v-model="data.cpf" id="cpf" required />
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
        <BaseInput v-model="data.endereco.numero" id="endereco" />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="cidade">Cidade</BaseLabel>
        <BaseInput v-model="data.endereco.cidade" id="cidade" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="estado">Estado</BaseLabel>
        <BaseInput v-model="data.endereco.estado" id="estado" />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="estado">CEP</BaseLabel>
        <BaseInput v-model="data.endereco.cep" id="estado" />
      </div>
    </div>
    <div class="form-actions">
      <BaseButton
        @click="handleExcluirEmit"
        variant="delete small"
        type="button"
      >
        Excluir
      </BaseButton>
      <BaseButton variant="add small" type="submit"> Salvar </BaseButton>
    </div>
  </form>
</template>
