import dotenv from "dotenv";
dotenv.config();

import "tsconfig-paths/register";

import { createLoggerByClassName, getLoglevel, setLoglevel } from "@/utils/Logger";

const logger = createLoggerByClassName('app');

if (process.env.LOG_LEVEL) {
  logger.info(`Setting log level to ${process.env.LOG_LEVEL}.`)
  setLoglevel(process.env.LOG_LEVEL);
  logger.info(`Level changed to ${getLoglevel()}`);
}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      APP_SERVER_PORT: number;
      LOG_LEVEL: 'info' | 'debug' | 'warn' | 'error';
    }
  }
}

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "node:fs";
import { resolvers } from "@/graphql";

const typeDefs = readFileSync('schema.graphql', 'utf-8');

logger.info(`Looger initialized. Default log level is ${getLoglevel()}`);

export async function launchGraphql() {
  logger.info('Starting server');
  const server = new ApolloServer({
    typeDefs, resolvers
  })

  return await startStandaloneServer(server, {
    listen: { port: Number(process.env.APP_SERVER_PORT!) }
  })
}

launchGraphql().then(({ url }) => {
  logger.info(`Server started at ${url}.`)
  logger.info(`Visit ${url}graphql to run queries.`)
})
