<script lang="ts" setup>
import AppButton from './AppButton.vue';
import AppLabel from './AppLabel.vue';
import AppInput from './AppInput.vue';
import AppSelect from './AppSelect.vue';
import FormRowLegend from './FormRowLegend.vue';
import tiposContato from '@/utils/tiposContato';
import { ref } from 'vue';
import type { ContatoPayload } from '@/types/Contato';
import X from '@/assets/icons/x.svg';

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
      <h3 class="form-heading">Novo Cliente</h3>
      <AppButton @click="handleCancelarEmit" variant="transparent" isSquare>
        <img :src="X" alt="Close" />
      </AppButton>
    </header>
    <FormRowLegend>Dados Pessoais</FormRowLegend>
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
      <AppButton @click="handleCancelarEmit" variant="delete">
        Cancelar
      </AppButton>
      <AppButton variant="add" type="submit"> Salvar </AppButton>
    </div>
  </form>
</template>
