import { NextFunction, Request, Response } from "express";
import { SchemaValidatorFactory } from "../../schemaValidator";

function validateBody(validationSchema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validator = new SchemaValidatorFactory().createValidator("joi");
    const { value, error } = validator.validate(validationSchema, req.body);

    if (error) {
      next(error);
    } else {
      next();
    }
  };
}

export { validateBody };
