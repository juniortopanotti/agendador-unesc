import UsuarioController from '../controllers/UsuarioController';
import UsuarioValidator from '../validators/UsuarioValidator';

class UsuarioRoute {
  static create(router) {
    router.put('/usuarios', UsuarioValidator.update, UsuarioController.update);
  }
}

export default UsuarioRoute;
