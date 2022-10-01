import {Request, Response, NextFunction} from 'express';
import chalk from 'chalk';
import Debug from 'debug';
import {validateJWT} from '../utilities/token';
import {JwtPayload} from 'jsonwebtoken';

const debug = Debug('API:validateToken');

export interface CustomRequest extends Request {
  token: string | JwtPayload | false;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('access-token');

    if (!token) {
      debug(chalk.red('Token not received'));
      throw new Error();
    }

    const decoded = validateJWT(token);

    (req as CustomRequest).token = decoded;
    debug(chalk.green('Token validated'));
    next();
  } catch (error) {
    debug(chalk.red('Invalid Token'));
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }
};

export default validateToken;
