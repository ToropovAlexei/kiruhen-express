import { db } from "../db/sqlite";
import { Sneaker } from "../types";

export const SneakerModel = {
  getAll: (): Promise<Sneaker[]> => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM sneakers", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Sneaker[]);
        }
      });
    });
  },

  getById: (id: number): Promise<Sneaker> => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM sneakers WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as Sneaker);
        }
      });
    });
  },

  create: (name: string, price: number, image_url: string) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO sneakers (name, price, image_url) VALUES (?, ?, ?)",
        [name, price, image_url],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  },

  delete: (id: number) => {
    return new Promise<void>((resolve, reject) => {
      db.run("DELETE FROM sneakers WHERE id = ?", [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};
