import { Request, Response } from "express";
import { SneakerModel } from "../models/sneakerModel";
import multer from "multer";
import path from "path";

interface SneakerRequestBody {
  name: string;
  price: number;
  image_url: string;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadSneakerImg = multer({ storage });

export const SneakerController = {
  getAllSneakers: async (req: Request, res: Response) => {
    try {
      const sneakers = await SneakerModel.getAll();
      res.json({ sneakers });
    } catch (err) {
      res
        .status(500)
        .json({ error: (err as Error).message || "Internal server error" });
    }
  },

  createSneaker: async (
    req: Request<{}, {}, SneakerRequestBody>,
    res: Response
  ) => {
    const { name, price } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : "";

    if (!name || !price || !image_url) {
      return res
        .status(400)
        .json({ error: "Name and price and img are required" });
    }

    try {
      const sneaker = await SneakerModel.create(name, price, image_url);
      res.status(201).json(sneaker);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const sneaker = await SneakerModel.getById(Number(id));
      res.json({ sneaker });
    } catch (err) {
      res
        .status(500)
        .json({ error: (err as Error).message || "Internal server error" });
    }
  },

  deleteSneaker: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      await SneakerModel.delete(Number(id));
      res.sendStatus(204);
    } catch (err) {
      res
        .status(500)
        .json({ error: (err as Error).message || "Internal server error" });
    }
  },
};
