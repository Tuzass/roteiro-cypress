describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Testa a deleção de tarefas com reload', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Lista de LP{enter}')
      .type('Lista de ISL{enter}');

    cy.reload();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0)
  });

  it('Testa a quantidade de tarefas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Listas de LP{enter}')
      .type('TP de ICD{enter}')
      .type('Prova de ALC{enter}');

    cy.get('.todo-count')
      .should('have.text', '3 items left');

    cy.get('.toggle-all-label')
      .should('exist')
      .click();
    
    cy.get('.todo-count')
      .should('have.text', '0 items left');
  });

  it('Testa edição de tarefas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Teste de ES{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .dblclick();

    cy.get('[data-cy=todo-edit-input]')
      .clear()
      .type('Teste 10 de ES{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', 'Teste 10 de ES');
  });
});