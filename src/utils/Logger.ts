import { addColors, createLogger as wCreateLogger, format, transports, Logger } from 'winston';

const DEFAULT_LOG_LEVEL = 'info';
const CONFIG = {
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

const getLabel = (label: string): string => {
  if (!label) return '';

  let returnLabel = label[0].toUpperCase();
  for (let i = 1; i < label.length; i++) {
    returnLabel += label[i].toUpperCase() === label[i] 
      ? `-${label[i]}`
      : label[i]
  }

  return returnLabel;
}
const colorizer = format.colorize();
const messageFormat = (label: string) => 
  format.combine(
    format.label({ label: `${getLabel(label)}` }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => 
      colorizer.colorize(info.level,
        `[${info.level.toUpperCase()}] [${info.timestamp}] ` + 
        `[${info.label.toUpperCase()}]: ${info.message}`))
)
const consoleTransport = new transports.Console({ level: DEFAULT_LOG_LEVEL });

addColors(CONFIG.colors);

const logger = wCreateLogger({
  format: messageFormat("Logger"),
  transports: [
    consoleTransport
  ],
});

export const createLogger = (className: string): Logger =>  {
  logger.debug(`Creating logger for ${className}`);
  return wCreateLogger({
    format: messageFormat(className),
    transports: [
      consoleTransport
    ],
  });
}
export const setLoglevel = (level: string) => {
  consoleTransport.level = level;
  logger.debug(`Setting log level to ${level}.`)
}
export const getLoglevel = (): string => JSON.stringify({ 
  console: consoleTransport.level,
})

