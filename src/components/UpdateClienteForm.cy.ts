import UpdateClienteForm from './UpdateClienteForm.vue';
import '@/assets/index.css';

describe('<UpdateClienteForm />', () => {
  const initialCliente = {
    id: 1,
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: {
      cep: '',
      estado: '',
      cidade: '',
      rua: '',
      numero: '',
    },
  };

  it('emite "cancelar" ao clicar no botão excluir (botão delete)', () => {
    const excluirSpy = cy.spy().as('excluirSpy');
    cy.mount(UpdateClienteForm, {
      props: {
        cliente: initialCliente,
        onExcluir: excluirSpy,
      },
    });

    cy.get('button.delete').click();
    cy.get('@excluirSpy').should('have.been.calledOnceWith', initialCliente.id);
  });

  it('emite "salvar" com dados atualizados ao enviar o formulário', () => {
    const salvarSpy = cy.spy().as('salvarSpy');
    cy.mount(UpdateClienteForm, {
      props: {
        cliente: { ...initialCliente },
        onSalvar: salvarSpy,
      },
    });

    const dataMock = {
      nome: 'Thomas',
      cpf: '47894328820',
      dataNascimento: '2005-10-13',
    };

    // Limpa e digita (para garantir que sobrescreve o que já tem)
    cy.get('#nome').clear().type(dataMock.nome);
    cy.get('#cpf').clear().type(dataMock.cpf);
    cy.get('#data-nascimento').clear().type(dataMock.dataNascimento);

    cy.get('form').submit();

    cy.get('@salvarSpy').should('have.been.calledOnce');

    cy.get('@salvarSpy')
      .its('firstCall.args')
      .then(([id, payload]) => {
        expect(id).to.equal(initialCliente.id);
        expect(payload).to.include(dataMock);
      });
  });
});
