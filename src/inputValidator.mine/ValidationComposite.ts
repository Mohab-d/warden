import IInputViolation from "../interface/IInputViolation";
import IValidationComponent from "../interface/IValidationComponent";
import IValidationResponse from "../interface/IValidationResponse";

class ValidationComposite implements IValidationComponent {
  private components: IValidationComponent[] = [];

  public add(subComponent: IValidationComponent) {
    this.components.push(subComponent);
    return this;
  }

  public validate(value: any): IValidationResponse {
    const violationsArr: IInputViolation[] = [];

    this.components.forEach((c) => {
      const { violations } = c.validate(value);
      if (violations.length > 0) violationsArr.push(...violations);
    });

    return {
      validValue: violationsArr.length > 0 ? null : value,
      violations: violationsArr,
    };
  }
}

export default ValidationComposite;
