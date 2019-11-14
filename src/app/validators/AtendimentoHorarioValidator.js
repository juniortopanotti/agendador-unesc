import * as Yup from 'yup';

import Usuario from '../models/Usuario';

class AtendimentoHorarioValidator {
  async index(req, res, next) {
    const schema = Yup.object().shape({
      data: Yup.date('Formato de data inválido.').required(
        'É obrigatório informar a data.'
      ),
      analista: Yup.number('Valor inválido').required(
        'É obrigatório informar um analista'
      ),
    });

    try {
      await schema.validate(req.query);
    } catch (err) {
      const { path, errors, message } = err;
      return res.status(400).json({ path, errors, message });
    }

    const { analista } = req.query;

    const usuario = await Usuario.findByPk(analista);

    if (!usuario) {
      return res
        .status(400)
        .json({ message: 'Não foi encontrado analista com o id informado.' });
    }

    req.analista = usuario;

    return next();
  }
}

export default new AtendimentoHorarioValidator();
