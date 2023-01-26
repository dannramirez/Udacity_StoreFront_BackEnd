/*main Controller Express*/
import {Request, Response} from 'express';
import {Product, ProductCRUD} from '../models/products';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Handler:Products');

const crud = new ProductCRUD();

const index = async (_request: Request, response: Response): Promise<Response> => {
  try {
    const productOne = await crud.index();
    debug(chalk.magenta('🚀 ~ file: products.ts ~ index', productOne));

    return response.json({
      response: 'ok',
      status: 200,
      productOne,
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
    const productOne = await crud.show(id);
    debug(chalk.magenta('🚀 ~ file: products.ts ~ showOne', productOne));

    if (productOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    return response.json({
      response: 'ok',
      status: 200,
      productOne,
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
  debug(chalk.magenta('🚀 ~ file: products.ts IN'));

  const product: Product = {
    id: request.params.id,
    name: request.body.name,
    price: request.body.price,
    category: request.body.category,
  };

  try {
    const productOne = await crud.create(product);
    debug(chalk.magenta('🚀 ~ file: products.ts ~ createOne', JSON.stringify(productOne)));
    return response.json({
      response: 'ok',
      status: 200,
      productOne,
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
  const product: Product = {
    id: request.params.id,
    name: request.body.name,
    price: request.body.price,
    category: request.body.category,
  };

  try {
    const productOne = await crud.update(product);
    debug(chalk.magenta('🚀 ~ file: products.ts ~ UpdateOne', productOne));

    return response.json({
      response: 'ok',
      status: 200,
      productOne,
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
    const productOne = await crud.delete(id);
    debug(chalk.magenta('🚀 ~ file: products.ts ~ delete', productOne));

    if (productOne === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    return response.json({
      response: 'ok',
      status: 200,
      productOne,
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

const topProducts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const topProductList = await crud.topList();
    debug(chalk.magenta('🚀 ~ file: products.ts ~ topProducts', topProductList));

    if (topProductList === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    return response.json({
      response: 'ok',
      status: 200,
      topProducts: topProductList,
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

const byCategory = async (request: Request, response: Response): Promise<Response> => {
  const {category} = request.params;

  try {
    const productsList = await crud.byCategory(category);
    debug(chalk.magenta('🚀 ~ file: products.ts ~ byCategory', productsList));

    if (productsList === null) {
      return response.status(404).json({
        response: 'bad',
        status: 404,
      });
    }

    return response.json({
      response: 'ok',
      status: 200,
      Products: productsList,
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

export {index, showOne, createOne, updateOne, deleteOne, topProducts, byCategory};
