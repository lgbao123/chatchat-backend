import { IAuthDocument } from "@auth/interfaces/auth.interface";
import { AuthModel } from "@auth/models/auth.model";

class AuthService {
   public async getUserByEmailOrUsername(username: string, email: string): Promise<IAuthDocument> {
      const query = {
         $or: [{ username }, { email }]
      }
      const user = await AuthModel.findOne(query).exec() as IAuthDocument;
      return user;
   }
}

export const authService: AuthService = new AuthService();