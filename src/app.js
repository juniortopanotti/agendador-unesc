import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';

import './database';

process.env.TZ = 'America/Sao_Paulo';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      console.log(err);
      return res.status(500).json({ error: 'Ocorreu um erro interno.' });
    });
  }
}

export default new App().server;
