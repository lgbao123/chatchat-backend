import { StatusCodes } from 'http-status-codes';


export interface IErrorRespone {
   message: string,
   statusCode: number,
   status: string,
   serializeError(): IError
}
interface IError {
   message: string,
   statusCode: number,
   status: string,
}

export abstract class CustomError extends Error {
   abstract statusCode: number;
   abstract status: string;
   constructor(message: string) {
      super(message)
   }
   serializeError(): IError {
      return {
         message: this.message,
         status: this.status,
         statusCode: this.statusCode
      }
   }
}

export class BadRequestError extends CustomError {
   statusCode = StatusCodes.BAD_REQUEST;
   status = 'fail';
   constructor(message: string) {
      super(message)
   }
}
export class NotFoundError extends CustomError {
   statusCode = StatusCodes.NOT_FOUND;
   status = 'fail';
   constructor(message: string) {
      super(message)
   }
}
export class JoiValidateError extends CustomError {
   statusCode = StatusCodes.BAD_REQUEST;
   status = 'fail';
   constructor(message: string) {
      super(message)
   }
}