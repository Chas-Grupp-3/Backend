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
  },
  // 👇 Här anger du var dina routes finns
  apis: ["./routes/*.js"], // ändra till rätt sökväg för dina filer
};

// Generera Swagger-specifikationen
const swaggerSpec = swaggerJSDoc(options);

// ✅ Exportera som default (ESM)
export default swaggerSpec;
