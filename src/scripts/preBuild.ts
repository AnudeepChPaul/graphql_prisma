import "tsconfig-paths/register";

import { rm } from "fs";
import { createLoggerByClassName } from "@/utils/Logger";


const logger = createLoggerByClassName('PreBuild');

logger.info('Removing dist folder...')
rm(`dist`, { recursive: true, force: true }, (err) => err ? logger.error(err) : logger.info("Done!"))

