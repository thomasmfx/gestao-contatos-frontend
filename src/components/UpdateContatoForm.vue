<script lang="ts" setup>
import { ref } from 'vue';

import type { Contato } from '@/types/Contato';

import tiposContato from '@/utils/tiposContato';

import BaseTextarea from './BaseTextarea.vue';
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
    </header>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="tipo">Tipo</BaseLabel>
        <BaseSelect
          v-model="data.tipo"
          :options="[...tiposContato]"
          id="tipo"
          required
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="valor">Valor</BaseLabel>
        <BaseInput v-model="data.valor" id="valor" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="observacao">Observação</BaseLabel>
        <BaseTextarea v-model="data.observacao" id="observacao" />
      </div>
    </div>
    <div class="form-actions">
      <BaseButton
        class="cancel-button"
        variant="delete-alternative small"
        @click="handleCancelarEmit"
      >
        Cancelar
      </BaseButton>
      <BaseButton @click="handleExcluirEmit" variant="delete small">
        Excluir
      </BaseButton>
      <BaseButton variant="add small" type="submit"> Salvar </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form-actions {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  justify-content: end;
}

.cancel-button {
  justify-self: start;
}
</style>
