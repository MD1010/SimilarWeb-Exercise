import { VideoEntity } from "../entities";
import { Video } from "../models/video.model";
import { GenericCrudController } from "./generic-crud.controller";

export class PlaylistController extends GenericCrudController<Video> {
  constructor() {
    super(VideoEntity);
  }

  getCurrentPlaylist = this.getEntitiesPaginated;
  removeVideo = this.deleteEntity;
  addNewVideo = this.createEntity;
}
