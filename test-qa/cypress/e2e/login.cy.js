describe('Inicio de sesión de usuario', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/login')
    })

    it('Debe iniciar sesión con credenciales válidas', () => {

        cy.fixture('usuario').then((usuario) => {

            // Ingresar email
            cy.get('[data-qa="login-email"]')
                .type(usuario.email)

            // Ingresar password
            cy.get('[data-qa="login-password"]')
                .type(usuario.password)

            // Iniciar sesión
            cy.get('[data-qa="login-button"]')
                .click()

            // Validar sesión iniciada
            cy.contains('Logged in as', { timeout: 10000 })
                .should('be.visible')

            // Validar que aparece Logout
            cy.contains('Logout')
                .should('be.visible')
        })
    })


    it('Debe mostrar error al ingresar una contraseña incorrecta', () => {

        cy.fixture('usuario').then((usuario) => {

            // Ingresar email válido
            cy.get('[data-qa="login-email"]')
                .type(usuario.email)

            // Ingresar password incorrecto
            cy.get('[data-qa="login-password"]')
                .type('Pepitoperez2028.')

            // Intentar iniciar sesión
            cy.get('[data-qa="login-button"]')
                .click()

            // Validar mensaje de error
            cy.contains('Your email or password is incorrect!', {
                timeout: 10000
            })
                .should('be.visible')
        })
    })


    it('Debe mostrar error al ingresar un usuario inexistente', () => {

        cy.fixture('usuario').then((usuario) => {

            // Email inexistente
            cy.get('[data-qa="login-email"]')
                .type('pruebaqamp@yopmail.com')

            // Password válido
            cy.get('[data-qa="login-password"]')
                .type(usuario.password)

            // Intentar iniciar sesión
            cy.get('[data-qa="login-button"]')
                .click()

            // Validar mensaje de error
            cy.contains('Your email or password is incorrect!', {
                timeout: 10000
            })
                .should('be.visible')
        })
    })


    it('No debe permitir iniciar sesión con campos vacíos', () => {

        // Intentar iniciar sesión sin ingresar datos
        cy.get('[data-qa="login-button"]')
            .click()

        // Validar email obligatorio
        cy.get('[data-qa="login-email"]')
            .then(($input) => {
                expect($input[0].checkValidity())
                    .to.be.false
            })

        // Validar password obligatorio
        cy.get('[data-qa="login-password"]')
            .then(($input) => {
                expect($input[0].checkValidity())
                    .to.be.false
            })
    })


    it('Debe permitir cerrar sesión correctamente', () => {

        cy.fixture('usuario').then((usuario) => {

            // Iniciar sesión
            cy.get('[data-qa="login-email"]')
                .type(usuario.email)

            cy.get('[data-qa="login-password"]')
                .type(usuario.password)

            cy.get('[data-qa="login-button"]')
                .click()

            // Validar sesión iniciada
            cy.contains('Logged in as', { timeout: 10000 })
                .should('be.visible')

            // Cerrar sesión
            cy.contains('Logout')
                .should('be.visible')
                .click()

            // Validar regreso a Login
            cy.url()
                .should('include', '/login')

            cy.contains('Login to your account')
                .should('be.visible')
        })
    })

})