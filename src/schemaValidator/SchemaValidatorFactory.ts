import { ISchemaValidator } from ".";
import { WardenError } from "../errorHandler";
import { JoiSchemaValidator } from "./joi/JoiSchemaValidator";

type SchemaValidators = "joi";

class SchemaValidatorFactory {
  public createValidator(name: SchemaValidators): ISchemaValidator {
    switch (name) {
      case "joi":
        return new JoiSchemaValidator();
      default:
        throw WardenError.unknownOperation({
          name: name,
        });
    }
  }
}

export { SchemaValidatorFactory };
