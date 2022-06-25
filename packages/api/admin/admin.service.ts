import { nanoid } from "nanoid";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";

export const registerAdmin = async (
  username: string,
  password: string
): Promise<string> => {
  const db = await DatabaseService.getInstance().getDb("credentials");
  const exists = await db.countDocuments({ username });
  if (exists !== 0) throw errors.BAD_REQUEST;
  const id = nanoid(9);
  const hashedPassword = await hash(password, 12);
  await db.insertOne({
    id,
    username,
    password: hashedPassword,
  });
  return id;
};

export const loginAdmin = async (
  username: string,
  password: string
): Promise<string> => {
  const db = await DatabaseService.getInstance().getDb("credentials");
  const user = await db.findOne<{ username: string; password: string }>({
    username,
  });
  if (!user) throw errors.USER_DNE;

  const validPassword = await compare(password, user.password);
  if (!validPassword) throw errors.USER_DNE;

  const authToken = sign({ user: user!.username }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  return authToken;
};
