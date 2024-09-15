import { Database } from "sqlite3";

export const db = new Database(
  process.env.DB_PATH || "./database.db",
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
  }
);

db.exec(`
    CREATE TABLE IF NOT EXISTS sneakers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image_url TEXT
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sneaker_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (sneaker_id) REFERENCES sneakers(id)
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sneaker_id INTEGER NOT NULL,
      FOREIGN KEY (sneaker_id) REFERENCES sneakers(id)
    )
  `);
