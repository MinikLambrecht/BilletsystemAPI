import { createLogger, format, transports } from 'winston';
import { existsSync, mkdirSync } from 'fs';
import 'winston-daily-rotate-file';

let logDir = '';

switch (process.env.NODE_ENV)
{
case 'development':
    logDir = 'Src/Logs';
    break;

case 'production':
    logDir = `${__dirname}/Logs`;
    break;
default:
    break;
}

// Create the log directory if it does not exist
if (!existsSync(logDir))
{
    mkdirSync(logDir);
}

// eslint-disable-next-line new-cap
const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss',
        }),
    ),
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.colorize(),
                format.printf((log) => `${log.timestamp} [${log.level}]: ${log.message}`),
            ),
        }),
        new transports.DailyRotateFile({
            level: 'info',
            frequency: '6h',
            datePattern: 'DD-MM-YYYY',
            filename: '%DATE%.log',
            dirname: logDir,
            format: format.combine(
                format.printf((log) => `${log.timestamp} [${log.level}]: ${log.message}`),
            ),
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: '7d',
            colorize: false,
        }),
    ],
    exitOnError: false,
});

logger.info(`${process.env.NODE_ENV} ${logDir}`);
export default logger;