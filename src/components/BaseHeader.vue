<script lang="ts" setup>
import { RouterLink } from 'vue-router';

interface Props {
  route: string;
}

defineProps<Props>();
</script>

<template>
  <header class="header">
    <div class="logo">
      <svg
        data-logo="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 40"
        height="40"
        width="13"
      >
        <g id="logogram" transform="translate(0, 0) rotate(0) ">
          <path
            d="M13.7544 6.5C13.7544 4.77609 13.0696 3.12278 11.8506 1.90381C10.6316 0.684818 8.9783 0 7.25439 0C5.53048 0 3.87719 0.684818 2.6582 1.90381C1.43921 3.12278 0.754395 4.77609 0.754395 6.5V26.1553L6.10734 29.9908V39.3346H8.40145V29.9908L13.7544 26.1553V6.5ZM11.4603 17.4926L8.40145 20.5515V17.6838L11.4603 14.625V17.4926ZM3.09631 14.625L6.15513 17.6838V20.5515L3.09631 17.4926V14.625ZM11.4603 11.375L7.25439 15.5809L3.04851 11.2794V8.41177L7.25439 12.6176L11.4603 8.41177V11.375ZM7.25439 2.29412C8.17939 2.2982 9.07754 2.60541 9.81126 3.16867C10.545 3.73192 11.0739 4.52016 11.3169 5.41268L7.25439 9.46323L3.19189 5.41268C3.42601 4.51129 3.95107 3.71235 4.68562 3.13985C5.42016 2.56733 6.32311 2.25324 7.25439 2.24631V2.29412ZM3.04851 24.9963V20.6949L6.10734 23.7537V27.171L3.04851 24.9963ZM8.40145 27.1829V23.7537L11.4603 20.6949V24.9844L8.40145 27.1829Z"
            fill="#4285F4"
          />
        </g>
        <g id="logotype" transform="translate(14, 20)"></g>
      </svg>
      <span>S.A.</span>
    </div>
    <nav class="nav-routes" aria-label="Rotas de navegação">
      <RouterLink
        to="/"
        :class="`nav-routes-link ${route === '/' ? 'nav-routes-link--highlighted' : ''}`"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-home"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Início</span>
      </RouterLink>
      <RouterLink
        to="/clientes"
        :class="`nav-routes-link ${route === '/clientes' ? 'nav-routes-link--highlighted' : ''}`"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-users"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span>Clientes</span>
      </RouterLink>
      <RouterLink
        to="/clientes/new"
        :class="`nav-routes-link ${route === '/clientes/new' ? 'nav-routes-link--highlighted' : ''}`"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Novo cliente</span>
      </RouterLink>
    </nav>
    <nav class="nav-buttons" aria-label="Links de login e cadastro">
      <button class="nav-btn nav-btn-entrar">Entrar</button>
      <button class="nav-btn nav-btn-cadastrar">Cadastrar-se</button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  font-family: Montserrat, sans-serif;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: 0 0 5px -1px #00000034;
  background-color: #ffffff;
  padding-inline: 0.5em;
  padding-inline: 2em;
  z-index: 1;
}

.logo {
  justify-self: start;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-primary);
  font-family: var(--font-menu);
  padding: 0.3em 0;
}

.nav-routes {
  display: flex;
  justify-content: center;
  gap: 2em;
}

.nav-routes-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-default);
  border-bottom: 2px solid transparent;
}
.nav-routes-link:hover {
  color: var(--color-primary);
}
.nav-routes-link--highlighted {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}

.nav-buttons {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 0.3em 0;
}

.nav-btn {
  cursor: pointer;
  padding: 0.4em 0.8em;
  font-weight: 600;
  border: 2px solid var(--color-primary);
  border-radius: var(--pill-radius);
  transition: all var(--transition-fast);
}

.nav-btn-entrar {
  color: var(--color-primary);
  background-color: #ffffff;
}
.nav-btn-entrar:hover {
  color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.nav-btn-cadastrar {
  color: #ffffff;
  background-color: var(--color-primary);
}
.nav-btn-cadastrar:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}
</style>
