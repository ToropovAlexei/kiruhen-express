import { db } from "../db/sqlite";
import { FavoriteItem } from "../types";

export const FavoritesModel = {
  getAll: (): Promise<FavoriteItem[]> => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM favorites", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as FavoriteItem[]);
        }
      });
    });
  },

  add: (sneaker_id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM favorites WHERE sneaker_id = ?",
        [sneaker_id],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve();
          } else {
            db.run(
              "INSERT INTO favorites (sneaker_id) VALUES (?)",
              [sneaker_id],
              (insertErr) => {
                if (insertErr) {
                  reject(insertErr);
                } else {
                  resolve();
                }
              }
            );
          }
        }
      );
    });
  },

  remove: (sneaker_id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM favorites WHERE sneaker_id = ?",
        [sneaker_id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },

  clear: (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM favorites", [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};
