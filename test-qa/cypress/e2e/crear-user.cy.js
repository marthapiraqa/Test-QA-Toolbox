describe('Registro de usuario', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    })

    it('Debe registrar un nuevo usuario exitosamente', () => {
        // Ir a Signup / Login
        cy.contains('Signup / Login').click()
        // Validar pantalla de registro
        cy.contains('New User Signup!').should('be.visible')
        // Datos iniciales
        cy.fixture('usuario').then((usuario) => {
            cy.get('[data-qa="signup-name"]')
                .type(usuario.nombre)
            cy.get('[data-qa="signup-email"]')
                .type(usuario.email)            
            cy.get('[data-qa="signup-button"]')
                .click()

            // Validar formulario de creación de cuenta
            cy.contains('Enter Account Information')
                .should('be.visible')

            // Password
            cy.get('[data-qa="password"]')
                .type(usuario.password)

            // Fecha de nacimiento
            cy.get('[data-qa="days"]')
                .select(usuario.dia)
            cy.get('[data-qa="months"]')
                .select(usuario.mes)
            cy.get('[data-qa="years"]')
                .select(usuario.anio)

            // Información personal
            cy.get('[data-qa="first_name"]')
                .type('Martha')
            cy.get('[data-qa="last_name"]')
                .type('QA')
            cy.get('[data-qa="company"]')
                .type(usuario.empresa)
            cy.get('[data-qa="address"]')
                .type(usuario.direccion)
            cy.get('[data-qa="country"]')
                .select(usuario.pais)
            cy.get('[data-qa="state"]')
                .type(usuario.estado)
            cy.get('[data-qa="city"]')
                .type(usuario.ciudad)
            cy.get('[data-qa="zipcode"]')
                .type(usuario.codigoPostal)
            cy.get('[data-qa="mobile_number"]')
                .type(usuario.telefono)

            // Crear cuenta
            cy.get('[data-qa="create-account"]')
                .click()

            // Validar registro exitoso
            cy.contains('Congratulations', { timeout: 10000 })
                .should('be.visible')
            // Hone sesion iniciada
            cy.get('[data-qa="continue-button"]')
                .click()
            cy.contains ('Logged', { timeout: 10000 })
                .should('be.visible')

        })
    })
})