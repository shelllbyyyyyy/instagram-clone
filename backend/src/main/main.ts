import express from "express";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis";

import { NODE_ENV, PORT } from "@/shared/common/config";
import { Routes } from "@/shared/common/interface/route.interface";
import { redis, redisStore } from "@/shared/libs/redis";
import { logger } from "@/shared/common/logger";

import * as middlewares from "./middleware";

export class App {
  public host: string;
  public app: express.Application;
  public env: string;
  public port: number;
  public redis: RedisStore;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = Number(PORT);
    this.host = NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
    this.redis = redisStore;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeRedisConnection();
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App running on http://${this.host}:${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(middlewares.ErrorMiddleware);
  }

  private async initializeRedisConnection() {
    try {
      const pong = await redis.ping();
      logger.info(`Redis connection successful: ${pong}`);
    } catch (err) {
      logger.error(err);
    }
  }
}
