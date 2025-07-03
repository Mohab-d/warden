import Joi from "joi";

const thirdPartyAppSignupSchema = Joi.object({
  name: Joi.string().min(1).required(),
  owner: Joi.string().min(1).required(),
  ownerEmail: Joi.string().email().required(),
});

export default thirdPartyAppSignupSchema;
