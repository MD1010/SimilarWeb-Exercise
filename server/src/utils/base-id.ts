import mongoose from "mongoose";

export const toObjectId = (_id: string): mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId(_id);
};
