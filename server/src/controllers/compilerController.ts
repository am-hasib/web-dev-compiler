import { Request, Response } from "express";
import { Code } from "../models/Code";

export const saveCode = async (req: Request, res: Response): Promise<void> => {
  const { fullcode } = req.body;

  try {
    const newCode = await Code.create({ fullcode: fullcode });
    res.send(newCode).status(201);
  } catch (error) {
    res.status(500).send({ message: "Error Saving Code", error });
  }
};
