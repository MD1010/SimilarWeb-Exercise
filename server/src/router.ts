import { Router } from "express";
import { playlistRouter } from "./routes";

export const appRouter = Router();

appRouter.use("/api/playlist", playlistRouter);

appRouter.get("/check", (req, res) => {
  res.send("ok");
});

appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});
