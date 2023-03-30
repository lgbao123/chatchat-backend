import { Application, json, urlencoded, Response, Request, NextFunction } from 'express'
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { StatusCodes } from 'http-status-codes';
import { config } from '@root/config';
import appRoutes from '@root/routes';
import { IErrorRespone, CustomError } from '@global/helpers/error-handle'
import 'express-async-errors';

const SERVER_PORT = 5000
export class ChatChatServer {
   private app: Application;
   constructor(app: Application) {
      this.app = app
   }
   public start(): void {
      this.securityMiddleware(this.app);
      this.standarMiddleware(this.app);
      this.routeMiddleware(this.app);
      this.globalErrorHandle(this.app)
      this.startServer(this.app);
   }

   private securityMiddleware(app: Application): void {
      app.use(
         cookieSession({
            name: 'session',
            keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false
         }))
      app.use(hpp());
      app.use(helmet());
      app.use(
         cors({
            origin: config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
         }))
   }

   private standarMiddleware(app: Application): void {
      app.use(compression());
      app.use(json({ limit: '50mb' }))
      app.use(urlencoded({ extended: true, limit: '50mb' }))
   }

   private routeMiddleware(app: Application): void {
      appRoutes(app);
   }

   private globalErrorHandle(app: Application): void {
      app.all('*', (req: Request, res: Response) => {
         res.status(StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl} not found` })
      })
      app.use((error: IErrorRespone, req: Request, res: Response, next: NextFunction) => {
         if (error instanceof CustomError) {
            return res.status(error.statusCode).json(error.serializeError())
         }
         next();
      })
   }

   private async startServer(app: Application): Promise<void> {
      try {
         const httpServer: http.Server = new http.Server(app);
         const io: Server = await this.createSocketIO(httpServer);
         this.socketIOConnection(io);
         this.startHttpServer(httpServer);
      } catch (error) {
         console.log(error);

      }
   }

   private async createSocketIO(httpServer: http.Server): Promise<Server> {
      const io = new Server(httpServer, {
         cors: {
            origin: config.CLIENT_URL,
            methods: ["GET", 'POST', 'PUT', 'DELETE', 'OPTIONS']
         }
      })
      const pubClient = createClient({ url: config.REDIS_HOST })
      const subClient = pubClient.duplicate();
      await Promise.all([pubClient.connect(), subClient.connect()]);
      io.adapter(createAdapter(pubClient, subClient));
      return io

   }
   private socketIOConnection(io: Server): void {

   }

   private startHttpServer(httpServer: http.Server): void {
      httpServer.listen(SERVER_PORT, () => {
         console.log(`Server running on port ${SERVER_PORT} and started with process ${process.pid}`);

      })
   }
}
