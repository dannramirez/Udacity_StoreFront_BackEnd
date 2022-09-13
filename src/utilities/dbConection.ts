import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import chalk from 'chalk';
import Debug from 'debug';

const debug = Debug('API:DB');

const {POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT} = process.env;

debug(chalk.green('DB Config'));

const dbConection = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
});

export default dbConection;
