<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import InboxIconHighlighted from '@/assets/icons/inbox-highlighted.svg';
import UserIconHighlighted from '@/assets/icons/user-highlighted.svg';
import InboxIcon from '@/assets/icons/inbox.svg';
import UserIcon from '@/assets/icons/user.svg';

interface Props {
  highlighted: string;
  vertical?: boolean;
}

defineProps<Props>();
</script>

<template>
  <nav :class="`nav ${vertical ? 'vertical' : ''}`">
    <RouterLink
      to="/clientes"
      :class="highlighted === 'clientes' ? 'highlighted' : ''"
    >
      <img
        :src="highlighted === 'clientes' ? UserIconHighlighted : UserIcon"
        alt="User Icon"
      />
      Clientes
    </RouterLink>
    <div class="line" />
    <RouterLink
      v-if="!vertical"
      to="/contatos"
      :class="highlighted === 'contatos' ? 'highlighted' : ''"
    >
      <img
        :src="highlighted === 'contatos' ? InboxIconHighlighted : InboxIcon"
        alt="Inbox Icon"
      />
      Contatos
    </RouterLink>
    <RouterLink
      v-if="vertical"
      to="/contatos"
      :class="highlighted === 'contatos' ? 'highlighted' : ''"
    >
      Contatos
      <img
        :src="highlighted === 'contatos' ? InboxIconHighlighted : InboxIcon"
        alt="Inbox Icon"
      />
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  display: grid;
  grid-template-rows: 1fr 2px 1fr;
  row-gap: 0.4em;
  min-width: fit-content;

  &.vertical {
    grid-template-rows: 0;
    grid-template-columns: 1fr 2px 1fr;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.8em;

    .line {
      width: 2px;
      height: 80%;
    }
  }
}

.line {
  background-color: var(--color-primary);
}

a {
  margin-inline: 0.2em;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6em;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-default);
  transition: opacity var(--transition-regular);
}

.highlighted {
  color: var(--color-primary);
  stroke: var(--color-primary);
}
</style>
