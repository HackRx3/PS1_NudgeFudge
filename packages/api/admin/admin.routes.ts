import { Router, Request, Response, NextFunction } from "express";

import { validateQuery } from "../middlewares/validate-query";
import { loginAdmin, registerAdmin } from "./admin.service";
import {
  AdminLoginType,
  adminLoginSchema,
  AdminRegisterType,
  adminRegisterSchema,
} from "./admin.schema";

const router = Router();

const handlePostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as AdminLoginType;
    const authToken = await loginAdmin(username, password);
    res.json({
      success: true,
      authToken,
    });
  } catch (err) {
    next(err);
  }
};

const handlePostRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as AdminRegisterType;
    const id = await registerAdmin(username, password);
    res.status(201).json({
      success: true,
      id,
    });
  } catch (err) {
    next(err);
  }
};

router.post("/login", validateQuery("body", adminLoginSchema), handlePostLogin);

router.post(
  "/register",
  validateQuery("body", adminRegisterSchema),
  handlePostRegister
);

export default router;
