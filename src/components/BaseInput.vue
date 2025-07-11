<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';

interface Props {
  id?: string;
  type?: InputTypeHTMLAttribute;
  disabled?: boolean;
  placeholder?: string;
  modelValue?: string | number;
  required?: boolean;
}

const { type = 'text', placeholder = '' } = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

function handleInputEvent(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <input
    :disabled="disabled"
    autocomplete="off"
    class="input"
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :required="required"
    @input="handleInputEvent"
  />
</template>

<style scoped>
.input {
  width: 100%;
  height: 35px;
  border: 2px solid var(--color-neutral);
  border-radius: 5px;
  outline: none;
  padding-inline: 0.3em;
  color: var(--color-default);

  &::placeholder {
    opacity: 0.5;
  }
}
</style>
