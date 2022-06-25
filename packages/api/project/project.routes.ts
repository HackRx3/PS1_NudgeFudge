import { Router, Request, Response, NextFunction } from "express";

import { postProjectSchema, PostCampaignType } from "./project.schema";
import { addProject } from "./project.service";
import { validateQuery } from "../middlewares/validate-query";

const router = Router();

const handlePostNudge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, platform } = req.body as PostCampaignType;
    await addProject({ name, platform });
    res.json({ success: true, message: "project added successfully" });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/create",
  validateQuery("body", postProjectSchema),
  handlePostNudge
);

export default router;
