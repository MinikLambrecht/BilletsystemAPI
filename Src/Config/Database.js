/* eslint-disable no-console */

// Load modules
import util from 'util';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { DBHost, DBUser, DBPass, DB, DBPort } from './Settings';

// Load environment variables
dotenv.config();

// Initialize pool
const pool = mysql.createPool({
    connectionLimit: 10,
    supportBigNumbers: true,
    bigNumberStrings: true,
    host: DBHost,
    user: DBUser,
    port: DBPort,
    password: DBPass,
    database: DB,
    debug: false,
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) =>
{
    if (err)
    {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
        {
            console.error('Database connection was closed.');
        }

        if (err.code === 'ER_CON_COUNT_ERROR')
        {
            console.error('Database has too many connections.');
        }

        if (err.code === 'ECONNREFUSED')
        {
            console.error('Database connection was refused.');
        }
    }
    else
    {
        console.log('MySQL Connected!');
    }

    if (connection)
    {
        connection.release();
    }
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

export default pool;