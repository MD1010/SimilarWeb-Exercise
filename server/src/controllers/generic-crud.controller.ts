import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { Document } from "mongoose";
import { DbEnity } from "../db";
import { errorHandler } from "../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  protected getEntities = errorHandler(async (req: Request, res: Response) => {
    let { pageNumber, ...filter } = req.query;
    let { name, muscles, muscleGroup, musclesGroups, duration, difficultyLevel, ...remainingFilters } = filter;

    const customFilter = {
      $and: [
        !isEmpty(name) ? { name: new RegExp([name].join(""), "i") as any } : {},
        !isEmpty(muscles)
          ? {
              $or: [
                { "muscles.primary": { $in: muscles?.toString().split(",") } },
                { "muscles.secondary": { $in: muscles?.toString().split(",") } },
              ],
            }
          : {},
        !isEmpty(muscleGroup) ? { muscleGroup: muscleGroup?.toString() } : {},
        !isEmpty(difficultyLevel) ? { difficultyLevel: difficultyLevel?.toString() } : {},
        !isEmpty(musclesGroups) ? { musclesGroups: { $in: musclesGroups?.toString() } } : {},
        !isEmpty(duration) ? { duration: { $lte: duration } } : {},
        { ...remainingFilters },
      ],
    };

    const entities = await this.dbEntity.find(customFilter, pageNumber?.toString());
    const totalFilteredRecords = (await this.dbEntity.find(customFilter)).length;

    return res.json({ entities, totalFilteredRecords });
  });

  protected getEntityById = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.find({ _id: req.params.id }, req.query.pageNumber?.toString()));
  });

  protected createEntity = errorHandler(async (req: Request, res: Response) => {
    const newEntity = await this.dbEntity.create(req.body);
    return res.json({ created: newEntity._id });
  });

  protected updateEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.updateOne(req.params.id, req.body);
    return res.json({ updated: req.params.id });
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    let obj = await this.dbEntity.findOne({ _id: req.params.id });
    await this.dbEntity.deleteOne(req.params.id);
    await obj.remove();
    return res.json({ deleted: req.params.id });
  });
}
