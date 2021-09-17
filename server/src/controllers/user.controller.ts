import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDAL } from "../db/user.dal";
import { UserEntity } from "../entities";
import { User } from "../models";
import { Exceptions } from "../utils";
import { errorHandler } from "../utils/errorHandler";
import { GenericCrudController } from "./generic-crud.controller";

export class UserController extends GenericCrudController<User> {
  constructor() {
    super(UserEntity);
  }

  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password, app } = req.body;
    const user = await UserEntity.findOne({ username });
    if (app === "admin" && (!user || !user.isAdmin || !bcrypt.compareSync(password, user.password)))
      throw Exceptions.UNAUTHORIZED;
    if (!user || !bcrypt.compareSync(password, user.password)) throw Exceptions.UNAUTHORIZED;

    var token = jwt.sign({ identity: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      username: user.username,
      accessToken: token,
    });
  });

  signup = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await UserEntity.findOne({ username });
    if (user) {
      throw Exceptions.ENTITY_EXISTS;
    }
    await UserEntity.getModel().create({
      username: username,
      password: bcrypt.hashSync(password, await bcrypt.genSalt(10)),
      isAdmin: false,
      trainings: [
        {
          day: 1,
          exercises: [],
        },
        {
          day: 2,
          exercises: [],
        },
        {
          day: 3,
          exercises: [],
        },
        {
          day: 4,
          exercises: [],
        },
        {
          day: 5,
          exercises: [],
        },
        {
          day: 6,
          exercises: [],
        },
      ],
    });

    res.json({
      isCreate: true,
    });
  });

  getAllUsers = this.getEntities;
  getUserTrainingsByMuscleGroup = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.TrainingsByMuslceGroup(req.params.username, req.params.day));
  });

  deleteUserExcercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.deleteUserExcercise(req.params.username, req.params.day, req.params.exerciseID));
  });

  deleteUserExcercises = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.deleteUserExcercises(req.params.username, req.params.day));
  });

  AddExcericeToDayTraining = errorHandler(async (req: Request, res: Response) => {
    const exercise = await UserDAL.CheckIfExcericeExists(
      req.params.username,
      req.body.personalPreferences.day,
      req.body.exerciseID
    );
    if (exercise.length > 0) {
      throw Exceptions.ENTITY_EXISTS;
    }
    return res.json(
      await UserDAL.AddExcericeToDayTraining(req.params.username, req.body.exerciseID, req.body.personalPreferences)
    );
  });
}
