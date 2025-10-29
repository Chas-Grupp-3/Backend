import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mitt API",
      version: "1.0.0",
      description: "Automatiskt genererad dokumentation med Swagger och JSDoc",
    },
    servers: [
      {
        url: "http://localhost:3000", // ändra till din API-url
      },
    ],
    components: {
      schemas: {
        Package: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["id", "userId", "status"],
        },
        PackageInput: {
          type: "object",
          properties: {
            userId: { type: "string" },
            status: { type: "string" },
          },
          required: ["userId", "status"],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string" },
          },
          required: ["id", "email", "name"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      { name: "Packages", description: "Package management endpoints" },
      { name: "Users", description: "User management endpoints" },
      { name: "Authentication", description: "Authentication endpoints" },
    ],
  },
  // Här anger du sökvägen till alla dina route-filer
  apis: ["./src/routes/**/*.ts"], // Recursive scan
};

// Generera Swagger-specifikationen
const swaggerSpec = swaggerJSDoc(options);

// Exportera som default (ESM)
export default swaggerSpec;
