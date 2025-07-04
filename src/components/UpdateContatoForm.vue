<script lang="ts" setup>
import { ref } from 'vue';

import type { Contato } from '@/types/Contato';

import tiposContato from '@/utils/tiposContato';
import X from '@/assets/icons/x.svg';

import AppButton from './AppButton.vue';
import AppSelect from './AppSelect.vue';
import AppInput from './AppInput.vue';
import AppLabel from './AppLabel.vue';

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
      <AppButton
        @click="handleCancelarEmit"
        variant="transparent"
        isSquare
        class="button-close"
      >
        <img :src="X" alt="Close" />
      </AppButton>
    </header>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="nome">ID</AppLabel>
        <AppInput :modelValue="data.id" id="nome" disabled required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="nome">ID Cliente</AppLabel>
        <AppInput v-model="data.clienteId" id="nome" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="cpf">Tipo</AppLabel>
        <AppSelect
          v-model="data.tipo"
          :options="[...tiposContato]"
          id="tipo"
          required
        />
      </div>
      <div class="form-field">
        <AppLabel htmlFor="data-nascimento">Valor</AppLabel>
        <AppInput v-model="data.valor" id="data-nascimento" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <AppLabel htmlFor="endereco">Observação</AppLabel>
        <AppInput v-model="data.observacao" id="endereco" />
      </div>
    </div>
    <div class="form-actions">
      <AppButton
        @click="handleExcluirEmit"
        variant="delete small"
        type="button"
      >
        Excluir
      </AppButton>
      <AppButton variant="add small" type="submit"> Salvar </AppButton>
    </div>
  </form>
</template>
