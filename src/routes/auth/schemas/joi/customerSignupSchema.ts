import Joi from "joi";

const customerSignupSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string().max(50).required().trim(),
    middleName: Joi.string().max(50).trim(),
    lastName: Joi.string().max(50).required().trim(),
  }),
  username: Joi.string().max(50).lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(25).required().trim(),
});

export default customerSignupSchema;
