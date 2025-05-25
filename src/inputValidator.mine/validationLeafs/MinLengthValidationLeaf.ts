import IInputViolation from "../../interface/IInputViolation";
import IValidationComponent from "../../interface/IValidationComponent";
import IValidationResponse from "../../interface/IValidationResponse";

class MinLengthValidationLeaf implements IValidationComponent {
  private _min: number = 0;

  get min() {
    return this._min;
  }

  set min(min: number) {
    if (min < 0) throw new Error("min can not be negative.");
    this._min = min;
  }

  constructor(min: number) {
    this.min = min;
  }

  validate(value: string): IValidationResponse {
    const isValid = value.length >= this.min;

    return {
      validValue: isValid ? value : null,
      violations: isValid ? [] : [this.getViolationReport(value)],
    };
  }

  private getViolationReport(value: string): IInputViolation {
    return {
      name: "Allowed Characters Violation",
      code: "ProhibitedCharacters",
      message: `Minimum length is set to ${this.min}, provided string is of length ${value.length}`,
    };
  }
}

export default MinLengthValidationLeaf;
