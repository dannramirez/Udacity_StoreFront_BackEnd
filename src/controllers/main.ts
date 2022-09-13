/*main Controller Express*/
import {Request, Response} from 'express';
import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:DB:mainFunction');

const mainFunction = async (request: Request, response: Response): Promise<Response> => {
  try {
    const {rows} = await dbConection.query('SELECT NOW()');
    debug(
      chalk.magenta(
        '🚀 ~ file: main.ts ~ line 10 ~ mainFunction ~ rows',
        JSON.stringify(rows[0].now)
      )
    );
  } catch (error) {
    debug(chalk.red(error));
    return response.json({
      response: 'bad',
      status: 500,
      error: 'Verificar credenciales de acceso a la base de datos',
    });
  }

  return response.json({
    response: 'ok',
    status: 200,
    routes: [
      {
        metod: 'GET',
        path: '/api/',
        description: 'API Working',
      },
    ],
  });
};

export default mainFunction;
