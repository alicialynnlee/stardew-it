import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Define the path for the database directory and file
const dbDir = path.join(process.cwd(), 'db');
const dbPath = path.join(dbDir, 'dev.db');

// Ensure the database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Created directory: ${dbDir}`);
}

// Connect to the database (this will create the file if it doesn't exist)
const db = new Database(dbPath, { verbose: console.log });

// Create the users table if it doesn't exist
const createTableStmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT UNIQUE NOT NULL,
    hashedPassword TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

createTableStmt.run();

console.log('Database setup complete. Users table is ready.');

db.close(); 