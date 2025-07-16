<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { ref } from 'vue';

import type { ClientePayload } from '@/types/Cliente';

import useEndereco from '@/composables/useEndereco';
import useNotify from '@/composables/useNotify';

import FormRowLegend from './FormRowLegend.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';
import 'vue3-toastify/dist/index.css';

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
const validatedCep = ref<string>('');
const areInputsDisabled = ref<boolean>(false);

const getEndereco = useEndereco();
const notify = useNotify();

async function handleValidarCep(valueOnDebounce: string) {
  if (valueOnDebounce === validatedCep.value) return;

  if (!data.value.endereco.cep) {
    data.value.endereco.rua = '';
    data.value.endereco.estado = '';
    data.value.endereco.cidade = '';
    validatedCep.value = '';
    notify('warning', 'CEP é obrigatório');
    return;
  }

  const cepValido = /^[0-9]{5}-?[0-9]{3}$/.test(data.value.endereco.cep);
  if (!cepValido) {
    notify('warning', 'CEP inválido');
    return;
  }

  areInputsDisabled.value = true;
  try {
    const endereco = await toast.promise(
      getEndereco(data.value.endereco.cep),
      {
        pending: 'Verificando CEP...',
        success: 'CEP encontrado',
        error: 'CEP não encontrado',
      },
      {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        hideProgressBar: true,
        position: 'top-center',
      },
    );

    data.value.endereco.rua = endereco.rua;
    data.value.endereco.estado = endereco.estado;
    data.value.endereco.cidade = endereco.cidade;
  } finally {
    areInputsDisabled.value = false;
    validatedCep.value = data.value.endereco.cep;
  }
}

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
  <form class="form limited-width" @submit="handleSalvarEmit">
    <header class="form-header">
      <h3 class="form-heading">Novo Cliente</h3>
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
        <BaseLabel htmlFor="cep">CEP</BaseLabel>
        <BaseInput
          v-model="data.endereco.cep!"
          id="cep"
          @debounce="handleValidarCep"
          :disabled="areInputsDisabled"
        />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="estado">Estado</BaseLabel>
        <BaseInput
          v-model="data.endereco.estado!"
          id="estado"
          :disabled="areInputsDisabled"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="rua">Rua</BaseLabel>
        <BaseInput
          v-model="data.endereco.rua"
          id="rua"
          :disabled="areInputsDisabled"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <BaseLabel htmlFor="endereco">Numero</BaseLabel>
        <BaseInput
          v-model="data.endereco.numero!"
          id="endereco"
          :disabled="areInputsDisabled"
        />
      </div>
      <div class="form-field">
        <BaseLabel htmlFor="cidade">Cidade</BaseLabel>
        <BaseInput
          v-model="data.endereco.cidade!"
          id="cidade"
          :disabled="areInputsDisabled"
        />
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
