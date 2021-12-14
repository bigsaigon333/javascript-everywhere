import { DateTimeResolver } from "graphql-scalars";
import Query from "./query";
import Mutation from "./mutation";

const resolvers = { Query, Mutation, DateTime: DateTimeResolver };

export default resolvers;
