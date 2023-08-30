import {ApolloServer} from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import * as http from "http";
import {loadGraphqlTypeDefs} from "./type_defs";
import {AuthResolvers} from "./resolvers/auth";
import {PostResolvers} from "./resolvers/posts";
import {CommentResolvers} from "./resolvers/comments";
import {GraphQLScalarType} from "graphql/type";
import {ReportsResolvers} from "./resolvers/reports";

export async function initApolloServer(httpServer: http.Server) {
  const resolvers = {
    Query: {
      ...AuthResolvers.queries,
      ...PostResolvers.queries,
      ...CommentResolvers.queries,
      ...ReportsResolvers.queries,
    },
    Mutation: {
      ...AuthResolvers.mutations,
      ...PostResolvers.mutations,
      ...CommentResolvers.mutations,
      ...ReportsResolvers.mutations,
    },
    Date: new GraphQLScalarType({
      name: 'Date',
      parseValue(value) {
        return new Date(String(value));
      },
      serialize(value) {
        return new Date(value as any).toUTCString();
      },
    })
  };

  const typeDefs = await loadGraphqlTypeDefs();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });
  await apolloServer.start();

  return apolloServer;

}

