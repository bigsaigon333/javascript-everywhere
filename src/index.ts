import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();

const notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "Oh hey look, another note!", author: "Riley Harrison" },
];

const { DB_HOST, PORT = 4000 } = process.env;

if (DB_HOST == null) {
  throw new Error("DB_HOST is undefined");
}

const typeDefs = gql`
  type Query {
    hello: String
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
    hello: () => "Hello world!",
    notes: () => notes,
    note: (_: never, { id }: { id: string }) =>
      notes.find((note) => note.id === id),
  },
  Mutation: {
    newNote: (_: never, { content }: { content: string }) => {
      const newValue = {
        id: String(notes.length + 1),
        content,
        author: "bigsaigon333",
      };
      notes.push(newValue);

      return newValue;
    },
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
