import { Request, Response } from "express";
import { FavoritesModel } from "../models/favoritesModel";

interface FavoritesRequestBody {
  sneaker_id: number;
}

export const FavoritesController = {
  getFavorites: async (req: Request, res: Response): Promise<void> => {
    try {
      const cart = await FavoritesModel.getAll();
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  addToFavorites: async (
    req: Request<{}, {}, FavoritesRequestBody>,
    res: Response
  ): Promise<void> => {
    const { sneaker_id } = req.body;

    if (!sneaker_id) {
      res.status(400).json({ error: "sneaker_id is required" });
      return;
    }

    try {
      await FavoritesModel.add(sneaker_id);
      res.status(200).json({ message: "Added to favorites" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  removeFromFavorites: async (req: Request, res: Response): Promise<void> => {
    const { sneaker_id } = req.params;

    if (!sneaker_id) {
      res.status(400).json({ error: "sneaker_id is required" });
      return;
    }

    try {
      await FavoritesModel.remove(Number(sneaker_id));
      res.status(200).json({ message: "Item removed from favorites" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  clearFavorites: async (req: Request, res: Response): Promise<void> => {
    try {
      await FavoritesModel.clear();
      res.status(200).json({ message: "Favorites cleared" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },
};
