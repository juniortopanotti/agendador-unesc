import AtendimentoHorarioValidator from '../validators/AtendimentoHorarioValidator';
import AtendimentoHorarioController from '../controllers/AtendimentoHorarioController';

import Role from '../constants/Role';
import roleMiddleware from '../middlewares/role';

class AtendimentoHorarioRoute {
  static create(router) {
    router.get(
      '/atendimentos/horarios',
      roleMiddleware.authorize([
        Role.Administrador,
        Role.Analista,
        Role.Monitorando,
      ]),
      AtendimentoHorarioValidator.index,
      AtendimentoHorarioController.index
    );
  }
}

export default AtendimentoHorarioRoute;
