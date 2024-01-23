import "tsconfig-paths/register";

import { copyFile } from "fs";
import { createLogger } from "@/utils/Logger";

const logger = createLogger('PostBuild');

logger.info('Copying schema.graphql file...')
copyFile(`schema.graphql`, `dist/schema.graphql`, (err) => err ? logger.error(err) : logger.info("Done!"))
