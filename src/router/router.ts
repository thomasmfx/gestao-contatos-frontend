import { createMemoryHistory, createRouter } from 'vue-router';

import ClientesView from '@/views/ClientesView.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/clientes', component: ClientesView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
