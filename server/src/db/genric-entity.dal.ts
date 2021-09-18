import mongoose, { Document, Model, Schema } from "mongoose";
import { IReadEntity, IWriteEntity, SortOrder } from "../interfaces/generic-crud.interface";
import { Exceptions } from "../utils";
import { toObjectId } from "../utils/base-id";

export class DbEnity<T extends Document> implements IReadEntity<T>, IWriteEntity<T> {
  protected _model: Model<Document>;
  // generic wrapper for a db functionality, can easily be extended
  constructor(modelName: string, schema: Schema) {
    this._model = mongoose.model(modelName, schema);
  }

  getModel = () => {
    return this._model;
  };

  async create(entity: T, entityLocator: string, allowDuplicates: boolean = false) {
    if (!allowDuplicates) {
      const entityExists = await this._model.find({ [entityLocator]: (entity as any)[entityLocator] });
      if (entityExists) {
        throw Exceptions.ENTITY_EXISTS;
      }
    }
    return this._model
      .create(entity)
      .then((res) => {
        if (!res) {
          throw Exceptions.CREATE_FAILED;
        }
        return res as T;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  deleteOne(id: string) {
    return this._model
      .deleteOne({ _id: toObjectId(id) })
      .then((res) => {
        if (!res.deletedCount) {
          throw Exceptions.DELETE_FAILED;
        }
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  fetchPaginated(sortBy: string, order: SortOrder, cursor: string | undefined, limit?: number | undefined) {
    const findObject = cursor ? { _id: { $gt: cursor } } : {};
    return this._model
      .find(findObject)
      .sort({ [sortBy]: order })
      .limit(limit ? limit : 0)

      .then((result) => {
        return result as T[];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  fetchAll() {
    return this._model
      .find()

      .then((result) => {
        return result as T[];
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
