import SessionController from '../controllers/SessionController';

class SessionRoute {
  static create(router) {
    router.get('/sessions/current', SessionController.get);
  }
}

export default SessionRoute;
