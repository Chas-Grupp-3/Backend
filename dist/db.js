import pg from "pg";
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect()
    .then(() => console.log("✅ Connected to Azure Postgres!!"))
    .catch(err => console.error("❌ Database connection failed!:", err));
export default pool;
