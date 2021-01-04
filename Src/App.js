// Import dependencies
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

// Import models & controllers

import logger from './Config/Winston';

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
};

// Sync sequelize
// db.sequelize.sync();

// Enable CORS for all requests
app.use(cors(corsOptions));

// Add Helmet to secure the API
app.use(helmet());

// Parse JSON Bodies into JS Objects
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Add Morgan to log HTTP requests
app.use(
    morgan('combined', {
        stream: logger.stream.write,
    })
);

// Setup the logging format
app.use((err, req, _res, next) =>
{
    logger.error(
        `${req.method} - ${err.message} - ${req.originalUrl} - ${req.ip}`
    );
    next(err);
});

app.use(cookieParser());
app.use('/api/v1', app);

export default app;