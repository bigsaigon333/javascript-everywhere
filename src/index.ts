import express from "express";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";
import db from "./db";
import models from "./models";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { DB_HOST, JWT_SECRET, PORT } from "./constants";
import type { ExpressContext } from "apollo-server-express";
import type { JwtPayload } from "jsonwebtoken";

export type Context = { models: typeof models; user: JwtPayload | null };

(async () => {
  const app = express();

  db.connect(DB_HOST);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: ExpressContext): Context => {
      const token = req.headers.authorization;

      const user =
        token == null ? null : (jwt.verify(token, JWT_SECRET) as JwtPayload);

      console.log(user);

      return { models, user };
    },
  });
  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
