import {ApolloServer} from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import * as http from "http";
import {loadGraphqlTypeDefs} from "./type_defs";
import {AuthResolvers} from "./resolvers/auth";
import {PostResolvers} from "./resolvers/posts";
import {CommentResolvers} from "./resolvers/comments";
import {GraphQLScalarType} from "graphql/type";
import {ReportsResolvers} from "./resolvers/reports";
import {expressMiddleware} from "@apollo/server/express4";
import {IAppReqContext} from "../types";
import {Request} from "express";

export async function getApolloServer(httpServer: http.Server): Promise<any> {
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

  const apolloServer = new ApolloServer<IAppReqContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });
  await apolloServer.start();

  return expressMiddleware(
    apolloServer as any,
    {
      context: async ({req, res}): Promise<IAppReqContext> => {
        return (req as Request & { context?: IAppReqContext }).context || {};
      }
    }
  )

}

