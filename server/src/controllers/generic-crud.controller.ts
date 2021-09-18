import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../db";
import { SortOrder } from "../interfaces";
import { errorHandler } from "../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  // every crud method of basic controller can go here, everyone can extend the basic functionality
  protected getEntitiesPaginated = errorHandler(async (req: Request, res: Response) => {
    const { limit, cursor, sort = "_id", order = 1 } = req.query;
    if (!limit) {
      const entities = await this.dbEntity.fetchAll();
      return res.json({ entities });
    }

    const entities = await this.dbEntity.fetchPaginated(
      sort?.toString(),
      +order?.toString() as SortOrder,
      cursor?.toString(),
      +limit
    );
    return res.json({ entities, cursor: entities[entities.length - 1]?._id });
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.deleteOne(req.params.id);
    return res.json({ deleted: req.params.id });
  });
}
