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
