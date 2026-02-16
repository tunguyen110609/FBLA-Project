const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database connection error", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER
  )
`);

// Test route
app.get("/", (req, res) => {
  res.send("Backend + SQL is working!");
});

// Add data
app.post("/add-user", (req, res) => {
  const { name, score } = req.body;

  const sql = `INSERT INTO users (name, score) VALUES (?, ?)`;
  db.run(sql, [name, score], function (err) {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.send("User added to database");
    }
  });
});

// Get data
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
