import { Schema } from "mongoose";
import { PlaylistErrorMessages } from "../consts/playlist-error-messages";
import { DbEnity } from "../db/genric-entity.dal";
import { Video } from "../models/video.model";

const VideoSchema: Schema = new Schema({
  title: { type: String },
  videoId: { type: String, required: true },
  addedAt: { type: Schema.Types.Date, default: new Date() },
  duration: { type: String },
});

export const VideoEntity = new DbEnity<Video>("Video", VideoSchema, {
  onCreateFailed: PlaylistErrorMessages.FailedToAdd,
  onDeleteFailed: PlaylistErrorMessages.FailedToDelete,
  onEntityExists: PlaylistErrorMessages.EntityAlreadyExists,
});
