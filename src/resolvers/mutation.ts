import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import { JWT_SECRET } from "../constants";
import type { Context } from "../index";

const SALT_ROUNDS = 10;

const Mutation = {
  newNote: async (
    _: never,
    { content }: { content: string },
    { models }: Context
  ) =>
    models.Note.create({
      content,
      author: "bigsaigon333",
    }),
  updateNote: async (
    _: never,
    { id, content }: { id: string; content: string },
    { models }: Context
  ) => models.Note.findByIdAndUpdate(id, { $set: { content } }, { new: true }),
  deleteNote: (_: never, { id }: { id: string }, { models }: Context) =>
    models.Note.findByIdAndRemove(id)
      .then(() => true)
      .catch(() => false),
  signUp: async (
    _: never,
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { models }: Context
  ) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await models.User.create({
      username,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    return jwt.sign({ id: user._id }, JWT_SECRET);
  },
  signIn: async (
    _: never,
    {
      username,
      email,
      password,
    }: (
      | { username: string; email?: string }
      | { username?: string; email: string }
    ) & { password: string },
    { models }: Context
  ) => {
    const user = await models.User.findOne({
      $or: [{ username }, { email: email?.trim().toLowerCase() }],
    });

    if (user == null || !(await bcrypt.compare(password, user.password))) {
      throw new AuthenticationError("[signIn] Error signing in");
    }

    return jwt.sign({ id: user._id }, JWT_SECRET);
  },
};

export default Mutation;
