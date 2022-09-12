import {Request, Response} from 'express';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:DB:mainFunction');

const mainFunction = (request: Request, response: Response): Response => {
  debug(chalk.green('🚀 ~ file: main.ts ~ line 8 ~ mainFunction'));

  return response.json({
    response: 'ok',
    status: 200,
    routes: [
      {
        metod: 'GET',
        path: '/api/',
      },
    ],
  });
};

export default mainFunction;
