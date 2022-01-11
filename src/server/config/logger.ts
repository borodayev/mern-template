import { createLogger, transports, format } from 'winston';
import { format as dateFormat } from 'date-fns';

const { combine, timestamp, simple, printf } = format;

const myFormat = printf(
  ({ level, message, timestamp: time }) =>
    `[${level}] ${dateFormat(
      new Date(time),
      'HH:mm:ss dd/MM/yyyy'
    )} | ${message}`
);

const options = {
  console: {
    format: combine(simple(), timestamp(), myFormat),
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = createLogger({
  transports: [new transports.Console(options.console)],
  exitOnError: false
});

export default logger;
