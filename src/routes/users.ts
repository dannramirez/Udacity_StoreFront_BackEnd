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

const routes: Router = express.Router();

routes.get('/', logger, index_user);
routes.get('/:id', logger, show_user);
routes.post('/', logger, create_user);
routes.post('/auth', logger, authenticate_user);
routes.put('/:id', logger, update_user);
routes.delete('/:id', logger, delete_user);

export default routes;
