import Joi, { ObjectSchema } from "joi";
export const loginSchema: ObjectSchema = Joi.object().keys({
   username: Joi.string().required().min(4).max(20).messages({
      "string.base": 'Username must be of type string',
      "string.min": 'Invalid username',
      "string.max": 'Invalid username',
      "string.empty": 'Username is a required field',
   }),
   password: Joi.string().required().min(8).max(20).messages({
      "string.base": 'Password must be of type string',
      "string.min": 'Invalid username',
      "string.max": 'Invalid username',
      "string.empty": 'Password is a required field',
   }),
})