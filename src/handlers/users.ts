/*main Controller Express*/
import {Request, Response} from 'express';
import {User, UsersCRUD} from '../models/user';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Handler:User');

const crud = new UsersCRUD();

const index_user = async (_request: Request, response: Response): Promise<Response> => {
  try {
    const users = await crud.index();
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 13 ~ index ~ users', users));

    return response.json({
      response: 'ok',
      status: 200,
      users,
    });
  } catch (error) {
    debug(chalk.red(error));
    return response.status(500).json({
      response: 'bad',
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const show_user = async (request: Request, response: Response): Promise<Response> => {
  const {id} = request.params;

  try {
    const users = await crud.show(id);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 35 ~ constshow_user= ~ show', users));

    return response.json({
      response: 'ok',
      status: 200,
      users,
    });
  } catch (error) {
    debug(chalk.red(error));
    return response.status(500).json({
      response: 'bad',
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const create_user = async (request: Request, response: Response): Promise<Response> => {
  const user: User = {
    id: request.params.id,
    username: request.body.username,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password,
  };

  try {
    const users = await crud.create(user);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 57 ~ constcreate_user= ~ user', users));

    return response.json({
      response: 'ok',
      status: 200,
      users,
    });
  } catch (error) {
    debug(chalk.red(error));
    return response.status(500).json({
      response: 'bad',
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const update_user = async (request: Request, response: Response): Promise<Response> => {
  const user: User = {
    id: request.params.id,
    username: request.body.username,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password,
  };

  try {
    const users = await crud.update(user);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 79 ~ constupdate_user= ~ user', users));

    return response.json({
      response: 'ok',
      status: 200,
      users,
    });
  } catch (error) {
    debug(chalk.red(error));
    return response.status(500).json({
      response: 'bad',
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const delete_user = async (request: Request, response: Response): Promise<Response> => {
  const {id} = request.params;

  try {
    const users = await crud.delete(id);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 13 ~ index ~ users', users));

    return response.json({
      response: 'ok',
      status: 200,
      users,
    });
  } catch (error) {
    debug(chalk.red(error));
    return response.status(500).json({
      response: 'bad',
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

export {index_user, show_user, create_user, update_user, delete_user};
