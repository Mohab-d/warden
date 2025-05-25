import ValidationComposite from "../ValidationComposite";
import AllowedCharactersValidationLeaf from "../validationLeafs/AllowedCharactersValidationLeaf";
import MaxLengthValidationLeaf from "../validationLeafs/MaxLengthValidationLeaf";
import MinLengthValidationLeaf from "../validationLeafs/MinLengthValidationLeaf";
import ValidationSchema from "../ValidationSchema";

const signupSchema = new ValidationSchema({
  username: new ValidationComposite()
    .add(new MinLengthValidationLeaf(8))
    .add(new MaxLengthValidationLeaf(32))
    .add(
      new AllowedCharactersValidationLeaf(
        /^[A-Za-z][A-Za-z0-9_]$/,
        "Allowed Characters are A to Z, a to z, 0 to 9, and '_' and the username must start with an alphabet",
      ),
    ),
  password: new ValidationComposite()
    .add(new MinLengthValidationLeaf(8))
    .add(new MaxLengthValidationLeaf(32))
    .add(
      new AllowedCharactersValidationLeaf(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one of the following special characters: [#?!@$%^&*-]",
      ),
    ),
});

export default signupSchema;
