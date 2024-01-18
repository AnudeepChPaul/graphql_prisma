import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import * as tq from 'type-graphql'
import { resolvers } from './prisma/generated/type-graphql'
import { Context, context } from './context'

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers:resolvers,
    validate: false,
  })

  const server = new ApolloServer<Context>({ schema })

  const { url } = await startStandaloneServer(server, { context: async () => context })

  console.log(`
🚀 Server ready at: ${url}
⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`
  )
}

app()
