/*main Controller Express*/
import {Request, Response} from 'express';
import {User, UsersCRUD} from '../models/users';
import chalk from 'chalk';
import Debug from 'debug';
import {generarJWT} from '../utilities/token';
const debug = Debug('API:Handler:User');

const crud = new UsersCRUD();

const index_user = async (_request: Request, response: Response): Promise<Response> => {
  try {
    const users = await crud.index();
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 13 ~ index ~ users'));

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
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 35 ~ constshow_user= ~ show'));

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
  const {username, firstName, lastName, password} = request.body as User;

  const user: User = {
    id: request.params.id,
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  };

  try {
    const users = await crud.create(user);
    const token = generarJWT(users.id);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 57 ~ create_user= ~ user'));

    return response.json({
      response: 'ok',
      status: 200,
      users,
      token,
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

const authenticate_user = async (request: Request, response: Response): Promise<Response> => {
  const {username, password} = request.body as User;

  try {
    const user = await crud.authenticate(username, password);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 57 ~ authenticate_user= ~ user'));
    if (user) {
      const token: string = generarJWT(user.id);

      return response.json({
        response: 'ok',
        status: 200,
        user,
        token,
      });
    }

    return response.status(404).json({
      response: 'bad',
      status: 404,
      error: 'Please contact with service',
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
  const {username, firstName, lastName, password} = request.body as User;

  const user: User = {
    id: request.params.id,
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  };

  try {
    const users = await crud.update(user);
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 79 ~ constupdate_user= ~ user'));

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
    debug(chalk.magenta('🚀 ~ file: users.ts ~ line 13 ~ index ~ users'));

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

export {index_user, show_user, create_user, authenticate_user, update_user, delete_user};
