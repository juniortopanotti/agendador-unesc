import AtividadeValidator from '../validators/AtividadeValidator';
import AtividadeController from '../controllers/AtividadeController';

import Role from '../constants/Role';
import roleMiddleware from '../middlewares/role';

export class AtividadeRoute {
  static create(router) {
    router.post(
      '/atividades',
      roleMiddleware.authorize([Role.Administrador]),
      AtividadeValidator.store,
      AtividadeController.store
    );
    router.put(
      '/atividades/:id',
      roleMiddleware.authorize([Role.Administrador]),
      AtividadeValidator.find,
      AtividadeValidator.store,
      AtividadeController.update
    );
    router.delete(
      '/atividades/:id',
      roleMiddleware.authorize([Role.Administrador]),
      AtividadeValidator.find,
      AtividadeController.delete
    );
    router.get(
      '/atividades',
      roleMiddleware.authorize([
        Role.Administrador,
        Role.Analista,
        Role.Monitorando,
      ]),
      AtividadeController.index
    );
  }
}

export default AtividadeRoute;
