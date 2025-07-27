import { AbstractAppError } from "../../errorHandler/abstracts/AbstractAppError";
import { IInvalidSchemaContext } from "../../errorHandler/contextTypes/IInvalidSchemaContext";

interface ISchemaValidationResult {
  value: any;
  error: AbstractAppError<IInvalidSchemaContext> | undefined;
}

export { ISchemaValidationResult };
