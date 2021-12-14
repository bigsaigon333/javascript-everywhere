import type { Models } from "../models";

const Query = {
  notes: async (parent: never, args: never, { models }: { models: Models }) =>
    models.Note.find(),
  note: async (
    parent: never,
    { id }: { id: string },
    { models }: { models: Models }
  ) => models.Note.findById(id),
};

export default Query;
