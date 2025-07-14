<script lang="ts" setup>
import { ref } from 'vue';

import SearchIcon from '@/assets/icons/search.svg';

import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';

interface Props {
  placeholder?: string;
}

const value = ref<string | number>('');
const emit = defineEmits(['search']);
const { placeholder = '' } = defineProps<Props>();

function handleSubmit(e: unknown) {
  (e as Event).preventDefault();
  emit('search', value.value);
}
</script>

<template>
  <form @submit="handleSubmit" class="searchbar-form">
    <BaseInput
      v-model="value"
      inputName="Barra de pesquisa"
      class="searchbar-input"
      :placeholder="placeholder"
    />
    <BaseButton
      class="button-search"
      type="submit"
      isCircle
      @click="handleSubmit"
    >
      <img :src="SearchIcon" alt="Search" />
    </BaseButton>
  </form>
</template>

<style scoped>
.searchbar-form {
  display: flex;
  gap: 1em;
  flex-basis: 100%;
}
</style>
