import { db } from "../db/sqlite";
import { CartItem } from "../types";

export const CartModel = {
  getAll: (): Promise<CartItem[]> => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM cart", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as CartItem[]);
        }
      });
    });
  },

  addOrUpdate: (sneaker_id: number, quantity: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM cart WHERE sneaker_id = ?",
        [sneaker_id],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            db.run(
              "UPDATE cart SET quantity = quantity + ? WHERE sneaker_id = ?",
              [quantity, sneaker_id],
              (updateErr) => {
                if (updateErr) {
                  reject(updateErr);
                } else {
                  resolve();
                }
              }
            );
          } else {
            db.run(
              "INSERT INTO cart (sneaker_id, quantity) VALUES (?, ?)",
              [sneaker_id, quantity],
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
      db.run("DELETE FROM cart WHERE sneaker_id = ?", [sneaker_id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  clear: (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM cart", [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};
