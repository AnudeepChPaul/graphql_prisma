import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles } from "@graphql-tools/load-files";
import { GraphQLSchema } from "graphql";
import { authorSchema } from "./modules/author/Author.resolver.js";
import { bookSchema } from "./modules/book/Book.js";
import { reviewSchema } from "./modules/rating/Review.resolver.js";


const appTypeDefs = `#graphql
  type Query {
    healthcheck: Healthcheck!
  }

  """
  Provides healthcheck information about the server and database
  """
  type Healthcheck {
    """
    Provides the current status of the server
    """
    serverStatus: String!
    """
    Provides the current status of the database
    """ 
    dbStatus: String!
    """
    Provides the current time in ISO format
    """
    timenow: String!
    """
    Provides the current node environment
    """
    nodeEnv: String
    """
    Provides the current environment"""
    env: String
  }
`

const appResolvers = {
  Query: {
    healthcheck() {
      return {
        timenow: new Date().toISOString(),
        serverStatus: "OK",
        dbStatus: "OK",
        nodeEnv: process.env.NODE_ENV || "development",
        env: process.env.ENV || "development"
      }
    },
  },
}

const typeDefs = [
  appTypeDefs, 
  bookSchema.typeDefs,
].concat(await loadFiles('src/graphql/modules/**/*.graphql'))

const resolvers = [
  appResolvers,
  bookSchema.resolvers, 
  authorSchema.resolvers, 
  reviewSchema.resolvers
]

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
