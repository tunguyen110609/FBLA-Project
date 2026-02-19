// ===================================
// DATABASE SETUP
// ===================================

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.db'));

// Create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS businesses (
        id           INTEGER PRIMARY KEY,
        name         TEXT    NOT NULL,
        category     TEXT    NOT NULL,
        rating       REAL    DEFAULT 0,
        rating_count INTEGER DEFAULT 0,
        description  TEXT,
        deal         TEXT,
        address      TEXT,
        phone        TEXT,
        hours        TEXT
    );

    CREATE TABLE IF NOT EXISTS reviews (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        business_id INTEGER NOT NULL,
        author      TEXT    NOT NULL,
        rating      INTEGER NOT NULL,
        title       TEXT,
        review_text TEXT,
        date        TEXT,
        FOREIGN KEY (business_id) REFERENCES businesses(id)
    );
`);

console.log('✅ Database tables created!');

module.exports = db;