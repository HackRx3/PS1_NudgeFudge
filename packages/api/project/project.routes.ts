import { Router, Request, Response, NextFunction } from "express";

import { postProjectSchema, PostCampaignType } from "./project.schema";
import { addProject, fetchProjects } from "./project.service";
import { validateQuery } from "../middlewares/validate-query";
import { getNudgesBasedOnAppId } from "../nudge/nudge.service";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

const handlePostProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, platform } = req.body as PostCampaignType;
    const { authorization } = req.headers;
    await addProject({ name, platform }, authorization as string);
    res.json({ success: true, message: "project added successfully" });
  } catch (err) {
    next(err);
  }
};

const handleGetProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const nudges = await fetchProjects(authorization as string);
    res.json({ success: true, data: nudges });
  } catch (err) {
    next(err);
  }
};

const handleGetProjectNudges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { app_id } = req.params;
    const nudges = await getNudgesBasedOnAppId(app_id);
    res.json({ success: true, data: nudges });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/create",
  validateJwt(),
  validateQuery("body", postProjectSchema),
  handlePostProject
);
router.get("/nudges/:app_id", validateJwt(), handleGetProjectNudges);
router.get("/nudges", validateJwt(), handleGetProjects);

export default router;
