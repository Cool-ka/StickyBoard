// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url and checks if the button exists', () => {
    cy.visit('/')
    cy.contains('[data-cy=prepareButton]', 'Add Sticky')
  })
  it('clicks the button and asserts addition components', () => {
    cy.get('[data-cy=prepareButton]').click();
    cy.get('[data-cy=colorPicker]').should('be.visible')
    cy.get('[data-cy=textField]').should('be.visible')
    cy.get('[data-cy=addSticky]').should('be.visible')
  })
  it('adds default sticky', () => {
    cy.get('[data-cy=addSticky]').click();
    cy.get('[data-cy=sticky]').should('be.visible')
    cy.get('[data-cy=sticky]').contains('Default text for a new sticky')
  })
  it('drags and drops the sticky', () => {
    const dataTransfer = new DataTransfer;
    dataTransfer.setData("itemIndex", 0)
    cy.get('[data-cy=droppableBoard]').trigger('drop', { dataTransfer, x: 200, y: 300, force: true });
  })
  it('edits the text', () => {
    cy.get('[data-cy=sticky]').click()
    cy.get('[data-cy=inputText]').clear().type('new sticky')
    cy.get('[data-cy=droppableBoard]').click()
    cy.get('[data-cy=sticky]').contains('new sticky')
  })
  it('adds second sticky', () => {
    cy.get('[data-cy=prepareButton]').click();
    cy.get('[data-cy=textField]').type('second sticky')
    cy.get('[data-cy=addSticky]').click();
    cy.get('[data-cy=sticky]')
      .its('length')
      .should('be', 2);
  })
  it('removes second sticky', () => {
    cy.get('[data-cy=sticky]').eq(0).click();
    cy.get('[data-cy=remove]').click();
    cy.get('[data-cy=sticky]')
      .its('length')
      .should('be', 1);
  })
  it('adds another sticky', () => {
    cy.get('[data-cy=prepareButton]').click();
    cy.get('[data-cy=textField]').type('yet another sticky')
    cy.get('[data-cy=addSticky]').click();
    const dataTransfer = new DataTransfer;
    dataTransfer.setData("itemIndex", 1)
    cy.get('[data-cy=droppableBoard]').trigger('drop', { dataTransfer, x: 200, y: 300, force: true });
    cy.reload();
    cy.get('[data-cy=sticky]')
      .its('length')
      .should('be', 2);
  })
})
