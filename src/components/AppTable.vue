<script lang="ts" setup>
import { computed } from 'vue';

import type { Cliente } from '@/types/Cliente';
import type { Contato } from '@/types/Contato';
import type { ID } from '@/types/ID';

import { clienteColumns, contatoColumns } from '@/utils/tableColumns';
import { formatarData, formatarDocumento } from '@/utils/formatData';
import { getEnderecoRuaAndNumero } from '@/utils/formatEndereco';

interface Props {
  type: 'cliente' | 'contato';
  data: (Cliente | Contato)[];
  size?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['selectRow']);

function handleSelectRow(id: ID) {
  emit('selectRow', id);
}

const columns = computed(() =>
  props.type === 'cliente' ? clienteColumns : contatoColumns,
);

const isInteractive = computed(() => !!emit);

function inferClienteColumnValue(
  cliente: Cliente,
  currentKey: string,
  currentValue: string | number,
) {
  if (currentKey === 'cpf') return formatarDocumento(cliente.cpf);
  if (currentKey === 'dataNascimento')
    return formatarData(cliente.dataNascimento);
  if (currentKey === 'endereco' && cliente.endereco)
    return getEnderecoRuaAndNumero(cliente.endereco);

  return currentValue;
}
</script>

<template>
  <table :class="`table ${size}`">
    <thead class="thead">
      <tr class="tr">
        <th class="th" v-for="column in columns" :key="column">
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr
        class="tr"
        @click="isInteractive && handleSelectRow(row.id)"
        v-for="row in props.data"
        :key="row.id ?? null"
        :data-id="isInteractive && row.id"
      >
        <td class="td" v-for="[key, value] in Object.entries(row)" :key="key">
          {{
            type === 'cliente'
              ? inferClienteColumnValue(row as Cliente, key, value)
              : value
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  border-spacing: 0;
  width: 100%;
}

.table.small {
  font-size: 0.7rem;
}

.thead {
  background-color: var(--color-neutral-light);
}

.th {
  padding: 0.5em;
}

.td {
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid var(--color-neutral-light);
  padding: 0.5em;
  cursor: pointer;
}
</style>
