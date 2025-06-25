import AbstractAppError from "../abstracts/AbstractAppError";
import IInvalidSchemaContext from "../errorHandler/contextTypes/IInvalidSchemaContext";

interface ISchemaValidationResult {
  value: any;
  error: AbstractAppError<IInvalidSchemaContext> | undefined;
}

export default ISchemaValidationResult;
