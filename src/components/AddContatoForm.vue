<script lang="ts" setup>
import { ref } from 'vue';

import type { ContatoPayload } from '@/types/Contato';

import tiposContato from '@/utils/tiposContato';

import FormRowLegend from './FormRowLegend.vue';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';

const contatoInitialData: ContatoPayload = {
  clienteId: '',
  tipo: 'Telefone',
  valor: '',
  observacao: '',
};

const data = ref<ContatoPayload>({ ...contatoInitialData });
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
      <h3 class="form-heading">Novo Contato</h3>
    </header>
    <FormRowLegend>Dados de Contato</FormRowLegend>
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
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="data-nascimento">Valor</BaseLabel>
        <BaseInput v-model="data.valor" id="data-nascimento" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="endereco">Observação</BaseLabel>
        <textarea
          class="input textarea"
          name="observacao"
          id="textarea"
        ></textarea>
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

<style scoped>
.textarea {
  width: 100%;
  height: 70px;
  resize: none;
}
</style>
