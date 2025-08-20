import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  username: Joi.string().alphanum().trim().min(3).required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().trim().min(6).required(),
});

export default registerSchema;
