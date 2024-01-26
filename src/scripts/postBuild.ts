import "tsconfig-paths/register";

import { copyFile } from "fs";
import { createLoggerByClassName } from "@/utils/Logger";

const logger = createLoggerByClassName('PostBuild');

logger.info('Copying schema.graphql file...')
copyFile(`schema.graphql`, `dist/schema.graphql`, (err) => err ? logger.error(err) : logger.info("Done!"))
