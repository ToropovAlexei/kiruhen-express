import { Router } from "express";
import { SneakerController, uploadSneakerImg } from "../controllers/sneakerController";

export const sneakerRoutes = Router();

sneakerRoutes.get("/sneakers", SneakerController.getAllSneakers);
sneakerRoutes.post("/sneakers", uploadSneakerImg.single("image"), SneakerController.createSneaker);
sneakerRoutes.get("/sneakers/:id", SneakerController.getById);
sneakerRoutes.delete("/sneakers/:id", SneakerController.deleteSneaker);
