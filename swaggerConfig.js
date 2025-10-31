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
            package_id: { type: "string" },
            location: { type: "string" },
            temperature: { type: "number", nullable: true },
            humidity: { type: "number", nullable: true },
            delivered: { type: "boolean" },
            receiver_id: { type: "string", nullable: true },
            driver_id: { type: "string", nullable: true },
            arrival_date: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            date: { type: "string", format: "date-time", nullable: true },
            destination: { type: "string", nullable: true },
            sender: { type: "string" },
            thresholds: { type: "array", items: {}, nullable: true },
          },
          required: ["package_id", "location", "sender"],
        },
        PackageInput: {
          type: "object",
          properties: {
            location: { type: "string" },
            temperature: { type: "number" },
            sender: { type: "string" },
            date: { type: "string", format: "date-time" },
            humidity: { type: "number" },
            delivered: { type: "boolean" },
            receiver_id: { type: "string" },
            driver_id: { type: "string" },
            arrival_date: { type: "string", format: "date-time" },
            destination: { type: "string" },
          },
          required: ["location", "sender"],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string", enum: ["driver", "user", "admin"] },
          },
          required: ["id", "email", "name", "role"],
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
  // Här anger du sökvägen till alla dina TS-filer (routes/controllers can hold JSDoc)
  apis: ["./src/**/*.ts"], // Recursive scan
};

// Generera Swagger-specifikationen
const swaggerSpec = swaggerJSDoc(options);

// Exportera som default (ESM)
export default swaggerSpec;
