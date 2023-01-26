import express, {Router} from 'express';
import logger from '../middlewares/logger';
import {
  index,
  showOne,
  createOne,
  updateOne,
  deleteOne,
  topProducts,
  byCategory,
} from '../handlers/products';
import validateToken from '../middlewares/validateToken';

const routes: Router = express.Router();

routes.get('/', logger, validateToken, index);
routes.get('/:id', logger, validateToken, showOne);
routes.post('/', logger, validateToken, createOne);
routes.put('/:id', logger, validateToken, updateOne);
routes.delete('/:id', logger, validateToken, deleteOne);
routes.get('/top', logger, validateToken, topProducts);
routes.get('/products/:category', logger, validateToken, byCategory);

export default routes;
