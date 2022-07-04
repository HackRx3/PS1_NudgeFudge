import { Router, Request, Response, NextFunction } from "express";
import { join } from "path";

import { postNudgeSchema, PostNudgeType } from "./nudge.schema";
import {
  addNudge,
  deleteTriggerNudges,
  getTriggerNudges,
} from "./nudge.service";
import { validateQuery } from "../middlewares/validate-query";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

const handlePostNudge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { event_label, nudge, app_id } = req.body as PostNudgeType;
    await addNudge({ event_label, nudge, app_id });
    res.json({ success: true, message: "nudge added successfully" });
  } catch (err) {
    next(err);
  }
};

const handleGetCampaign = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.sendFile(join(__dirname, "cdn.js"));
  } catch (err) {
    next(err);
  }
};

const handleGetTriggerNudges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { app_id } = req.params;
    const nudges = await getTriggerNudges(app_id);
    res.json({ success: true, data: nudges });
    await deleteTriggerNudges(app_id);
  } catch (err) {
    next(err);
  }
};

router.post(
  "/create",
  validateJwt(),
  validateQuery("body", postNudgeSchema),
  handlePostNudge
);
router.get("/campaign.js", handleGetCampaign);
router.get("/trigger/:app_id", handleGetTriggerNudges);

export default router;
