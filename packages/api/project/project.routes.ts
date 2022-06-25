import { Router, Request, Response, NextFunction } from "express";

import { postProjectSchema, PostCampaignType } from "./project.schema";
import { addProject } from "./project.service";
import { validateQuery } from "../middlewares/validate-query";
import { getNudges } from "../nudge/nudge.service";

const router = Router();

const handlePostProject = async (
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

const handleGetNudges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { app_id } = req.params;
    const nudges = await getNudges(app_id);
    res.json({ success: true, data: nudges });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/create",
  validateQuery("body", postProjectSchema),
  handlePostProject
);
router.get("/nudges/:app_id", handleGetNudges);

export default router;
