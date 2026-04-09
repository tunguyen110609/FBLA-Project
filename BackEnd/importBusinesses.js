/*
  One-time CSV import script for populating the businesses table
  Runs once during setup to load 35 local businesses from Menomonee Falls, WI
  Creates database.db file if it doesn't exist
 */

// Import required Node.js modules
const fs = require("fs");
const csv = require("csv-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "database.db")
);

fs.createReadStream(path.join(__dirname, "businesses.csv"))
  .pipe(csv())
  .on("data", (row) => {
    db.run(
      `INSERT INTO businesses 
       (name, rating, num_ratings, category, description, deals)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        row.Name,
        row.Rating,
        row["#ratings"],
        row.Category,
        row.Description,
        row.Deals,
      ]
    );
  })
  .on("end", () => {
    console.log("✅ CSV file successfully imported");
    db.close();
  });
