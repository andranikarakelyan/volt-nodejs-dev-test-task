import {ApolloServer} from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import * as http from "http";
import {loadGraphqlTypeDefs} from "./type_defs";

export async function initApolloServer(httpServer: http.Server) {
  const resolvers = {
    Query: {},
    Mutation: {}
  };

  const typeDefs= await loadGraphqlTypeDefs();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });
  await apolloServer.start();

  return apolloServer;

}

