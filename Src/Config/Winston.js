import { createLogger, transports as _transports, format } from 'winston';

const DateFormat = require('fast-date-format');

// eslint-disable-next-line no-undef
const { combine, timestamp, prettyPrint } = format;

const DateString = new DateFormat('DD MMM YYYY hh[:]mm[:]ss').format();

const options = {
    file: {
        level: 'info',
        filename: `../../Logs/${DateString}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 31,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// eslint-disable-next-line new-cap
const logger = new createLogger({
    level: options.logLevel,
    format: combine(
        timestamp({
            format: DateString,
        }),
        prettyPrint()
    ),
    transports: [
        new _transports.Console(options.console),
        new _transports.File(options.file),
    ],
    exitOnError: false,
});

export default logger;