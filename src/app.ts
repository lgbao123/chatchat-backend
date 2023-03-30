
import { ChatChatServer } from "./setupServer";
import express, { Express } from "express";
import mongooseConnect from './setupDatabase';
import { config } from "./config";
class Application {
   public initialize(): void {
      mongooseConnect();
      this.loadConfig();
      const app: Express = express();
      const server: ChatChatServer = new ChatChatServer(app);
      server.start();
   }
   private loadConfig(): void {
      config.validateConfig();
      config.cloudinaryConfig();
   }
}
const application: Application = new Application();
application.initialize();