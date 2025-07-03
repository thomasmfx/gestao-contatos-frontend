<script lang="ts" setup>
import { ref } from 'vue';

import SearchIcon from '@/assets/icons/search.svg';

import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

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
    <AppInput
      v-model="value"
      inputName="Barra de pesquisa"
      class="searchbar-input"
      :placeholder="placeholder"
    />
    <AppButton @click="handleSubmit" type="submit" isSquare>
      <img :src="SearchIcon" alt="Search" />
    </AppButton>
  </form>
</template>

<style scoped>
.searchbar-form {
  display: flex;
  gap: 1em;
  flex-basis: 100%;
}
</style>
