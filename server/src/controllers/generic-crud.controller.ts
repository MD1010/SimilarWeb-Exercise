import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { Document } from "mongoose";
import { DbEnity } from "../db";
import { errorHandler } from "../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  protected getEntitiesPaginated = errorHandler(async (req: Request, res: Response) => {
    let { limit, cursor, ...additionalFilters } = req.query;
    if (!cursor || !limit) return res.json({ entities: await this.dbEntity.fetchAll() });
    const entities = await this.dbEntity.fetchPaginated(additionalFilters, cursor?.toString(), +limit);
    return res.json({ entities, cursor: entities[entities.length - 1]._id });
  });

  protected createEntity = errorHandler(async (req: Request, res: Response) => {
    const newEntity = await this.dbEntity.create(req.body);
    return res.json({ created: newEntity._id });
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.deleteOne(req.params.id);
    return res.json({ deleted: req.params.id });
  });
}
