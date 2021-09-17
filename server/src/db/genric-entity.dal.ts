import mongoose, { Document, Model, Schema } from "mongoose";
import { IReadEntity, IWriteEntity } from "../interfaces/generic-crud.interface";
import { Exceptions } from "../utils";
import { toObjectId } from "../utils/base-id";

export class DbEnity<T extends Document> implements IReadEntity<T>, IWriteEntity<T> {
  protected _model: Model<Document>;

  constructor(modelName: string, schema: Schema) {
    this._model = mongoose.model(modelName, schema);
  }

  getModel = () => {
    return this._model;
  };

  async create(entity: T) {
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

  fetchPaginated(filter: { [key: string]: any }, cursor: string, limit?: number | undefined) {
    return this._model
      .find({ ...filter, _id: { $gt: cursor } })
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
