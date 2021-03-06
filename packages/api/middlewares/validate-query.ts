import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

type RequestLocations = "query" | "body" | "params" | "headers";

/**
 * Generic Request Validator
 * @param {RequestLocations} location The parameter of the req object to be validated.
 * @param {yup.ObjectSchema<any>} schema The schema against which validation is to be done.
 */
export const validateQuery = (
  location: RequestLocations,
  schema: yup.ObjectSchema<any>
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    let _location: any;
    switch (location) {
      case "query": {
        _location = req.query;
        break;
      }
      case "body": {
        _location = req.body;
        break;
      }
      case "params": {
        _location = req.params;
        break;
      }
      case "headers": {
        _location = req.headers;
        break;
      }
    }

    try {
      await schema.validate(_location, { abortEarly: false });
      next();
    } catch (error: any) {
      let message: string = "";
      error.errors.forEach((e: string) => {
        message += `${e}. `;
      });
      next({
        httpStatus: 400,
        message,
      });
    }
  };
};
