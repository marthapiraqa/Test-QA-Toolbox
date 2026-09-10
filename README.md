# Instrucciones para ejecutar los tests.
1. Clonar el repositorio
  - Abrir un terminar y ejecutar:
  git clone [repositior](https://github.com/marthapiraqa/Test-QA-Toolbox.git)
  - Ingresar al proyecto:
  cd Test-QA-Toolbox

2. Instalar dependencias
  - Instalar las dependencias
    npm install
  - Verificar instalacion de Cypress
    npx cypress --version
  - Ejecutar cypress en modo grafico 
    npx cypress open
    selecciona E2E Testing
    Selecciona el navegador que prefieras
    para ejecutar el archivo especifico: npx cypress run --spec "cypress/e2e/test-Toolbox.cy.js"

Descripción de los tests implementados: Indica brevemente qué validan los tests en la UI y en la API.
En el archivo Test-Toolbox hay 5 test 

1. Parte 1 - Registro de usuario: Se realiza la creación de usuarios nuevos
2. Parte 1 - Inicio de sesión de usuario: se realizan 5 validaciones para la pagina de login 
- Iniciar sesión con credenciales válidas
- Iniciar sesión con contraseña incorrecta
- Iniciar sesión con un usuario inexistente
- Iniciar sesión con campos vacíos
- Debe permitir cerrar sesión correctamente
3. Parte2 - Prueba API GET test1: Se valida el consumo del servicio método Get con respuesta exitosa
4. Parte2 - Prueba API GET test2: Se valida el consumo del servicio método Get incorrecta
5. Parte2 - Prueba API POST test: Se valida el consuno del servicio método Post con repuesta correcta  
