import mongoose, { Document, Model, Schema } from "mongoose";
import { FailedCrudMessage } from "../interfaces/failed-crud-message.interface";
import { IReadEntity, IWriteEntity, SortOrder } from "../interfaces/generic-crud.interface";
import { CreateFailedException, DeleteFailedException, EntityExistsException } from "../utils";
import { toObjectId } from "../utils/base-id";

export class DbEnity<T extends Document> implements IReadEntity<T>, IWriteEntity<T> {
  protected _model: Model<Document>;
  private _failedCrudMessages;
  // generic wrapper for a db functionality, can easily be extended
  constructor(modelName: string, schema: Schema, failedCrudMessages: FailedCrudMessage) {
    this._model = mongoose.model(modelName, schema);
    this._failedCrudMessages = failedCrudMessages;
  }

  getModel = () => {
    return this._model;
  };

  getFailedCrudMessages = () => {
    return this._failedCrudMessages;
  };

  async create(entity: T, entityLocator: string, allowDuplicates: boolean = false) {
    if (!allowDuplicates) {
      const entityExists = await this._model.find({ [entityLocator]: (entity as any)[entityLocator] });
      if (entityExists) {
        console.log(this._failedCrudMessages.onEntityExists);

        throw new EntityExistsException(this._failedCrudMessages.onEntityExists);
      }
    }
    return this._model
      .create(entity)
      .then((res) => {
        if (!res) {
          throw new CreateFailedException(this._failedCrudMessages.onCreateFailed);
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
          throw new DeleteFailedException(this._failedCrudMessages.onDeleteFailed);
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
