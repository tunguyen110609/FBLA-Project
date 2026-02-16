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
