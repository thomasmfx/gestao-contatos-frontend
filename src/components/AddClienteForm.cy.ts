import AddClienteForm from './AddClienteForm.vue';
import '@/assets/index.css';

describe('<AddClienteForm />', () => {
  beforeEach(() => {
    cy.mount(AddClienteForm);
  });

  it('emits "salvar" with correct payload on form submit', () => {
    const salvarSpy = cy.spy().as('salvarSpy');

    cy.mount(AddClienteForm, {
      props: {
        onSalvar: salvarSpy,
      },
    });

    cy.get('#nome').type('João');
    cy.get('#cpf').type('12345678901');
    cy.get('#data-nascimento').type('2000-01-01');

    cy.get('form').submit();

    cy.get('@salvarSpy').should('have.been.calledOnce');
    cy.get('@salvarSpy').its('firstCall.args.0').should('include', {
      nome: 'João',
      cpf: '12345678901',
      dataNascimento: '2000-01-01',
    });
  });

  it('emits "cancelar" on Cancelar button click', () => {
    const cancelarSpy = cy.spy().as('cancelarSpy');

    cy.mount(AddClienteForm, {
      props: {
        onCancelar: cancelarSpy,
      },
    });

    cy.get('button.delete').click();
    cy.get('@cancelarSpy').should('have.been.calledOnce');
  });

  it('deve buscar CEP e preencher todos os campos possíveis se for válido', () => {
    cy.intercept('GET', '**/endereco/*', { fixture: 'endereco.json' }).as(
      'getEndereco',
    );

    cy.get('#cep').type('01001-000');

    cy.wait('@getEndereco');

    cy.contains('CEP encontrado').should('be.visible');

    cy.get('#rua').should('have.value', 'Praça da Sé');
    cy.get('#cidade').should('have.value', 'São Paulo');
    cy.get('#estado').should('have.value', 'SP');
  });
});
