import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import dotenv from "dotenv";
import db from "./db";
import models from "./models";

dotenv.config();

const { DB_HOST, PORT = 4000 } = process.env;

if (DB_HOST == null) {
  throw new Error("DB_HOST is undefined");
}

const typeDefs = gql`
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }

  type Note {
    id: ID!
    content: String!
    author: String!
  }
`;

const resolvers = {
  Query: {
    notes: async () => models.Note.find(),
    note: async (_: never, { id }: { id: string }) => models.Note.findById(id),
  },
  Mutation: {
    newNote: async (_: never, { content }: { content: string }) =>
      models.Note.create({
        content,
        author: "bigsaigon333",
      }),
  },
};

(async () => {
  const app = express();

  db.connect(DB_HOST);

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
