export interface IServerException {
  message: string;
  code: number;
}

export abstract class Exception extends Error {
  message: string;
  code: number;
  constructor(private _message: string, private _code: number) {
    super();
    this.message = this._message;
    this.code = this._code;
  }
}

export class EntityExistsException extends Exception {
  constructor(message: string = "Entity already exists", code: number = 409) {
    super(message, code);
  }
}

export class CreateFailedException extends Exception {
  constructor(message: string = "Failed to create entity", code: number = 500) {
    super(message, code);
  }
}

export class DeleteFailedException extends Exception {
  constructor(message: string = "Failed to delete entity", code: number = 500) {
    super(message, code);
  }
}

export class BadRequestException extends Exception {
  constructor(message: string = "Bad Request", code: number = 400) {
    super(message, code);
  }
}
