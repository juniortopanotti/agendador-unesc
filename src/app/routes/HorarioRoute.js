import HorarioController from '../controllers/HorarioController';
import HorarioValidator from '../validators/HorarioValidator';

import Role from '../constants/Role';
import roleMiddleware from '../middlewares/role';

class HorarioRoute {
  static create(router) {
    router.post(
      '/horarios',
      roleMiddleware.authorize([Role.Administrador, Role.Analista]),
      HorarioValidator.store,
      HorarioController.store
    );
  }
}

export default HorarioRoute;
