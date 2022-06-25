import { nanoid } from "nanoid";
import { decode } from "jsonwebtoken";

import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";
import { PostCampaignType } from "./project.schema";

export const addProject = async (
  data: PostCampaignType,
  token: string
): Promise<boolean> => {
  const db = await DatabaseService.getInstance().getDb("projects");
  const exists = await db.findOne({ name: data.name });
  if (exists) throw errors.CONFLICT;
  const { user } = decode(token.split("Bearer ")[1]) as { user: string };
  await db.insertOne({ ...data, app_id: nanoid(), user });
  return true;
};

export const fetchProjects = async (token: string): Promise<any> => {
  const db = await DatabaseService.getInstance().getDb("projects");
  const { user } = decode(token.split("Bearer ")[1]) as { user: string };
  return await db.find({ user }).toArray();
};
