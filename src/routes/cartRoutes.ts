import { Router } from "express";
import CartController from "../controllers/cartController";

export const cartRoutes = Router();

cartRoutes.get("/cart", CartController.getCart);
cartRoutes.post("/cart", CartController.addToCart);
cartRoutes.delete("/cart/:sneaker_id", CartController.removeFromCart);
cartRoutes.delete("/cart", CartController.clearCart);
