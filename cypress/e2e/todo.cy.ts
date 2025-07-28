describe('Todo E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.clearLocalStorage();
    })
    it('Added task to UI', () => {
        cy.get('input[placeholder="Введите задачу"]').type('Купить молоко')
        cy.contains('Добавить').click()
        cy.contains('Купить молоко').should('exist')
    })


    it('Remove task', () => {
        cy.get('input[placeholder="Введите задачу"]').type('удалить меня')
        cy.contains('Добавить').click()
        cy.contains('удалить меня')
            .parent()
            .find('button')
            .click()
        cy.contains('Удалить меня').should('not.exist')
    })

    it('Marks the task as completed', () => {
        cy.get('input[placeholder="Введите задачу"]').type('task to completed')
        cy.contains('Добавить').click()
        cy.contains('task to completed').click()
        cy.contains('task to completed').should('have.class', 'line-through')
    })

    it('Displays the message “No tasks” if there are no tasks.', () => {
        cy.window().then((win: Window) => {
            win.localStorage.setItem('todos', '[]');
        });
        cy.reload();
        cy.contains('Задач нет').should('exist');
    })
})
