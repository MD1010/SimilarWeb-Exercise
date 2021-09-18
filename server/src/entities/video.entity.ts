import { Schema } from "mongoose";
import { DbEnity } from "../db/genric-entity.dal";
import { Video } from "../models/video.model";

const VideoSchema: Schema = new Schema({
  title: { type: String },
  videoId: { type: String, required: true },
  addedAt: { type: Schema.Types.Date, default: new Date() },
  duration: { type: String },
});

export const VideoEntity = new DbEnity<Video>("Video", VideoSchema, {
  onCreateFailed: "Failed to add Video to playlist",
  onDeleteFailed: "Failed to delete video",
  onEntityExists: "Video Id already exists",
});
