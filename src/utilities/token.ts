import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import Debug from 'debug';

const debug = Debug('API:Token');
const {TOKEN_SECRET} = process.env;
debug(chalk.green('DB Config'));

const generarJWT = (id: string) => {
  const payload = {id};
  const token = jwt.sign(payload, TOKEN_SECRET as string);
  return token;
};

const validateJWT = (token_header: string) => {
  try {
    const token = token_header.split(' ')[1];
    return jwt.verify(token, TOKEN_SECRET as string);
  } catch (err) {
    return false;
  }
};

export {generarJWT, validateJWT};
