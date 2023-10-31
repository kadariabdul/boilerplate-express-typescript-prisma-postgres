export const swaggerDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API for Shopping Cart Onboarding Task Documentation',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    servers: [ { url: 'https://api-server-onboarding-task-shopping-cart.onrender.com/' }, { url: 'http://localhost:3000/' } ],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  security: [ { BearerAuth: [] } ],
  apis: ['src/routes/*.ts', './routes/*.ts', './dist/routes/*.js']
}
