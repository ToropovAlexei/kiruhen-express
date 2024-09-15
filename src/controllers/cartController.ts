import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";

interface CartRequestBody {
  sneaker_id: number;
  quantity: number;
}

export const CartController = {
  getCart: async (req: Request, res: Response): Promise<void> => {
    try {
      const cart = await CartModel.getAll();
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  addToCart: async (
    req: Request<{}, {}, CartRequestBody>,
    res: Response
  ): Promise<void> => {
    const { sneaker_id, quantity } = req.body;

    if (!sneaker_id || quantity == null) {
      res.status(400).json({ error: "sneaker_id and quantity are required" });
      return;
    }

    try {
      await CartModel.addOrUpdate(sneaker_id, quantity);
      res.status(200).json({ message: "Item added/updated in cart" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  removeFromCart: async (req: Request, res: Response): Promise<void> => {
    const { sneaker_id } = req.params;

    if (!sneaker_id) {
      res.status(400).json({ error: "sneaker_id is required" });
      return;
    }

    try {
      await CartModel.remove(Number(sneaker_id));
      res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  clearCart: async (req: Request, res: Response): Promise<void> => {
    try {
      await CartModel.clear();
      res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },
};
