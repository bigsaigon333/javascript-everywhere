import type { Context } from "../index";

const Query = {
  notes: async (parent: never, args: never, { models }: Context) =>
    models.Note.find(),
  note: async (parent: never, { id }: { id: string }, { models }: Context) =>
    models.Note.findById(id),
};

export default Query;
