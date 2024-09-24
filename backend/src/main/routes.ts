import { Request, Response, Router } from "express";

import { Routes } from "@/shared/common/interface/route.interface";
import { HttpStatus } from "@/shared/common/enum/http-status";
import { ApiResponse } from "@/shared/common/response/api";

const router: Router = Router();

export class Route implements Routes {
  public path = "/";
  public router = router;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, async (_: Request, res: Response) => {
      res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, "Ok", "Hello Wrold"));
    });
  }
}
