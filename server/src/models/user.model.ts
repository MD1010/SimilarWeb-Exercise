import { IUser } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & IUser;
export interface User extends Model {}
