/*main Controller Express*/
import {Request, Response} from 'express';
import {Order, OrdersCRUD} from '../models/orders';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Handler:Orders');

const crud = new OrdersCRUD();

const index = async (_request: Request, response: Response): Promise<Response> => {
  try {
    const orders = await crud.index();
    debug(chalk.magenta('🚀 ~ file: orders.ts ~ index', orders));

    return response.json({
      response: 'ok',
      status: 200,
      orders,
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

const showOne = async (request: Request, response: Response): Promise<Response> => {
  const {id} = request.params;

  try {
    const orders = await crud.show(id);
    debug(chalk.magenta('🚀 ~ file: orders.ts ~ showOne', orders));

    if (orders === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    return response.json({
      response: 'ok',
      status: 200,
      orders,
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

const createOne = async (request: Request, response: Response): Promise<Response> => {
  const order: Order = {
    id: request.params.id,
    user_id: request.body.user_id,
    orderStatus: request.body.orderStatus,
  };

  try {
    const orders = await crud.create(order);

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ createOne', orders));

    return response.json({
      response: 'ok',
      status: 200,
      orders,
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

const updateOne = async (request: Request, response: Response): Promise<Response> => {
  const order: Order = {
    id: request.params.id,
    user_id: request.body.user_id,
    orderStatus: request.body.orderStatus,
  };

  try {
    const orderOne = await crud.update(order);
    debug(chalk.magenta('🚀 ~ file: orders.ts ~ UpdateOne', orderOne));

    return response.json({
      response: 'ok',
      status: 200,
      orderOne,
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

const deleteOne = async (request: Request, response: Response): Promise<Response> => {
  const {id} = request.params;

  try {
    const orderOne = await crud.delete(id);

    if (orderOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ delete', orderOne));
    return response.json({
      response: 'ok',
      status: 200,
      orderOne,
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

export {index, showOne, createOne, updateOne, deleteOne};
