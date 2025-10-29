import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerSpec from "./swaggerConfig.js"; // lägg till .js i importen!

// Återskapa __dirname (finns inte i ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skapa /docs-mapp om den inte finns
const outputDir = path.join(__dirname, "docs");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Skriv openapi.json-filen
fs.writeFileSync(
  path.join(outputDir, "openapi.json"),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("✅ Dokumentation genererad: docs/openapi.json");
