import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import IInvalidSchemaContext from "../contextTypes/IInvalidSchemaContext";

class ImplementationErrorHandlingStrategy
  implements IErrorHandlingStrategy<any>
{
  httpCode: number = 500;

  handle(error: AbstractAppError<IInvalidSchemaContext>): void {}

  getFormattedError(
    error: AbstractAppError<IInvalidSchemaContext>,
  ): IAppError<IInvalidSchemaContext> {
    return {
      ...error.getFormat(),
    };
  }
}

export default ImplementationErrorHandlingStrategy;
