import { signupController } from './../controllers/signup';
import express, { Router } from "express";

class AuthRoute {
   private route: Router;
   constructor() {
      this.route = express.Router();
   }
   public routes(): Router {
      this.route.post('/signup', signupController.create);
      return this.route
   }
}

export const authRoute: AuthRoute = new AuthRoute()