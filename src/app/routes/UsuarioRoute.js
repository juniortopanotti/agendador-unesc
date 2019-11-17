import UsuarioController from '../controllers/UsuarioController';
import UsuarioValidator from '../validators/UsuarioValidator';
import roleMiddleware from '../middlewares/role';
import Role from '../constants/Role';

class UsuarioRoute {
  static create(router) {
    router.put('/usuarios', UsuarioValidator.update, UsuarioController.update);
    router.get(
      '/usuarios',
      roleMiddleware.authorize([
        Role.Administrador,
        Role.Analista,
        Role.Monitorando,
      ]),
      UsuarioController.index
    );
  }
}

export default UsuarioRoute;
