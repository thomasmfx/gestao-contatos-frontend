<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="main">
    <h1 class="title">Comércio S.A.</h1>
    <h2 class="subtitle">Gestão de Contatos</h2>
    <nav class="nav">
      <RouterLink to="/clientes">
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
    </nav>
  </main>
</template>

<style scoped>
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
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
