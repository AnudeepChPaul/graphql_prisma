import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "node:fs";
import { resolvers } from "./graphql/index.js";
import { createLogger } from "./utils/Logger.js";

const logger = createLogger('app');

const typeDefs = readFileSync('schema.graphql', 'utf-8');

export async function startServer() {
  logger.info('Starting server');
  const server = new ApolloServer({
    typeDefs, resolvers
  })

  return await startStandaloneServer(server, { 
    listen: { port: Number(process.env.APP_SERVER_PORT!) } })
}

startServer().then(({ url }) => { 
  logger.info(`Server started at ${url}.`)
  logger.info(`Visit ${url}graphql to run queries.`)
})
