import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";

abstract class AbstractAppError<T> extends Error {
  public name: string;
  public message: string;
  public isWardenError: boolean;
  public type: ErrorType;
  public context?: T;
  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  constructor(
    name: string,
    message: string,
    isTrustedError: boolean,
    type: ErrorType,
    context?: T,
  ) {
    super();
    this.name = name;
    this.message = message;
    this.isWardenError = isTrustedError;
    this.type = type;
    this.context = context;
    this._createdAt = new Date();
  }

  public getContext(): any {
    return this.context;
  }

  public getFormat(): IAppError<T> {
    return {
      name: this.name,
      message: this.message,
      isWardenError: this.isWardenError,
      type: this.type,
      context: this.context,
      createdAt: this._createdAt,
    };
  }
}

export { AbstractAppError };
