import { AuthenticationError } from "apollo-server-express";
import { throwError } from "../utils";
import type { Context } from "../index";

const Query = {
  notes: async (parent: never, args: never, { models }: Context) =>
    models.Note.find(),
  note: async (parent: never, { id }: { id: string }, { models }: Context) =>
    models.Note.findById(id),
  users: async (_: never, args: never, { models }: Context) =>
    models.User.find({}),
  user: async (
    _: never,
    { username }: { username: string },
    { models }: Context
  ) => {
    return models.User.findOne({ username });
  },
  me: async (_: never, args: never, { models, user }: Context) => {
    if (user == null) {
      throw new AuthenticationError("[me] not signed in");
    }

    const me =
      (await models.User.findById(user.id)) ?? throwError("[me] not found me");

    return me;
  },
};

export default Query;
