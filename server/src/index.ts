import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnection";
import compilerRouter from "./routes/compilerRoutes";
config();
const port = process.env.PORT || 4001;

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("OK").status(200);
});

app.use("/compiler", compilerRouter);

/* App Start */
const appStart = () => {
  try {
    dbConnect();
    app.listen(port, () => console.log(`Server Running On ${port}`));
  } catch (error) {
    console.log(`Error to Start the App`, error);
  }
};

appStart();
