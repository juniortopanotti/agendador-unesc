import Usuario from '../models/Usuario';
import Role from '../constants/Role';

class UsuarioController {
  async store(req, res) {
    const emailExists = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ path: 'email', message: 'Este email já está sendo utilizado' });
    }

    const body = { ...req.body, tipo: Role.Monitorando };

    const { id, email, nome, tipo } = await Usuario.create(body);

    return res.json({ id, email, nome, tipo });
  }

  async update(req, res) {
    const { oldPassword } = req.body;
    const { userContext } = req;

    const usuario = await Usuario.findByPk(userContext.id);

    if (oldPassword && !(await usuario.checkPassword(oldPassword))) {
      return res.status(401).json({ message: 'Senha atual inválida' });
    }

    const { id, email, nome, tipo } = await usuario.update(req.body);

    return res.status(200).json({ id, email, nome, tipo });
  }
}

export default new UsuarioController();
