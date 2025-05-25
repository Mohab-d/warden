import IInputViolation from "./IInputViolation";
import IValidationResponse from "./IValidationResponse";

interface IValidationComponent {
  validate(value: any): IValidationResponse;
}

export default IValidationComponent;
