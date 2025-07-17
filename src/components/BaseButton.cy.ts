import BaseButton from './BaseButton.vue';
import '@/assets/index.css';

describe('<BaseButton />', () => {
  it('emits click event when button is clicked', () => {
    const clickSpy = cy.spy().as('clickSpy');

    cy.mount(BaseButton, {
      slots: {
        default: 'Click Me',
      },
      props: {
        onClick: clickSpy,
      },
    });

    cy.get('button').click();
    cy.get('@clickSpy').should('have.been.called');
  });
});
