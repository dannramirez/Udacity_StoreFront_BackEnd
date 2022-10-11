import express from 'express';
import {Request, Response} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Express');

import routes from './routes';
import users_routes from './routes/users';
import orders_routes from './routes/orders';
import products_routes from './routes/products';

const app = express();
const port = process.env.PORT || 3000;

//Body parser
app.use(express.urlencoded({extended: true}));
//parse incoming request
app.use(express.json());
//request logger middleware
app.use(morgan('common'));
//request security middleware
app.use(helmet());
//Routes
app.use('/', routes);
app.use('/users', users_routes);
app.use('/products', products_routes);
app.use('/orders', orders_routes);
//app.use('/', express.static('public/'));
//app.use('/upload', express.static('public/upload.html'));

//Files
//app.use(express.static('uploads'));

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'This route not exists!! Please read API Documentation. 🦖',
  });
});

//Server
const server = app.listen(port, () => {
  debug(chalk.blue('server started at ') + chalk.underline.red(`localhost:${port}`));
});

export {app, server};
