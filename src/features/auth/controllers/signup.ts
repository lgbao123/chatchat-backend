import { ObjectId } from 'mongodb';
import { signupSchema } from "@auth/schemas/signup";
import { joiValidation } from "@global/decorators/joi-validation.decorator";
import { BadRequestError } from "@global/helpers/error-handle";
import { authService } from "@services/db/auth.service";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { StatusCodes } from 'http-status-codes';
import { uploads } from '@global/helpers/cloudinary-upload';
class SignUp {
   @joiValidation(signupSchema)
   public async create(req: Request, res: Response): Promise<void> {
      const { username, email, password, avatarColor, avatarImage } = req.body;
      const user = await authService.getUserByEmailOrUsername(username, email);
      if (user) throw new BadRequestError('Email or username already exists');

      const authObjectId = new ObjectId();
      const userObjectId = new ObjectId();
      const uId = uuidv4();

      const result = await uploads(avatarImage, `${userObjectId}`, true, true);
      if (!result?.public_id) throw new BadRequestError('File upload :Invalid credential');
      const authData: IAuthDocument = {
         _id: authObjectId,
         uId,
         username,
         email,
         password,
         avatarColor,
         createdAt: new Date()
      } as IAuthDocument



      res.status(StatusCodes.OK).json({ message: "Create user successfully", authData });
   }
}
export const signupController: SignUp = new SignUp()