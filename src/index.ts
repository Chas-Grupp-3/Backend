import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import pool from "./db.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

// routes
import login from "./routes/login.js";
import packages from "./routes/packages.js";
import userRoutes from "./routes/user.js";
import sendEmail from "./controllers/email.js";

app.use(cors());
app.use(morgan("dev"));
app.use("/login", login);
app.use("/packages", packages);
app.use("/user", userRoutes);

app.get("/", (req, res) => res.send("Hello World"));

// test-api endpoint
app.get("/test-api", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Query failed:", err);
    res.status(500).send("Database error");
  }
});

console.log("DATABASE_URL som Node.js ser:", process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
