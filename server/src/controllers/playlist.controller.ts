import axios from "axios";
import { Request, Response } from "express";
import { VideoEntity } from "../entities";
import { IVideo } from "../interfaces/video.interface";
import { Video } from "../models/video.model";
import { errorHandler } from "../utils";
import { YT_VIDEOS_API } from "../utils/consts";
import { formatDuration } from "../utils/helpers";
import { GenericCrudController } from "./generic-crud.controller";

export class PlaylistController extends GenericCrudController<Video> {
  constructor() {
    super(VideoEntity);
  }

  getCurrentPlaylist = this.getEntitiesPaginated;
  removeVideo = this.deleteEntity;

  addNewYoutubeVideo = errorHandler(async (req: Request, res: Response) => {
    const videoId = req.body?.videoId;
    const response = await axios.get(
      `${YT_VIDEOS_API}?part=contentDetails,snippet&id=${videoId}&key=${process.env.YT_API_KEY}`
    );
    const title = response.data?.items?.[0].snippet.title;
    const duration = formatDuration(response.data?.items?.[0].contentDetails.duration);
    const newVideoCreated = await this.dbEntity.create({ videoId, title, duration } as any);

    return res.json({ created: newVideoCreated });
  });
}
