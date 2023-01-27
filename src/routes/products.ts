import express, {Router} from 'express';
import logger from '../middlewares/logger';
import {index, showOne, createOne, updateOne, deleteOne} from '../handlers/products';
import validateToken from '../middlewares/validateToken';

const routes: Router = express.Router();

routes.get('/', logger, validateToken, index);
routes.get('/:id', logger, validateToken, showOne);
routes.post('/', logger, validateToken, createOne);
routes.put('/:id', logger, validateToken, updateOne);
routes.delete('/:id', logger, validateToken, deleteOne);

export default routes;
