import { Router } from "express";
import { UserController } from "./../controllers";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);

userRouter.get("/:username/trainings/:day", userController.getUserTrainingsByMuscleGroup);
userRouter.delete("/:username/trainings/:day/:exerciseID", userController.deleteUserExcercise);
userRouter.delete("/:username/trainings/:day", userController.deleteUserExcercises);
userRouter.post("/:username/trainings", userController.AddExcericeToDayTraining);
