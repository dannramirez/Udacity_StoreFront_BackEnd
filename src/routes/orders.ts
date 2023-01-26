import express, {Router} from 'express';
import logger from '../middlewares/logger';
import {
  index,
  showOne,
  createOne,
  updateOne,
  deleteOne,
  addProductFromOrder,
  updateQtyFromOrder,
  removeProductFromOrder,
  updateOrderStatus,
} from '../handlers/orders';
import validateToken from '../middlewares/validateToken';

const routes: Router = express.Router();

routes.get('/', logger, validateToken, index);
routes.get('/:id', logger, validateToken, showOne);
routes.post('/', logger, createOne);
routes.put('/:id', logger, validateToken, updateOne);
routes.delete('/:id', logger, validateToken, deleteOne);

routes.post('/add/:order_id', logger, validateToken, addProductFromOrder);
routes.post('/update/:order_id', logger, validateToken, updateQtyFromOrder);
routes.post('/remove/:order_id', logger, validateToken, removeProductFromOrder);
routes.patch('/:id', logger, validateToken, updateOrderStatus);

export default routes;
