import { gql } from "apollo-server-express";

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

export default typeDefs;
