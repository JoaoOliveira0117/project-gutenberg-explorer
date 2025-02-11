import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Guthenberg project authentication service',
      version: '1.0.0',
      description: 'API Documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        ApiKeyAuth: {
          "type": "apiKey",
          "in": "header",
          "name": "x-api-key"
        }
      },
      schemas: {}
    },
    security: [
      {
        bearerAuth: []
      },
      {
        apiKeyAuth: []
      }
    ],
  },
  apis: ['src/controllers/*.ts'],
}

const swaggerDocs = swaggerJSDoc(options);

const initializeSwagger = () => {
  return [
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs),
  ] as any
}

export { initializeSwagger };