import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../db";
import { errorHandler } from "../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  // every crud method of basic controller can go here, everyone can extend the basic functionality
  protected getEntitiesPaginated = errorHandler(async (req: Request, res: Response) => {
    const { limit, cursor, ...additionalFilters } = req.query;
    if (!cursor || !limit) {
      const entities = await this.dbEntity.fetchAll();
      return res.json({ entities });
    }

    const entities = await this.dbEntity.fetchPaginated(additionalFilters, cursor?.toString(), +limit);
    return res.json({ entities, cursor: entities[entities.length - 1]?._id });
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.deleteOne(req.params.id);
    return res.json({ deleted: req.params.id });
  });
}
