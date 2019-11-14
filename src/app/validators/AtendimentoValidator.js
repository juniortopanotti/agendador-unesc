import * as Yup from 'yup';
import Usuario from '../models/Usuario';
import Atividade from '../models/Atividade';
import Role from '../constants/Role';

class AtendimentoValidator {
  async store(req, res, next) {
    const regExp = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');

    const schema = Yup.object().shape({
      dt_atendimento: Yup.date().required('É obrigatório informar a data.'),
      hr_inicio: Yup.string()
        .required('É obrigatório informar a hora de inicio.')
        .matches(regExp, 'Formato de hora inválido.'),
      atividade: Yup.number().required('É obrigatório informar a atividade.'),
      analista: Yup.number().required('É obrigatório informar o analista.'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      const { path, errors, message } = err;
      return res.status(400).json({ path, errors, message });
    }

    const { analista, atividade } = req.body;

    const analistaObj = await Usuario.findOne({
      where: {
        id: analista,
        tipo: Role.Analista,
      },
    });

    if (!analistaObj) {
      return res
        .status(400)
        .json({ message: 'Não existe analista com o id informado.' });
    }
    req.analista = analistaObj;

    const atividadeObj = await Atividade.findByPk(atividade);

    if (!atividadeObj) {
      return res
        .status(400)
        .json({ message: 'Não existe atividade com o id informado.' });
    }

    req.atividade = atividadeObj;

    return next();
  }
}

export default new AtendimentoValidator();
