import express from "express";
import { loadCode, saveCode } from "../controllers/compilerController";

const compilerRouter = express.Router();

compilerRouter.route("/save").post(saveCode);
compilerRouter.route("/load").post(loadCode);

export default compilerRouter;
