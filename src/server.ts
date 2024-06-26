import "reflect-metadata";
import { initOrm } from './db';
import express, {Application} from "express";
import {createServer, Server as HttpServer} from "http";
import appConfig from './utils/config/app';
import logger from './utils/logger';
import cors from "cors";
import cookieParser from "cookie-parser";

export class Server {
  private PORT: number = appConfig.APP_PORT;
  private readonly app: Application;
  private readonly httpServer: HttpServer;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    logger.info(`Configured server variables`);

    this.configureServer();
    logger.info(`Configured app settings`);
  }

  private configureServer() {
    const corsOptions = {
      origin: '*',
    };
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.app.use(express.json());

    this.app.use("/api", router);
    this.app.use(errorHandlerMiddleware);
  }

  public async start() {
    this.httpServer.listen(this.PORT, () => {
      logger.info(`Server is working on ${this.PORT}`);
    });
  }
}