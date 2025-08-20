import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().trim().min(6).required(),
});

export default loginSchema;
