import ValidationComposite from "../ValidationComposite";
import AllowedCharactersValidationLeaf from "../validationLeafs/AllowedCharactersValidationLeaf";
import MaxLengthValidationLeaf from "../validationLeafs/MaxLengthValidationLeaf";
import MinLengthValidationLeaf from "../validationLeafs/MinLengthValidationLeaf";

const passwordValidator = new ValidationComposite()
  .add(new MinLengthValidationLeaf(8))
  .add(new MaxLengthValidationLeaf(32))
  .add(
    new AllowedCharactersValidationLeaf(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one of the following special characters: #?!@$%^&*-",
    ),
  );

export default passwordValidator;
