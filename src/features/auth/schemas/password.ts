import Joi, { ObjectSchema } from "joi";
export const emailSchema: ObjectSchema = Joi.object().keys({
   email: Joi.string().required().email().messages({
      "string.base": 'Email must be of type string',
      "string.email": 'Email must be valid',
      "string.required": 'Email is a required field',
   })
})
export const passwordSchema: ObjectSchema = Joi.object().keys({

   password: Joi.string().required().min(8).max(20).messages({
      "string.base": 'Password must be of type string',
      "string.min": 'Invalid username',
      "string.max": 'Invalid username',
      "string.empty": 'Password is a required field',
   }),
   confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
      "any.only": 'Password should match',
      "any.required": 'Confirm Password is a required field',

   })

})