import { ISchemaValidationResult } from "./ISchemaValidationResult";

interface ISchemaValidator {
  validate(schema: any, data: object): ISchemaValidationResult;
}

export { ISchemaValidator };
