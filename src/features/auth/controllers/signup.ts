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
import { IUserDocument } from '@user/interfaces/user.interface';
import { userCache } from '@services/redis/user.cache';
class SignUp {
   @joiValidation(signupSchema)
   public async create(req: Request, res: Response): Promise<void> {
      const { username, email, password, avatarColor, avatarImage } = req.body;
      const user = await authService.getUserByEmailOrUsername(username, email);
      if (user) throw new BadRequestError('Email or username already exists');

      const authObjectId = new ObjectId();
      const userObjectId = new ObjectId();
      const uId = `${Math.round(Date.now())}`;
      let imgurl = '';
      if (avatarImage) {
         const result = await uploads(avatarImage, `${userObjectId}`, true, true);
         if (!result?.public_id) throw new BadRequestError('File upload :Invalid credential');
         imgurl = result.url

      }
      const authData: IAuthDocument = {
         _id: authObjectId,
         uId,
         username,
         email,
         password,
         avatarColor,
         createdAt: new Date()
      } as IAuthDocument;
      const userData: IUserDocument = SignUp.prototype.getUserData(authData, userObjectId, imgurl);
      await userCache.saveUserToCache(userObjectId, uId, userData);

      res.status(StatusCodes.OK).json({ message: "Create user successfully", authData });
   }
   private getUserData(authData: IAuthDocument, userObjectId: ObjectId, imgUrl: string): IUserDocument {
      const {
         _id, uId, username, email, password, avatarColor, createdAt } = authData

      return {
         _id: userObjectId,
         authId: _id,
         uId, username, email, password, avatarColor, createdAt,
         profilePicture: imgUrl,
         postsCount: 0,
         followersCount: 0,
         followingCount: 0,
         blocked: [],
         blockedBy: [],
         notifications: {
            messages: true,
            reactions: true,
            comments: true,
            follows: true,
         },
         social: {
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: ""
         },
         work: "",
         school: "",
         location: "",
         quote: "",
         bgImageId: "",
         bgImageVersion: "",
      } as unknown as IUserDocument

   }
}
export const signupController: SignUp = new SignUp()