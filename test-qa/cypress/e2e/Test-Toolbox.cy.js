describe('Parte1 - Registro de usuario', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    })

    it('Registrar nuevo usuario', () => {
        cy.contains('Signup / Login').click()
        cy.contains('New User Signup!').should('be.visible')
        // Datos iniciales
        cy.fixture('usuario').then((usuario) => {
            //Correo dinamico
            const emailDinamico = `martha.qa.${Date.now()}@example.com`
            cy.get('[data-qa="signup-name"]')
                .type(usuario.nombre)
            cy.get('[data-qa="signup-email"]')
                .type(emailDinamico)            
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
            cy.contains('Congratulations', { timeout: 20000 })
                .should('be.visible')
            cy.get('[data-qa="continue-button"]')
                .click()
            cy.contains ('Logged', { timeout: 20000 })
                .should('be.visible')

        })
    })
})

describe('Parte1 - Inicio de sesión de usuario', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/login')
    })

    it('Iniciar sesión con credenciales válidas', () => {

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
            cy.contains('Logged in as', { timeout: 20000 })
                .should('be.visible')

            // Validar que aparece Logout
            cy.contains('Logout')
                .should('be.visible')
        })
    })


    it('Mostrar error al ingresar una contraseña incorrecta', () => {

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
                timeout: 20000
            })
                .should('be.visible')
        })
    })


    it('Mostrar error al ingresar un usuario inexistente', () => {

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
                timeout: 20000
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
            cy.contains('Logged in as', { timeout: 20000 })
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

describe('Parte2 - Prueba API GET test1', () => {

  it('Responde correctamente', () => {
    cy.request('GET', 'https://echo-serv.tbxnet.com/v1/qa/test1')
      .then((response) => {
       
        // Tiempo responder
        expect(response.duration).to.be.lessThan(3000)
        // Estado respuesta
        expect(response.status).to.eq(200)
        //Validacion Header
        expect(response.headers) .to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')
       //Validacion Body
        expect(response.body).to.exist
        expect(response.body).to.not.be.empty
       
      })
  })

})

describe('Parte2 - Prueba API GET test2', () => {

  it('Responde error 500', () => {
    cy.request({
      method: 'GET',
      url: 'https://echo-serv.tbxnet.com/v1/qa/test2',
      failOnStatusCode: false
    })
    .then((response) => {
      // Tiempo responder
      expect(response.duration).to.be.lessThan(3000);
      // Estado respuesta
      expect(response.status).to.eq(500);
      // Existe Header
      expect(response.headers).to.have.property('content-type');

    });

  });

});

describe('Parte2 - Prueba API POST test', () => {

  it('Responde correctamente', () => {

    cy.request({
      method: 'POST',
      url: 'https://echo-serv.tbxnet.com/v1/test',
    
    }).then((response) => {
      // Tiempo responder  
      expect(response.duration).to.be.lessThan(3000)
      //Estado repuesta
      expect(response.status).to.eq(200)
      // Existe Header  
      expect(response.headers['content-type']).to.include('application/json')
     // Existe Body
      expect(response.body).to.exist

      
    })
  })

})