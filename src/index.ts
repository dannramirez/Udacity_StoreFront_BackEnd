import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug('API:Express');

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

//Body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.use('/api', routes);
//app.use('/', express.static('public/'));
//app.use('/upload', express.static('public/upload.html'));

//Files
//app.use(express.static('uploads'));

//Server
const server = app.listen(port, () => {
  debug(chalk.blue('server started at ') + chalk.underline.red(`localhost:${port}`));
});

export {app, server};
