import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL is missing in .env file");
  process.exit(1);
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err: Error) => {
    // Added ': Error' here to fix the any type issue
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
