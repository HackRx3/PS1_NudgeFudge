import { ErrorConstants } from "./error.types";

export const errors: ErrorConstants = {
  BAD_REQUEST: {
    httpStatus: 400,
    message: "Bad request.",
  },
  CONFLICT: {
    httpStatus: 409,
    message: "Already exists.",
  },
  INTERNAL_SERVER_ERROR: {
    httpStatus: 500,
    message: "Internal server error.",
  },
  UNAUTHORIZED: {
    httpStatus: 401,
    message: "Unauthorized.",
  },
  NOT_FOUND: {
    httpStatus: 404,
    message: "Resource not found.",
  },
  MONGODB_CONNECT_ERROR: {
    httpStatus: 500,
    message: "Could not connect to mongoDB.",
  },
  JWT_ERROR: {
    httpStatus: 403,
    message: "JWT token not found.",
  },
  CORS_ERROR: {
    httpStatus: 500,
    message: "Not allowed by CORS.",
  },
  MONGODB_QUERY_ERROR: {
    httpStatus: 500,
    message: "MongoDB query error",
  },
};
