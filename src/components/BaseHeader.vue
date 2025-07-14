<script lang="ts" setup>
import { RouterLink } from 'vue-router';

interface Props {
  previousRoute: string;
}

defineProps<Props>();
</script>

<template>
  <header class="header">
    <RouterLink :to="previousRoute">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#343A40"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-arrow-left icon"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>Voltar</span>
    </RouterLink>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background-color: #ffffff;
  height: 74px;
  width: 100%;
}

a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-default);
  transition: color var(--transition-fast);

  & > .icon {
    transition: stroke var(--transition-fast);
  }
}
a:hover {
  color: var(--color-primary);

  & > .icon {
    stroke: var(--color-primary);
  }
}
</style>
