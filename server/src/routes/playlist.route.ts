import { Router } from "express";
import { PlaylistController } from "../controllers";

export const playlistRouter = Router();
const playlistController = new PlaylistController();

playlistRouter.get("/", playlistController.getCurrentPlaylist);
playlistRouter.post("/add-youtube-video", playlistController.addNewYoutubeVideo);
playlistRouter.delete("/delete/:id", playlistController.removeVideo);
