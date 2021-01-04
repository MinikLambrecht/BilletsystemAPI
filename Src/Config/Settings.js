import dotenv from 'dotenv';

dotenv.config();

// Application Related
export const AppPort = process.env.PORT;

// Security Related
export const JWTSecret = process.env.JWT_SECRET;

// Database Related
export const DBDialect = process.env.DB_DIALECT;
export const DBHost = process.env.DB_HOST;
export const DBPort = process.env.DB_PORT;
export const DBUser = process.env.DB_USER;
export const DBPass = process.env.DB_PASS;
export const { DB } = process.env.DB;
export const DBPoolMax = process.env.DB_POOL_MAX;
export const DBPoolMin = process.env.DB_POOL_MIN;
export const DBPoolAquire = process.env.DB_POOL_ACQUIRE;
export const DBPoolIdle = process.env.DB_POOL_IDLE;