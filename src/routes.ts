import { authRoute } from "@auth/routes/auth.route";
import { Application } from "express";
const BASE_PATH = '/api/v1'
export default (app: Application) => {
   const routes = () => {
      app.use(BASE_PATH, authRoute.routes())
   }
   routes();
}