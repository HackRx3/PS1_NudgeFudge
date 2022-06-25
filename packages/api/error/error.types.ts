export type ErrorConstants = Record<
  string,
  { httpStatus: number; message: string }
>;

export interface ApiError extends Error {
  message: string;
  httpStatus?: number;
}
