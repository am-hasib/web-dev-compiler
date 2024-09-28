import { Request, Response } from "express";
import { Code } from "../models/Code";

export const saveCode = async (req: Request, res: Response): Promise<void> => {
  const { fullcode } = req.body;

  try {
    const newCode = await Code.create({ fullcode: fullcode });
    res.send({ url: newCode._id, message: "saved" }).status(201);
  } catch (error) {
    res.status(500).send({ message: "Error Saving Code", error });
  }
};

export const loadCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { urlId } = req.body;
    const exitingCode = await Code.findById(urlId);
    if (!exitingCode) {
      res.status(404).send({ message: "Code Not Found" });
    }
  res.status(200).send({ fullCode: exitingCode?.fullcode });
  } catch (error) {
    res.status(500).send({ message: "Error Loading Code", error });
  }
};
