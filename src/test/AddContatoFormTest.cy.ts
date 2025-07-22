/// <reference types="cypress" />
import '../../cypress/support/component';
import AddContatoForm from '../components/AddContatoForm.vue';
import '@/assets/index.css';

describe('<AddContatoForm />', () => {
  it('emite "cancelar" ao clicar no botão cancelar', () => {
    const cancelarSpy = cy.spy().as('cancelarSpy');

    cy.mount(AddContatoForm, {
      props: {
        onCancelar: cancelarSpy,
      },
    });

    cy.get('button.delete').click();
    cy.get('@cancelarSpy').should('have.been.calledOnce');
  });

  it('emite "salvar" com os dados corretos ao enviar o formulário', () => {
    const salvarSpy = cy.spy().as('salvarSpy');

    cy.mount(AddContatoForm, {
      props: {
        onSalvar: salvarSpy,
      },
    });

    const mock = {
      tipo: 'E-mail',
      valor: 'thomas@email.com',
      observacao: 'Contato principal',
    };

    cy.get('select').select(mock.tipo);
    cy.get('#valor').type(mock.valor);
    cy.get('textarea').type(mock.observacao);

    cy.get('form').submit();

    cy.get('@salvarSpy').should('have.been.calledOnce');
    cy.get('@salvarSpy').its('firstCall.args.0').should('deep.include', mock);
  });
});
