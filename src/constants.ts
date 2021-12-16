import dotenv from "dotenv";
import { throwError } from "./utils";

dotenv.config();

export const DB_HOST =
  process.env.DB_HOST ?? throwError("DB_HOST is undefined");

export const PORT = process.env.PORT ?? 4000;

export const JWT_SECRET =
  process.env.JWT_SECRET ?? throwError("JWT_SECRET is undefined");
