import Joi from "joi";

const customerLoginSchema = Joi.object({
  username: Joi.string().min(1).max(25).required(),
  password: Joi.string().min(8).max(25).required().trim(),
});

export default customerLoginSchema;
