import express from "express";
import { saveCode } from "../controllers/compilerController";

const compilerRouter = express.Router();

compilerRouter.route("/save").post(saveCode);

export default compilerRouter;
