<script lang="ts" setup>
import { ref } from 'vue';

import type { Contato } from '@/types/Contato';

import tiposContato from '@/utils/tiposContato';
import X from '@/assets/icons/x.svg';

import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';

interface Props {
  contato: Contato;
}

const props = defineProps<Props>();

const data = ref<Contato>(props.contato);

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
      <h3 class="form-heading">Detalhes do Contato</h3>
      <BaseButton
        @click="handleCancelarEmit"
        variant="transparent"
        isSquare
        class="button-close"
      >
        <img :src="X" alt="Close" />
      </BaseButton>
    </header>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="nome">ID</BaseLabel>
        <BaseInput :modelValue="data.id" id="nome" disabled required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="nome">ID Cliente</BaseLabel>
        <BaseInput v-model="data.clienteId" id="nome" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="cpf">Tipo</BaseLabel>
        <BaseSelect
          v-model="data.tipo"
          :options="[...tiposContato]"
          id="tipo"
          required
        />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="data-nascimento">Valor</BaseLabel>
        <BaseInput v-model="data.valor" id="data-nascimento" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="endereco">Observação</BaseLabel>
        <BaseInput v-model="data.observacao" id="endereco" />
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
