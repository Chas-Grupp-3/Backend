import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import morgan from "morgan";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// routes
import login from "./routes/login.js";
import packages from "./routes/packages.js";
import userRoutes from "./routes/user.js";
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
    }
    catch (err) {
        console.error("❌ Query failed:", err);
        res.status(500).send("Database error");
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
