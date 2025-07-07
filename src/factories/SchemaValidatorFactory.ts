import WardenError from "../errorHandler/definedError/WardenError";
import ISchemaValidation from "../interface/ISchemaValidation";
import JoiSchemaValidator from "../schemaValidator/joi/JoiSchemaValidator";

type SchemaValidators = "joi";

class SchemaValidatorFactory {
  public createValidator(name: SchemaValidators): ISchemaValidation {
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
