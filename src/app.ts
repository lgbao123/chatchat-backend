
import { ChatChatServer } from "./setupServer";
import express, { Express } from "express";
import mongooseConnect from './setupDatabase';
import { config } from "./config";
class Application {
   public initialize(): void {
      mongooseConnect();
      config.validateConfig();
      const app: Express = express();
      const server: ChatChatServer = new ChatChatServer(app);
      server.start();
   }
}
const application: Application = new Application();
application.initialize();