/*main Controller Express*/
import {Request, Response} from 'express';
import {Order, OrderProduct, OrdersCRUD} from '../models/orders';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Handler:Orders');

const crud = new OrdersCRUD();

const index = async (_request: Request, response: Response): Promise<Response> => {
  try {
    const orders = await crud.index();
    debug(chalk.magenta('🚀 ~ file: orders.ts ~ index'));

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
    debug(chalk.magenta('🚀 ~ file: orders.ts ~ showOne'));

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
  const {user_id, orderStatus} = request.body as Order;

  const order: Order = {
    id: request.params.id,
    user_id: user_id,
    orderStatus: orderStatus,
  };

  try {
    const orders = await crud.create(order);

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ createOne'));

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
  const {user_id, orderStatus} = request.body as Order;
  const order: Order = {
    id: request.params.id,
    user_id: user_id,
    orderStatus: orderStatus,
  };

  try {
    const orderOne = await crud.update(order);
    debug(chalk.magenta('🚀 ~ file: orders.ts ~ UpdateOne'));

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

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ delete'));
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

const addProductFromOrder = async (request: Request, response: Response): Promise<Response> => {
  const {product_id, quantity} = request.body as OrderProduct;

  const order: OrderProduct = {
    order_id: request.params.order_id,
    product_id: product_id,
    quantity: quantity,
  };

  console.log(order);

  try {
    const orderOne = await crud.addProduct(order);

    if (orderOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ delete'));
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

const updateQtyFromOrder = async (request: Request, response: Response): Promise<Response> => {
  const {product_id, quantity} = request.body as OrderProduct;

  const order: OrderProduct = {
    order_id: request.params.order_id,
    product_id: product_id,
    quantity: quantity,
  };

  try {
    const orderOne = await crud.updateQtyProduct(order);

    if (orderOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ delete'));
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

const removeProductFromOrder = async (request: Request, response: Response): Promise<Response> => {
  const {product_id} = request.body as OrderProduct;

  const order: OrderProduct = {
    order_id: request.params.order_id,
    product_id: product_id,
    quantity: 0,
  };

  try {
    const orderOne = await crud.removeProduct(order);

    if (orderOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ delete'));
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

const updateOrderStatus = async (request: Request, response: Response): Promise<Response> => {
  const {user_id, orderStatus} = request.body as Order;

  const order: Order = {
    id: request.params.id,
    user_id: user_id,
    orderStatus: orderStatus,
  };

  try {
    const orderOne = await crud.updateStatus(order);

    if (orderOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    debug(chalk.magenta('🚀 ~ file: orders.ts ~ delete'));
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

export {
  index,
  showOne,
  createOne,
  updateOne,
  deleteOne,
  addProductFromOrder,
  updateQtyFromOrder,
  removeProductFromOrder,
  updateOrderStatus,
};
