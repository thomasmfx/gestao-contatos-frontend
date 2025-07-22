<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import Image from '@/assets/images/Contact us-rafiki.svg';
import BaseHeader from '@/components/BaseHeader.vue';
</script>

<template>
  <BaseHeader route="/" />
  <main class="main">
    <section class="hero">
      <h1 class="title">Gestão de Contatos</h1>
      <h2 class="subtitle">
        Organize e gerencie seus clientes e contatos de forma eficiente
      </h2>
      <RouterLink to="/clientes" class="hero-btn">
        Iniciar
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-right icon"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </RouterLink>
    </section>
    <img :src="Image" class="img" alt="Contact" />
  </main>
</template>

<style scoped>
.main {
  flex: 0.7;
  font-family: var(--font-menu);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 4em;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-size: 4rem;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  opacity: 80%;
  max-width: 30ch;
}

.img {
  width: 600px;
  height: 600px;
}

.hero-btn {
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
  font-weight: 600;
  border-radius: var(--pill-radius);
  padding: 0.5em 2em;
  font-size: 1.4rem;
  background-color: var(--color-primary);
  color: #ffffff;
  text-decoration: none;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-hover);
  }
}
</style>
