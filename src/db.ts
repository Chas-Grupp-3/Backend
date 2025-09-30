import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Azure kräver SSL, detta fixar det
    }
});

pool.connect()
    .then(() => console.log("✅ Connected to Azure Postgres"))
    .catch(err => console.error("❌ Database connection failed:", err));

export default pool;
