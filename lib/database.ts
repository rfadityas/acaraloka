import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import 'dotenv/config';

const connection = process.env.DATABASE_URL;
if (!connection) {
    throw new Error("DATABASE_URL must be set");
    }

export const db = drizzle(postgres(connection, { ssl: { rejectUnauthorized: false } }));
