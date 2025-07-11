<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="main">
    <h1 class="title">Comércio S.A.</h1>
    <h2 class="subtitle">Gestão de Contatos</h2>
    <nav class="nav">
      <RouterLink to="/clientes"> Clientes </RouterLink>
      <RouterLink to="/contatos"> Contatos </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
.main {
  height: 90%;
  font-family: var(--font-menu);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 5rem;
}

.subtitle {
  font-weight: 500;
  opacity: 80%;
}

.nav {
  margin-top: 2em;
  display: flex;
  gap: 1em;
}

a {
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
