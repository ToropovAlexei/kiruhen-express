import express from "express";
import { sneakerRoutes } from "./routes/sneakerRoutes";
import { cartRoutes } from "./routes/cartRoutes";
import { favoritesRoutes } from "./routes/favoritesRoutes";

export const app = express();

app.use(express.json());

app.use("/api", sneakerRoutes);
app.use("/api", cartRoutes);
app.use("/api", favoritesRoutes);
