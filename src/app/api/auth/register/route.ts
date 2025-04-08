import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

// Define the path for the database file
const dbPath = path.join(process.cwd(), 'db', 'dev.db');

export async function POST(request: Request) {
  try {
    const { username, password, name } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Basic validation (consider adding more robust validation)
    if (password.length < 6) {
         return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const db = new Database(dbPath);

    try {
      // Check if user already exists
      const checkStmt = db.prepare('SELECT id FROM users WHERE username = ?');
      const existingUser = checkStmt.get(username);

      if (existingUser) {
        return NextResponse.json({ message: 'Username already taken' }, { status: 409 });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

      // Insert the new user
      const insertStmt = db.prepare(`
        INSERT INTO users (name, username, hashedPassword)
        VALUES (?, ?, ?)
      `);
      const info = insertStmt.run(name || null, username, hashedPassword);

      console.log(`User registered: ${username}, ID: ${info.lastInsertRowid}`);

      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

    } catch (error: any) {
        console.error('Registration database error:', error);
        // Check for unique constraint violation specifically
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
             return NextResponse.json({ message: 'Username already taken' }, { status: 409 });
        }
        return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
    } finally {
      db.close(); // Ensure database connection is closed
    }

  } catch (error) {
    console.error('Registration request error:', error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}
 