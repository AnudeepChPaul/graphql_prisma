import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { schema } from "./graphql/graph.js";


export async function startServer() {
  const server = new ApolloServer({
    schema
  })

  return await startStandaloneServer(server, { 
    listen: { port: Number(process.env.APP_SERVER_PORT!) } })
}
