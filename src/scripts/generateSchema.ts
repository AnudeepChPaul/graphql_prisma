import "tsconfig-paths/register";

import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { writeFileSync } from "node:fs";
import { print } from "graphql";
import { createLogger } from "@/utils/Logger";

const logger = createLogger('GenerateSchema');

async function generateSchema() {
  logger.info('Reading GraphQL files...');
  const typeDefs = mergeTypeDefs(await loadFiles('src/graphql/modules/**/*.graphql'));

  logger.info('Writing schema.graphql file...')
  writeFileSync('schema.graphql', print(typeDefs))

  logger.info('Done!')
}

generateSchema();
