import CursoController from '../controllers/CursoController';
import CursoValidator from '../validators/CursoValidator';

import Role from '../constants/Role';
import roleMiddleware from '../middlewares/role';

class CursosRoute {
  static create(router) {
    router.post(
      '/cursos',
      roleMiddleware.authorize([Role.Administrador]),
      CursoValidator.store,
      CursoController.store
    );
    router.put(
      '/cursos/:id',
      roleMiddleware.authorize([Role.Administrador]),
      CursoValidator.find,
      CursoValidator.store,
      CursoController.update
    );
    router.delete(
      '/cursos/:id',
      roleMiddleware.authorize([Role.Administrador]),
      CursoValidator.find,
      CursoController.delete
    );
  }
}

export default CursosRoute;
