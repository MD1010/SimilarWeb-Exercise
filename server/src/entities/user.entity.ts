import { Schema } from "mongoose";
import { DbEnity } from "../db/genric-entity.dal";
import { User } from "../models/user.model";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean },
    trainings: [
      {
        day: { type: Schema.Types.Number, required: true },
        exercises: [
          {
            exercise: {
              type: Schema.Types.ObjectId,
              required: true,
              ref: "Exercise",
            },
            reps: { type: Schema.Types.Number, required: true },
            sets: { type: Schema.Types.Number, required: true },
            restTime: { type: Schema.Types.Number, required: true },
          },
        ],
      },
    ],
  },
  { versionKey: false }
);

export const UserEntity = new DbEnity<User>("User", UserSchema);
