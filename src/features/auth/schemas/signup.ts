import Joi, { ObjectSchema } from "joi";
export const signupSchema: ObjectSchema = Joi.object().keys({
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
   email: Joi.string().required().email().messages({
      "string.base": 'Email must be of type string',
      "string.email": 'Email must be valid',
      "string.empty": 'Email is a required field',
   }),
   avatarColor: Joi.string().required().messages({
      "any.required": 'Aatar color is required',
   }),
   avatarImage: Joi.string().required().messages({
      "any.required": 'Aatar color is required',
   })
})