import express, {Router} from 'express';
import logger from '../middlewares/logger';

import {showCurrenOrderFromUser, showCompleteOrdersFromUser} from '../handlers/dashboard';
import validateToken from '../middlewares/validateToken';

const routes: Router = express.Router();

routes.post('/current/:user_id', logger, validateToken, showCurrenOrderFromUser);
routes.get('/completed/:user_id', logger, validateToken, showCompleteOrdersFromUser);

export default routes;
