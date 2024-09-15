import { Router } from "express";
import { FavoritesController } from "../controllers/favoritesController";

export const favoritesRoutes = Router();

favoritesRoutes.get("/favorites", FavoritesController.getFavorites);
favoritesRoutes.post("/favorites", FavoritesController.addToFavorites);
favoritesRoutes.delete(
  "/favorites/:sneaker_id",
  FavoritesController.removeFromFavorites
);
favoritesRoutes.delete("/favorites", FavoritesController.clearFavorites);
