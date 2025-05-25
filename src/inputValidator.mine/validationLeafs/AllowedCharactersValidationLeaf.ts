import IInputViolation from "../../interface/IInputViolation";
import IValidationComponent from "../../interface/IValidationComponent";
import IValidationResponse from "../../interface/IValidationResponse";

class AllowedCharactersValidationLeaf implements IValidationComponent {
  private _allowedPattern: RegExp;
  private _violationMessage: string;

  constructor(allowedPattern: RegExp, violationMessage: string) {
    this._allowedPattern = allowedPattern;
    this._violationMessage = violationMessage;
  }

  validate(value: string): IValidationResponse {
    const isMatched = value.match(this._allowedPattern);

    return {
      validValue: !isMatched ? null : value,
      violations: !isMatched ? [this.getViolationReport(value)] : [],
    };
  }

  private getViolationReport(value: string): IInputViolation {
    return {
      name: "Allowed Characters Violation",
      code: "ProhibitedCharacters",
      message: this._violationMessage,
    };
  }
}

export default AllowedCharactersValidationLeaf;
