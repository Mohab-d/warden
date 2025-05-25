import IInputViolation from "./IInputViolation";

interface IValidationResponse {
  validValue: any | null;
  violations: IInputViolation[];
}

export default IValidationResponse;
