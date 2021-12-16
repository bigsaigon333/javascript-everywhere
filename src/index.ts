import express from "express";
import { ApolloServer } from "apollo-server-express";
import db from "./db";
import models from "./models";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { DB_HOST, PORT } from "./constants";

export type Context = { models: typeof models };

(async () => {
  const app = express();

  db.connect(DB_HOST);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (): Context => ({ models }),
  });
  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
