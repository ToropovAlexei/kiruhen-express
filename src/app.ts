import express from "express";
import { sneakerRoutes } from "./routes/sneakerRoutes";
import { cartRoutes } from "./routes/cartRoutes";

export const app = express();

app.use(express.json());

app.use("/api", sneakerRoutes);
app.use("/api", cartRoutes);
