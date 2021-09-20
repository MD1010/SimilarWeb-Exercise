import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { createServer } from "http";
import dbConnect from "./db.connect";
import { appRouter } from "./router";

function useMiddlewares(app: Application) {
  app.use(express.json());
  app.use(cors());
  app.use(appRouter);
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.code || 500).json({ error: error.message });
  });
}

const app = express();
const http = createServer(app);
dotenv.config();
useMiddlewares(app);
dbConnect(process.env.DB_CONNECTION_STRING);
http.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
