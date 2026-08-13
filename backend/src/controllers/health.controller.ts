import { Request, Response } from "express";
import { successResponse } from "../utils/apiResponse";

export const healthCheck = (_req: Request, res: Response) => {
  return successResponse(
    res,
    "WorkNest API is healthy",
    {
      service: "WorkNest API",
      status: "operational",
    }
  );
};