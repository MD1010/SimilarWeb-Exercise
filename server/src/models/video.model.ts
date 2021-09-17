import { Document } from "mongoose";
import { IVideo } from "../interfaces/video.interface";

type Model = Document & IVideo;
export interface Video extends Model {}
