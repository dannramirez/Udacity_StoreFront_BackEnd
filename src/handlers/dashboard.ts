/*main Controller Express*/
import {Request, Response} from 'express';
import {Dashboard} from '../services/dashboard';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Handler:Orders');

const crud = new Dashboard();

//******************************* Orders */

const showCurrenOrderFromUser = async (request: Request, response: Response): Promise<Response> => {
  const {user_id} = request.params;

  try {
    const orderOne = await crud.showCurrentFromUser(user_id);

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

const showCompleteOrdersFromUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const {user_id} = request.params;

  try {
    const orderOne = await crud.showCompletedFromUser(user_id);

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

//******************************* Products*/

const topProducts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const topProductList = await crud.topList();
    debug(chalk.magenta('🚀 ~ file: products.ts ~ topProducts'));

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
    debug(chalk.magenta('🚀 ~ file: products.ts ~ byCategory'));

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

export {showCurrenOrderFromUser, showCompleteOrdersFromUser, topProducts, byCategory};
