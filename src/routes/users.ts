import express, {Router} from 'express';
import logger from '../middlewares/logger';
import {
  index_user,
  show_user,
  create_user,
  update_user,
  delete_user,
  authenticate_user,
} from '../handlers/users';
import validateToken from '../middlewares/validateToken';

const routes: Router = express.Router();

routes.post('/', logger, create_user);
routes.post('/auth', logger, authenticate_user);
routes.get('/', logger, validateToken, index_user);
routes.get('/:id', logger, validateToken, show_user);
routes.put('/:id', logger, validateToken, update_user);
routes.delete('/:id', logger, validateToken, delete_user);

export default routes;
