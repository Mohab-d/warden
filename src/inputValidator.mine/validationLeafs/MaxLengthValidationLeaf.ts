import IInputViolation from "../../interface/IInputViolation";
import IValidationComponent from "../../interface/IValidationComponent";
import IValidationResponse from "../../interface/IValidationResponse";

class MaxLengthValidationLeaf implements IValidationComponent {
  private _max: number = 0;

  get max() {
    return this._max;
  }

  set max(max: number) {
    if (max < 0) throw new Error("max can not be negative.");
    this._max = max;
  }

  constructor(max: number) {
    this.max = max;
  }

  validate(value: string): IValidationResponse {
    const isValid = value.length <= this.max;

    return {
      validValue: isValid ? value : null,
      violations: isValid ? [] : [this.getViolationReport(value)],
    };
  }

  private getViolationReport(value: string): IInputViolation {
    return {
      name: "Maximum Length Violation",
      code: "TooLongString",
      message: ` Maximum length is set to ${this.max}, provided string is of length ${value.length}`,
    };
  }
}

export default MaxLengthValidationLeaf;
