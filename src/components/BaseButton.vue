<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: string;
  isCircle?: boolean;
}

const {
  type = 'button',
  variant = '',
  isCircle = false,
} = defineProps<Props>();

const buttonClasses = computed(() =>
  ['button', variant, isCircle ? 'circle' : ''].filter(Boolean).join(' '),
);

const emit = defineEmits(['click']);

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <button :type="type" :class="buttonClasses" @click="handleClick">
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding-inline: 0.5em;
  border: none;
  border-radius: var(--pill-radius);
  background-color: var(--color-primary);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  white-space: nowrap;
  font-weight: 600;

  &:not(.circle):not(.small) {
    width: 115px;
    font-size: 1.1rem;
  }
}

.button:hover {
  background-color: var(--color-primary-hover);
}

.circle {
  height: 35px;
  min-width: 35px;
  padding-inline: 0;
}

.small {
  width: 90px;
}

.transparent {
  background: none;
}
.transparent:hover {
  background: none;
}

.add {
  background-color: var(--color-add);
}
.add:hover {
  background-color: var(--color-add-hover);
}

.edit {
  background-color: var(--color-edit);
  color: black;
}
.edit:hover {
  background-color: var(--color-edit-hover);
}

.delete {
  background-color: var(--color-delete);
}
.delete:hover {
  background-color: var(--color-delete-hover);
}

.delete-alternative {
  background-color: transparent;
  color: var(--color-delete);
  border: 2px solid var(--color-delete);
}
.delete-alternative:hover {
  background-color: transparent;
  color: var(--color-delete-hover);
  border: 2px solid var(--color-delete-hover);
}
</style>
