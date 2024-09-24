import { NextFunction, Request, Response } from "express";

import { HttpException } from "@/shared/common/exceptions/http-exception";
import { ApiResponse } from "@/shared/common/response/api";
import { logger } from "@/shared/common/logger";
import { HttpStatus } from "@/shared/common/enum/http-status";

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || HttpStatus.BAD_GATEWAY;
    const message: string = error.message || "Something went wrong";

    logger.error(message);
    res.status(status).json(new ApiResponse(status, message, null));
  } catch (error) {
    next(error);
  }
};
