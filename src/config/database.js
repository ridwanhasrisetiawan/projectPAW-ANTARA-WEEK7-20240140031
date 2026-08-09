const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH || path.join(__dirname, '../database/app.db');

const db = new Database(dbPath);

// Aktifkan foreign key constraint
db.pragma('foreign_keys = ON');

// Init schema (kalau tabel belum ada)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT (datetime('now', 'localtime'))
  );
`);

module.exports = db;
