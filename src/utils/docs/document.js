import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API REST",
      description:
        "A simple CRUD API application ",
    },
  },
  apis: [__dirname+"/ecommerce.yaml"],
};

const swaggerSpecs = swaggerJsdoc(options);

export  default swaggerJsdoc(options);
