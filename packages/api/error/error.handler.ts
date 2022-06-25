import { Request, Response, NextFunction } from "express";

import { ApiError } from "./error.types";

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("ApiError\n%o", err);
  if (err.httpStatus) {
    return res.status(err.httpStatus).json({
      success: false,
      error: err.message,
    });
  }
  res.status(500).json({
    success: false,
    error: "Internal Server Error.",
  });
};
