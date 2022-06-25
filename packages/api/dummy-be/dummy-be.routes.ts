import { Router, Request, Response, NextFunction } from "express";

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

    // ? INFO: listener on the queue ill handle the stream
    // @ts-ignore
    const { message } = await PopFromQueue();
    console.log(message);

    res.json({ success: true, message: "BBE handled API perfectly" });
  } catch (err) {
    next(err);
  }
};

router.post("/", handleDummyPost);

export default router;
