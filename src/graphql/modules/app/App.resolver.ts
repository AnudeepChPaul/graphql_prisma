import { createLogger } from "@/utils/Logger";

const logger = createLogger('AppResolver');
export const appResolvers = {
  Query: {
    healthcheck() {
      logger.debug('Healthcheck query received.');
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
