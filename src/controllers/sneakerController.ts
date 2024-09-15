import { Request, Response } from "express";
import { SneakerModel } from "../models/sneakerModel";

interface SneakerRequestBody {
  name: string;
  price: number;
}

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
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    try {
      const sneaker = await SneakerModel.create(name, price);
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
