import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import Usuario from '../models/Usuario';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Email ou usuário inválidos!' });
    }

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res
        .status(401)
        .json({ error: `Usuário com o email ${email} não existe.` });
    }

    if (!(await usuario.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, nome, tipo } = usuario;

    return res.json({
      usuario: {
        id,
        email,
        nome,
        tipo,
      },
      token: jwt.sign({ id, tipo }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async get(req, res) {
    const { id } = req.userContext;
    const usuario = await Usuario.findByPk(id);

    const { nome, tipo, email } = usuario;

    return res.json({
      id,
      email,
      nome,
      tipo,
    });
  }
}

export default new SessionController();
