import "tsconfig-paths/register";

import { copyFile } from "fs";
import { createLoggerByClassName } from "@/utils/Logger";

const buildLogger = createLoggerByClassName("PostBuild");

buildLogger.info("Copying schema.graphql file...");

copyFile(`schema.graphql`, `dist/schema.graphql`, (err) =>
  err ? buildLogger.error(err) : buildLogger.info("Done!"),
);
