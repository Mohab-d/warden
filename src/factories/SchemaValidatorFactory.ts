import WardenError from "../errorHandler/definedError/WardenError";
import ISchemaValidator from "../interface/ISchemaValidator";
import JoiSchemaValidator from "../schemaValidator/joi/JoiSchemaValidator";

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

export default SchemaValidatorFactory;
