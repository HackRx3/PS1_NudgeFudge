import { nanoid } from "nanoid";

import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";
import { PostCampaignType } from "./project.schema";

export const addProject = async (data: PostCampaignType): Promise<boolean> => {
  const db = await DatabaseService.getInstance().getDb("projects");
  const exists = await db.findOne({ name: data.name });
  if (exists) throw errors.CONFLICT;
  await db.insertOne({ ...data, app_id: nanoid() });
  return true;
};
