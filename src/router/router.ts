import { createMemoryHistory, createRouter } from 'vue-router';

import ClienteDetailsView from '@/views/ClienteDetailsView.vue';
import AddClienteView from '@/views/AddClienteView.vue';
import ClientesView from '@/views/ClientesView.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/clientes', component: ClientesView },
  { path: '/clientes/new', component: AddClienteView },
  {
    path: '/clientes/:id',
    component: ClienteDetailsView,
    name: 'ClienteDetailsView',
    props: true,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
