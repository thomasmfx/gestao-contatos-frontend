/// <reference types="cypress" />
import '../../cypress/support/component';

import { createRouter, createWebHistory } from 'vue-router';

import '@/assets/index.css';

import BaseHeader from '../components/BaseHeader.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: { template: '<div></div>' },
    },
  ],
});

describe('<BaseHeader />', () => {
  it('renders', () => {
    cy.mount(BaseHeader, {
      props: {
        previousRoute: '/',
      },
      global: {
        plugins: [router],
      },
    });
  });

  it('has link to previous route', () => {
    cy.mount(BaseHeader, {
      props: {
        previousRoute: '/',
      },
      global: {
        plugins: [router],
      },
    });

    cy.get('a').should('have.attr', 'href', '/');
  });
});
