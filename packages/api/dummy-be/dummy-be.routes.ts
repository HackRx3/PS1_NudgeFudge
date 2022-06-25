import { Router, Request, Response, NextFunction } from "express";

import {
  getNudgesBasedOnAppIdAndEventLabel,
  postTriggerNudge,
} from "../nudge/nudge.service";
import { PopFromQueue, PushToQueue } from "../services/queue.service";

const router = Router();

const handleDummyPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ? INFO: Business BE will handle
    const data = { ...req.body, event_label: "payment_success" };

    // ? INFO: pushing to our queue, will be handled by SDK
    PushToQueue(JSON.stringify(data));

    // ? INFO: listener on the queue will handle the stream
    res.json({ success: true, message: "BBE handled API perfectly" });

    const { message } = await PopFromQueue();
    const { app_id, event_label } = JSON.parse(message) as {
      app_id: string;
      event_label: string;
    };

    const nudges = await getNudgesBasedOnAppIdAndEventLabel(
      app_id,
      event_label
    );

    await postTriggerNudge(nudges);
  } catch (err) {
    next(err);
  }
};

router.post("/", handleDummyPost);

export default router;
