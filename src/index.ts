import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const port = process.env.PORT || 4000;

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  app.listen(port, () => {
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
})();
