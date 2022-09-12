import express, {Router} from 'express';
import logger from '../middlewares/logger';
import mainFunction from '../controllers/main';

const routes: Router = express.Router();

routes.get('/', logger, mainFunction);

export default routes;
