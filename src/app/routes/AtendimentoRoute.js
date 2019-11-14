import AtendimentoController from '../controllers/AtendimentoController';
import AtendimentoValidator from '../validators/AtendimentoValidator';

import Role from '../constants/Role';
import roleMiddleware from '../middlewares/role';

class AtendimentoRoute {
  static create(router) {
    router.post(
      '/atendimentos',
      roleMiddleware.authorize([Role.Monitorando]),
      AtendimentoValidator.store,
      AtendimentoController.store
    );
  }
}

export default AtendimentoRoute;
