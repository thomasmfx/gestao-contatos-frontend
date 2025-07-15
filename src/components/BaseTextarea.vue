<script lang="ts" setup>
interface Props {
  modelValue?: string;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

function handleInputEvent(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <textarea
    class="input textarea"
    name="observacao"
    id="textarea"
    :value="modelValue"
    @input="handleInputEvent"
  ></textarea>
</template>

<style scoped>
.textarea {
  width: 100%;
  height: 70px;
  resize: none;
}
</style>
