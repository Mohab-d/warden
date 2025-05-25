import AbstractAppError from "../abstracts/AbstractAppError";
import IAppError from "./IAppError";

interface IErrorHandlingStrategy<T> {
  httpCode: number;
  handle(error: AbstractAppError<T>): void;
  getFormattedError(error: AbstractAppError<T>): IAppError<T>;
}

export default IErrorHandlingStrategy;
