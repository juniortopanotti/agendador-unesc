class Role {
  authorize(roles = []) {
    return async (req, res, next) => {
      const { userContext } = req;
      if (roles.length && !roles.includes(userContext.tipo)) {
        return res.status(401).json({ message: 'Acesso negado' });
      }

      return next();
    };
  }
}

export default new Role();
