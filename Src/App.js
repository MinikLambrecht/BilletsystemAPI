/* eslint-disable max-len */
// Import dependencies
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

// Import the logger & possibly needed envs
import logger from './Config/Winston';
import { AppPort } from './Config/Settings';

// Initialize express & fetch the routes
const app = express();
const routes = require('./Routes');

// Setup CORS with some minor tweaks
const corsOptions = {
    origin: `localhost:${AppPort || 8080}`,
    methods: 'GET, PUT, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Enable CORS for all requests
app.use(cors(corsOptions));

/* Add Helmet to secure the API with 11 connect style middlewares
 *
 * Sets the Content-Secutiy-Policy Header (Helps mitigate cross-site scripting attacks)
 * Sets the Expect-CT Header (Helps mitigate misissued SSL Certificates)
 * Sets the Referrer-Policy Header (Controls what information is set in the Referer header)
 * Sets the Strict-Transport-security Header (prefer HTTPS over HTTP)
 * Sets the X-Content-Type-Options to nosniff (mitigates MIME type sniffing)
 * Sets the X-DNS-Prefetch-Control (Helps controlling DNS Prefetching)
 * Sets the X-Download-Options (Mitigates executiong of HTML on the sites context)
 * Sets the X-Frame-Options (Mitigates clickjacking attacks)
 * Sets the X-Permitted-Cross-Domain-Policies (States your domains policy for loading cross-domain content)
 * Removes the X-Powered-By header (Some browsers has this on by default) *DISABLED*
 * Sets the X-XSS-Protection header to 0
 */
app.use(helmet(helmet.hidePoweredBy()));

// Parse JSON Bodies into JS Objects
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Setup Morgan to Log the web server requests with Winston
app.use(morgan('combined', {
    stream: logger.stream.write,
}));

// Customize the logging format
app.use((err, req, _res, next) =>
{
    logger.error(`${req.method} - ${err.message} - ${req.originalUrl} - ${req.ip}`);
    next(err);
});

// Set the base url & define the routes
app.set('base', '/billetsystem/api/v1');
app.use('/billetsystem/api/v1', routes);

export default app;