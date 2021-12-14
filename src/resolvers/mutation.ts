import type { Models } from "../models";

const Mutation = {
  newNote: async (
    parent: never,
    { content }: { content: string },
    { models }: { models: Models }
  ) =>
    models.Note.create({
      content,
      author: "bigsaigon333",
    }),
};

export default Mutation;
