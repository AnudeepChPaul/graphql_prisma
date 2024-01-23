import "tsconfig-paths/register";

import { rm } from "fs";
import { createLogger } from "@/utils/Logger";


const logger = createLogger('PreBuild');

logger.info('Removing dist folder...')
rm(`dist`, { recursive: true, force: true }, (err) => err ? logger.error(err) : logger.info("Done!"))

