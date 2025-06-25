import ISchemaValidationResult from "./ISchemaValidationResult";

interface ISchemaValidation {
  validate(schema: any, data: object): ISchemaValidationResult;
}

export default ISchemaValidation;
