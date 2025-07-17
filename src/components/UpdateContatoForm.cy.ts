import UpdateContatoForm from './UpdateContatoForm.vue';
import '@/assets/index.css';

describe('<UpdateContatoForm />', () => {
  const initialContato = {
    id: 123,
    tipo: '',
    valor: '',
    observacao: '',
  };

  it('emite "cancelar" ao clicar no botão Cancelar', () => {
    const cancelarSpy = cy.spy().as('cancelarSpy');

    cy.mount(UpdateContatoForm, {
      props: {
        contato: initialContato,
        onCancelar: cancelarSpy,
      },
    });

    cy.get('button.cancel-button').click();
    cy.get('@cancelarSpy').should('have.been.calledOnce');
  });

  it('emite "excluir" ao clicar no botão Excluir', () => {
    const excluirSpy = cy.spy().as('excluirSpy');

    cy.mount(UpdateContatoForm, {
      props: {
        contato: initialContato,
        onExcluir: excluirSpy,
      },
    });

    cy.get('button').contains('Excluir').click();
    cy.get('@excluirSpy').should('have.been.calledOnceWith', initialContato.id);
  });

  it('emite "salvar" com dados atualizados ao submeter o formulário', () => {
    const salvarSpy = cy.spy().as('salvarSpy');

    cy.mount(UpdateContatoForm, {
      props: {
        contato: { ...initialContato },
        onSalvar: salvarSpy,
      },
    });

    const mockData = {
      tipo: 'E-mail',
      valor: 'contato@email.com',
      observacao: 'Contato de teste',
    };

    cy.get('#tipo').select(mockData.tipo);
    cy.get('#valor').clear().type(mockData.valor); // o id é estranho, veja comentário abaixo
    cy.get('textarea').clear().type(mockData.observacao);

    cy.get('form').submit();

    cy.get('@salvarSpy').should('have.been.calledOnce');

    cy.get('@salvarSpy')
      .its('firstCall.args')
      .then(([id, payload]) => {
        expect(id).to.equal(initialContato.id);
        expect(payload).to.include(mockData);
      });
  });
});
