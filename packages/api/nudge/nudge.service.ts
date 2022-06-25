import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";
import { PostNudgeType } from "./nudge.schema";

export const addNudge = async (data: PostNudgeType): Promise<boolean> => {
  const db = await DatabaseService.getInstance().getDb("nudges");
  const exists = await db.findOne({ nudge_label: data.nudge.label });
  if (exists) throw errors.CONFLICT;
  await db.insertOne(data);
  return true;
};

export const getNudgesBasedOnAppId = async (app_id: string): Promise<any> => {
  const db = await DatabaseService.getInstance().getDb("nudges");
  return await db.find({ app_id, event_label: { $exists: false } }).toArray();
};

export const getNudgesBasedOnAppIdAndEventLabel = async (
  app_id: string,
  event_label: string
): Promise<any> => {
  const db = await DatabaseService.getInstance().getDb("nudges");
  return await db.find({ app_id, event_label }).toArray();
};
