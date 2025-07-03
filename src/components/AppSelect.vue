<script lang="ts" setup>
interface Props {
  options: string[];
  value?: string;
  id: string;
  required: boolean;
  modelValue: string;
}

const { modelValue = '' } = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

function handleSelectEvent(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <select
    class="select input"
    :required="required"
    :value="modelValue"
    :id="id"
    @change="handleSelectEvent"
  >
    <option v-for="option in options" :value="option" :key="option">
      {{ option }}
    </option>
  </select>
</template>
