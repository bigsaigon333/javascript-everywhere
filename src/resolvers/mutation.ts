import type { Models } from "../models";

const Mutation = {
  newNote: async (
    _: never,
    { content }: { content: string },
    { models }: { models: Models }
  ) =>
    models.Note.create({
      content,
      author: "bigsaigon333",
    }),
  updateNote: async (
    _: never,
    { id, content }: { id: string; content: string },
    { models }: { models: Models }
  ) => models.Note.findByIdAndUpdate(id, { $set: { content } }, { new: true }),
  deleteNote: (
    _: never,
    { id }: { id: string },
    { models }: { models: Models }
  ) =>
    models.Note.findByIdAndRemove(id)
      .then(() => true)
      .catch(() => false),
};

export default Mutation;
