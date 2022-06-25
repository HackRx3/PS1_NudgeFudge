import { Router, Request, Response, NextFunction } from "express";
import { join } from "path";

import { postNudgeSchema, PostNudgeType } from "./nudge.schema";
import { addNudge } from "./nudge.service";
import { validateQuery } from "../middlewares/validate-query";

const router = Router();

const handlePostNudge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { event_label, nudge_label } = req.body as PostNudgeType;
    await addNudge({ event_label, nudge_label });
    res.json({ success: true, message: "nudge added successfully" });
  } catch (err) {
    next(err);
  }
};

const handleGetCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.sendFile(join(__dirname, "cdn.js"));
  } catch (err) {
    next(err);
  }
};

router.post("/create", validateQuery("body", postNudgeSchema), handlePostNudge);
router.get("/campaign.js", handleGetCampaign);

export default router;
