import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import mongoose from "mongoose";
import { JWT_SECRET } from "../constants";
import type { Context } from "../index";

const SALT_ROUNDS = 10;

const Mutation = {
  newNote: async (
    _: never,
    { content }: { content: string },
    { models, user }: Context
  ) => {
    if (user == null) {
      throw new AuthenticationError(
        "[newNote] You must be signed in to create a note!"
      );
    }

    return models.Note.create({
      content,
      author: new mongoose.Types.ObjectId(user.id),
    });
  },
  updateNote: async (
    _: never,
    { id, content }: { id: string; content: string },
    { models, user }: Context
  ) => {
    if (user == null) {
      throw new AuthenticationError(
        "[newNote] You must be signed in to create a note!"
      );
    }

    const note = await models.Note.findById(id);

    // console.log(JSON.stringify(note, null, 2));

    if (note == null || user.id !== String(note.author)) {
      throw new ForbiddenError(
        `[updateNote] user doesn't posess this note: ${user.id}`
      );
    }

    return models.Note.findByIdAndUpdate(
      id,
      { $set: { content } },
      { new: true }
    );
  },
  deleteNote: async (
    _: never,
    { id }: { id: string },
    { models, user }: Context
  ) => {
    if (user == null) {
      throw new AuthenticationError(
        "[newNote] You must be signed in to create a note!"
      );
    }

    const note = await models.Note.findById(id);

    console.log(JSON.stringify(note, null, 2));

    if (note == null || user.id !== String(note.author)) {
      throw new ForbiddenError(
        `[deleteNote] user doesn't posess this note: ${user.id}`
      );
    }

    return note
      .remove()
      .then(() => true)
      .catch(() => false);
  },
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
