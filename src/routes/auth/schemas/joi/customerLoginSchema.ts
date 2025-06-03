import Joi from "joi";

const customerLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(25).required().trim(),
});

export default customerLoginSchema;
