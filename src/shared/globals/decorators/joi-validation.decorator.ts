import { JoiValidateError } from './../helpers/error-handle';
import { ObjectSchema } from "joi";
import { Request } from "express";
export function joiValidation(schema: ObjectSchema) {
   return function (_target: any, _value: String, descriptor: PropertyDescriptor) {
      const originMethod = descriptor.value;
      descriptor.value = async (...args: any[]) => {
         const req: Request = args[0]
         const { error } = schema.validate(req.body)
         if (error && error.details) {
            throw new JoiValidateError(error?.details[0].message)
         }
         originMethod(...args)
      }
      return descriptor
   }
}