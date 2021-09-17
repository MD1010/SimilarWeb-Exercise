import { NextFunction, Request, Response } from "express";

export const errorHandler = (callback: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};
