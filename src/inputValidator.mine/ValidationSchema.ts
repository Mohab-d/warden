import IValidationComponent from "../interface/IValidationComponent";
import IValidationResponse from "../interface/IValidationResponse";

type SchemaT = Record<string, IValidationComponent>;

class ValidationSchema {
  public schema: SchemaT;

  constructor(schema: SchemaT) {
    this.schema = schema;
  }

  public validate(value: Record<string, any>) {
    const violations = this.extractViolations(value);

    const isValid = Object.keys(violations).length === 0;

    return {
      validValue: isValid ? value : null,
      violations: [violations],
    };
  }

  private extractViolations(
    value: Record<string, any>,
  ): Record<string, IValidationResponse> {
    const fields = Object.keys(value);
    const violationsMap: Record<string, IValidationResponse> = {};

    fields.forEach((field) => {
      const { validValue, violations } = this.schema[field].validate(
        value[field],
      );

      if (!validValue) {
        violationsMap[field] = {
          validValue: validValue,
          violations: violations,
        };
      }
    });

    return violationsMap;
  }
}

export default ValidationSchema;
