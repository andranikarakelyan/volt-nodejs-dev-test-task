import {ApolloServer} from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import * as http from "http";
import {loadGraphqlTypeDefs} from "./type_defs";
import {AuthResolvers} from "./resolvers/auth";
import {PostResolvers} from "./resolvers/posts";
import {CommentResolvers} from "./resolvers/comments";

export async function initApolloServer(httpServer: http.Server) {
  const resolvers = {
    Query: {
      ...AuthResolvers.queries,
      ...PostResolvers.queries,
      ...CommentResolvers.queries,
    },
    Mutation: {
      ...AuthResolvers.mutations,
      ...PostResolvers.mutations,
      ...CommentResolvers.mutations,
    }
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

