import { Router } from 'express';

import UsuarioController from './app/controllers/UsuarioController';

import authMiddleware from './app/middlewares/auth';
import UsuarioValidator from './app/validators/UsuarioValidator';
import SessionController from './app/controllers/SessionController';

import AtendimentoHorarioRoute from './app/routes/AtendimentoHorarioRoute';
import AtividadesRoute from './app/routes/AtividadeRoute';
import CursosRoutes from './app/routes/CursoRoute';
import AtendimentoRoute from './app/routes/AtendimentoRoute';
import HorarioRoute from './app/routes/HorarioRoute';
import UsuarioRoute from './app/routes/UsuarioRoute';

const routes = [
  AtendimentoHorarioRoute,
  AtividadesRoute,
  CursosRoutes,
  AtendimentoRoute,
  HorarioRoute,
  UsuarioRoute,
];

class Routes {
  constructor() {
    this.init();
  }

  openRoutes() {
    this.router.post(
      '/usuarios',
      UsuarioValidator.create,
      UsuarioController.store
    );
    this.router.post('/sessions', SessionController.store);
  }

  defaultMiddlewares() {
    this.router.use(authMiddleware);
  }

  init() {
    this.router = new Router();

    this.openRoutes();
    this.defaultMiddlewares();
    routes.map(route => route.create(this.router));
  }
}

export default new Routes().router;
