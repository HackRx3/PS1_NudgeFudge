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
  return await db.find({ app_id, event_label: null }).toArray();
};

export const getNudgesBasedOnAppIdAndEventLabel = async (
  app_id: string,
  event_label: string
): Promise<any> => {
  const db = await DatabaseService.getInstance().getDb("nudges");
  return await db.find({ app_id, event_label }).toArray();
};

export const getTriggerNudges = async (
  app_id: string
): Promise<Array<Object>> => {
  const db = await DatabaseService.getInstance().getDb("trigger nudge");
  return await db.find({ app_id }).toArray();
};

export const postTriggerNudge = async (nudges: Array<Object>): Promise<any> => {
  const db = await DatabaseService.getInstance().getDb("trigger nudge");
  await db.insertMany(nudges);
  return true;
};

export const deleteTriggerNudges = async (app_id: string): Promise<boolean> => {
  const db = await DatabaseService.getInstance().getDb("trigger nudge");
  await db.deleteMany({ app_id });
  return true;
};
