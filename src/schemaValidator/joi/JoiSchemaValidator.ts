import { Schema, ValidationError } from "joi";
import ISchemaValidation from "../../interface/ISchemaValidation";
import IInvalidSchemaContext from "../../errorHandler/contextTypes/IInvalidSchemaContext";
import AbstractAppError from "../../abstracts/AbstractAppError";
import WardenError from "../../errorHandler/definedError/WardenError";
import ErrorType from "../../errorHandler/ErrorType";

class JoiSchemaValidator implements ISchemaValidation {
  public validate(
    schema: Schema,
    data: object,
  ): {
    value: any;
    error: AbstractAppError<IInvalidSchemaContext> | undefined;
  } {
    const { value, error } = schema.validate(data);

    return {
      value: value,
      error: error ? this.adaptError(error) : undefined,
    };
  }

  private adaptError(
    error: ValidationError,
  ): AbstractAppError<IInvalidSchemaContext> {
    const joiDetailsAdapted = error.details.map((e) => ({
      message: e.message,
      valueName: e.context?.label ?? "unkonwn",
      invalidValue: e.context?.value,
      path: e.path.join("."),
    }));

    return new WardenError<IInvalidSchemaContext>(
      "Schema validation error",
      "Request sent does not match defined schema",
      true,
      ErrorType.ERR_INVALID_SCHEMA,
      {
        details: joiDetailsAdapted,
      },
    );
  }
}

export default JoiSchemaValidator;
