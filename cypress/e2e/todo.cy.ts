describe('Todo E2E', () => {
    it('Добавляет задачу через UI', () => {
        cy.visit('http://localhost:5173/')
        cy.get('input[placeholder="Введите задачу"]').type('Купить хлеб')
        cy.contains('Добавить').click()
        cy.contains('Купить хлеб').should('exist')
    })
})
