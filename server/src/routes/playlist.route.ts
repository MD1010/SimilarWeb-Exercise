import { Router } from "express";
import { PlaylistController } from "../controllers";

export const playlistRouter = Router();
const playlistController = new PlaylistController();

playlistRouter.get("/", playlistController.getCurrentPlaylist);
playlistRouter.post("/add", playlistController.addNewVideo);
playlistRouter.delete("/delete", playlistController.removeVideo);
