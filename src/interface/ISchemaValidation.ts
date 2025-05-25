import AbstractAppError from "../abstracts/AbstractAppError";
import IInvalidSchemaContext from "../errorHandler/contextTypes/IInvalidSchemaContext";

interface ISchemaValidation {
  validate(
    schema: any,
    data: object,
  ): { value: any; error: AbstractAppError<IInvalidSchemaContext> | undefined };
}

export default ISchemaValidation;
