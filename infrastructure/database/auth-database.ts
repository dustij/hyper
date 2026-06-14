import Database from 'better-sqlite3';
// import { Pool } from "pg";
import { createPool } from 'mysql2/promise';

export function createAuthDatabase() {
  switch (process.env.AUTH_DB_PROVIDER) {
    case 'sqlite':
      return new Database('./sqlite.db');

    // case "postgres":
    //   return new Pool({
    //     connectionString: process.env.DATABASE_URL,
    //   });

    case 'mysql':
      return createPool({
        uri: process.env.DATABASE_URL,
      });

    default:
      throw new Error('Invalid AUTH_DB_PROVIDER');
  }
}
