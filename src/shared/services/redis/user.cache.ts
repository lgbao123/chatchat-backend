import { ServerError } from './../../globals/helpers/error-handle';
import { ObjectId } from 'mongodb';
import { BaseCache } from "./base.cache";
import { IUserDocument } from "@user/interfaces/user.interface";

class UserCache extends BaseCache {
   constructor() {
      super()
   }
   async saveUserToCache(userObjectId: ObjectId, uid: string, userData: IUserDocument): Promise<void> {
      try {

         // if(!this.client.isOpen) await this.client.connect() 
         type userCacheType = Record<keyof IUserDocument, string>
         const data: userCacheType = { ...userData } as unknown as userCacheType
         for (const [key, value] of Object.entries(userData)) {
            if (typeof value === 'object' || Array.isArray(value)) {
               data[key as keyof IUserDocument] = JSON.stringify(value);
            } else data[key as keyof IUserDocument] = `${value}`;
         }
         // console.log(Object.entries(data).flat());

         this.client.HSET(`user:${userObjectId}`, Object.entries(data).flat());
         this.client.ZADD(`user`, { score: +uid, value: `${userObjectId}` })
      } catch (error) {
         console.log(error);
         throw new ServerError('Server Error')

      }

   }
}
export const userCache = new UserCache()