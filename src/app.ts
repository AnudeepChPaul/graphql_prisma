import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "node:fs";
import { resolvers } from "./graphql/index.js";

const typeDefs = readFileSync('schema.graphql', 'utf-8');

export async function startServer() {
  const server = new ApolloServer({
    typeDefs, resolvers
  })

  return await startStandaloneServer(server, { 
    listen: { port: Number(process.env.APP_SERVER_PORT!) } })
}

startServer().then(({ url }) => { 
  console.log(`Server started at ${url}. Visit ${url}graphql to run queries.`)
})
